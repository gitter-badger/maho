/// <reference path="../typings/main.d.ts" />

import { IMahoConfig } from './config.interface';
import { defaultConfig } from './default.const';
import { assign } from 'underscore';

/**
 * Base class for all Mahō components
 */
export abstract class MahoBase {

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
   * Data source
   * May be changed at any time
   */
  public source: any;

  /**
   * Root Mahō constructor.
   */
  constructor(source, config?: IMahoConfig) {
    this.source = source;
    this.config = config;
  }

  /**
   * Method to be used for retrieving data
   */
  protected abstract fetch(): Promise<any[]>

  /**
   * Configuration object accessor
   */
  get config(): IMahoConfig {
    return assign({}, this._config);
  }

  set config(value: IMahoConfig) {
    this._config = assign({}, defaultConfig, value);
  }

}
