/// <reference path="../typings/main.d.ts" />

import { assign, debounce, flatten, toArray } from 'underscore';

import { IMahoConfig } from './config.interface';
import { Key } from './key.enum';
import { Matcher } from './matcher.class';
import { defaultConfig } from './default.const';

/**
 * Mahō web component
 */
export class Maho extends Matcher {

  /**
   * Mahō global instance counter
   */
  private static _id: number = 1;

  public static get id(): number {
    return this._id++;
  }

  /**
   * Data source
   * May be changed at any time
   */
  public source: any;

  /**
   * Mahō internal configuration object
   * Dictates how the component behaves
   */
  protected _config: IMahoConfig;

  /**
   * Mahō internal search string
   * Used to filter against results
   */
  protected _search: string = '';

  /**
   * Mahō-managed list element
   * Used in case none is provided
   */
  protected _listElement: HTMLDivElement;

  /**
   * Mahō base node
   */
  private node: HTMLInputElement;

  /**
   * Instance id
   */
  private id: number = Maho.id;

  /**
   * Whether the input value has been altered
   */
  private dirty: boolean = false;

  /**
   * Creates an instance of Mahō.
   */
  public constructor(
    node: HTMLInputElement,
    source: any,
    config?: IMahoConfig
  ) {
    super();

    this.node = node;
    this.node.id = `maho${this.id}`;

    this.source = source;
    this.config = config;

    this.bind();
  }

  /**
   * Configuration object accessor
   */
  public get config(): IMahoConfig {
    return assign({}, this._config);
  }

  public set config(value: IMahoConfig) {
    this._config = assign({}, defaultConfig, value);
  }

  /**
   * Search string accessor
   */
  public get search(): string {
    return this.node.value;
  }

  public set search(value: string) {
    this.node.value = value;
  }

  /**
   * Results list accessor
   */
  public get listElement(): HTMLElement {
    // try to use configuration-defined element
    // if not, use our own
    if (this._config.listElement instanceof HTMLElement) {
      return this._config.listElement;
    } else {
      // create an element if not already done so
      if (this._listElement === void 0) {
        let listElement = document.createElement('div');

        listElement.id = `maho${this.id}-list`;
        listElement.className = 'maho-list';

        document.body.appendChild(listElement);
        this._listElement = listElement;
      }
      return this._listElement;
    }
  }

  /**
   * Method to be used for retrieving data
   */
  protected fetch(): Promise<any[]> {
    let data: Promise<any[]>;

    if (typeof this.source === 'string') {
      data = fetch(this.source).then(response => response.json());
    } else {
      data = Promise.resolve(this.source);
    }

    return data.then(
      // flatten the response object
      // useful if the reponse is in the form of { "results": [...] }
      results => flatten(toArray(results))
    ).catch(
      () => Promise.reject('invalid source or source response')
      );
  }

  /**
   * Filters response against input
   */
  protected async match() {
    let results = await this.fetch();
    let hits = results.filter(this.config.matcher.bind(this, this.search));

    // write the new list to the DOM
    this.listClear();
    this.listElement.appendChild(this.makeListContent(hits));
    this.listShow();
  }

  /**
   * Clears the results list
   */
  private listClear() {
    let listElement = this.listElement;
    while (listElement.firstChild) {
      listElement.removeChild(listElement.firstChild);
    }
  }

  /**
   * Shows the list of results
   */
  private listShow() {
    this.listElement.className = 'maho-list';
    this.listElement.style.top = this.node.offsetTop
      + this.node.offsetHeight + 'px';
    this.listElement.style.left = this.node.offsetLeft + 'px';
    this.listElement.style.width = this.node.offsetWidth + 'px';
  }

  /**
   * Hides the list of results
   */
  private listHide() {
    this.listElement.className = 'maho-list maho-hide';
  }

