/// <reference path="../typings/main.d.ts" />

import { assign, debounce, flatten, toArray } from 'underscore';

import { IMahoConfig } from './config.interface';
import { defaultConfig } from './default.const';

/**
 * Mahō web component
 */
export class Maho {

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
  protected _search: string;

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
   * Creates an instance of Mahō.
   */
  public constructor(
    node: HTMLInputElement,
    source: any,
    config?: IMahoConfig
  ) {
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

        listElement.id = `maho${this.id}_list`;

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

    // write the new list to the DOM
    this.clearList();
    this.listElement.appendChild(this.makeListContent(results));
  }

  /**
   * Clears the results list
   */
  private clearList() {
    let listElement = this.listElement;
    while (listElement.firstChild) {
      listElement.removeChild(listElement.firstChild);
    }
  }

  /**
   * Transforms an array into a DOM list
   */
  private makeListContent(list: any[]): DocumentFragment {
    // converge the array into a document fragment
    return list.reduce(
      (fragment, value) => {
        let item = document.createElement(this._config.itemElement);
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
      'keyup',
      debounce(this.onkeyup.bind(this), this.config.delay)
    );
  }

  /**
   * Event handler for keyup
   */
  private onkeyup() {
    console.log(`you searched for '${this.search}'`);
    this.match();
  }

}
