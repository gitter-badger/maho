import { MahoBase } from './base.class';
import { IMahoConfig } from './config.interface';

/**
 * Mahō web component
 *
 * @export
 * @class Maho
 * @extends {MahoBase}
 */
export class Maho extends MahoBase {

  /**
   * Mahō base node
   *
   * @private
   * @type {Element}
   */
  private node: Element;

  /**
   * Creates an instance of Mahō.
   *
   * @param {string} selector css selector for target element
   * @param {IMahoConfig} [config] configuration options
   */
  constructor(selector: string, config?: IMahoConfig)
  /**
   * Creates an instance of Mahō.
   *
   * @param {Element} node target element
   * @param {IMahoConfig} [config] configuration options
   */
  constructor(node: Element, config?: IMahoConfig)
  constructor(element: (Element | string), config?: IMahoConfig) {
    super();

    if (typeof element === 'string') {
      // todo: better selector
      this.node = document.querySelectorAll(element)[0];
    } else {
      this.node = element;
    }
  }

  /**
   * Search string
   * @type {string}
   */
  get search(): string {
    return this.node.innerHTML;
  }

  set search(value: string) {
    this.node.innerHTML = value;
  }

}
