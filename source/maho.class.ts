/// <reference path="../typings/main.d.ts" />

import { assign, debounce, flatten, toArray } from 'underscore';

import { IMahoConfig } from './config.interface';
import { defaultConfig } from './default.const';

/**
 * Mahō web component
 */
export class Maho {

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
   * Mahō base node
   */
  private node: HTMLInputElement;

  /**
   * Creates an instance of Mahō.
   */
  public constructor(
    node: HTMLInputElement,
    source: any,
    config?: IMahoConfig
  ) {
    this.node = node;
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
    console.log(results);
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