  /**
   * Transforms an array into a DOM list
   */
  private makeListContent(list: any[]): DocumentFragment {
    // converge the array into a document fragment
    return list.reduce(
      (fragment, value) => {
        let item = document.createElement(this._config.itemElement);
        item.className = 'maho-list-item';
        item.innerText = value;

        fragment.appendChild(item);
        return fragment;
      },
      document.createDocumentFragment()
    );
  }

  /**
   * Binds the event handlers to the input field
   */
  private bind() {
    this.node.addEventListener(
      'keydown',
      this.onkeydown.bind(this)
    );
    this.node.addEventListener(
      'keyup',
      debounce(this.onkeyup.bind(this), this.config.delay)
    );
  }

  /**
   * Event handler for keydown
   */
  private onkeydown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case Key.DOWN_ARROW:
        event.preventDefault();
        return this.cursorDown();
      case Key.UP_ARROW:
        event.preventDefault();
        return this.cursorUp();
      case Key.PAGE_DOWN:
        event.preventDefault();
        return this.cursorEnd();
      case Key.PAGE_UP:
        event.preventDefault();
        return this.cursorStart();
      case Key.ESCAPE:
        event.preventDefault();
        this.cursorClear();
        return this.listHide();
      case Key.ENTER:
        event.preventDefault();
        this.cursorApply();
        return this.listHide();
      default:
        if (this.dirty) {
          this.cursorClear();
        }
        return;
    }
  }

  /**
   * Event handler for keyup
   */
  private onkeyup(event: KeyboardEvent) {
    switch (event.keyCode) {
      case Key.DOWN_ARROW:
      case Key.UP_ARROW:
      case Key.PAGE_UP:
      case Key.PAGE_DOWN:
      case Key.ESCAPE:
      case Key.ENTER:
        return;
      default:
        this._search = this.search;
        this.match();
    }
  }

  /**
   * Returns the active list item
   */
  private cursorSelect(): Element {
    let active = this.listElement.getElementsByClassName('maho-active');
    if (active.length) {
      return active[0];
    }
    return null;
  }

  /**
   * Makes the cursor the active selection
   */
  private cursorApply() {
    let cursor = this.cursorSelect();

    if (cursor) {
      this._search = this.search;
      this.cursorClear();
    }
  }

  /**
   * Removes the cursor
   */
  private cursorClear() {
    let cursor = this.cursorSelect();
    this.search = this._search;
    this.dirty = false;

    if (cursor) {
      cursor.className = '';
    }
  }

  /**
   * Moves the cursor at the start of the list
   */
  private cursorStart() {
    this.cursorClear();

    if (this.listElement.hasChildNodes) {
      let first = <Element>this.listElement.childNodes[0];
      first.className = 'maho-active';

      this.search = first.innerHTML;
      this.dirty = true;
    }
  }

  /**
   * Moves the cursor at the end of the list
   */
  private cursorEnd() {
    this.cursorClear();

    if (this.listElement.hasChildNodes) {
      let last = <Element>this.listElement.childNodes[
        this.listElement.childNodes.length - 1
      ];
      last.className = 'maho-active';

      this.search = last.innerHTML;
      this.dirty = true;
    }
  }

  /**
   * Moves the cursor downward
   */
  private cursorDown() {
    let cursor = this.cursorSelect();

    if (cursor) {
      if (cursor.nextSibling) {
        cursor.className = '';
        cursor = <Element>cursor.nextSibling;
        cursor.className = 'maho-active';

        this.search = cursor.innerHTML;
        this.dirty = true;
      } else {
        this.cursorClear();
      }
    } else {
      return this.cursorStart();
    }
  }

  /**
   * Moves the cursor upward
   */
  private cursorUp() {
    let cursor = this.cursorSelect();

    if (cursor) {
      if (cursor.previousSibling) {
        cursor.className = '';
        cursor = <Element>cursor.previousSibling;
        cursor.className = 'maho-active';

        this.search = cursor.innerHTML;
        this.dirty = true;
      } else {
        this.cursorClear();
      }
    } else {
      return this.cursorEnd();
    }
  }

}
