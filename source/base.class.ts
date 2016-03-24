/// <reference path="../typings/main.d.ts" />

import { IMahoConfig } from './config.interface';
import { defaultConfig } from './default.const';
import { assign } from 'underscore';

/**
 * Base class for all Mahō components
 *
 * @export
 * @abstract
 * @class MahoBase
 */
export abstract class MahoBase {

  /**
   * Mahō internal configuration object
   * Dictates how the component behaves
   *
   * @protected
   * @type {IMahoConfig}
   */
  protected _config: IMahoConfig;
  /**
   * Mahō internal search string
   * Used to filter against results
   *
   * @type {string}
   */
  protected _search: string;

  /**
   * Root Mahō constructor.
   *
   * @param {IMahoConfig} [config] configuration options
   */
  constructor(config?: IMahoConfig) {
    this.config = config;
  }

  /**
   * Configuration object accessor
   *
   * @type {IMahoConfig}
   */
  get config(): IMahoConfig {
    return this._config;
  }

  set config(value: IMahoConfig) {
    this._config = assign({}, defaultConfig, value);
  }

}
