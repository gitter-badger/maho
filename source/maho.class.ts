import { MahoBase } from './base.class';
import { IMahoConfig } from './config.interface';
import { debounce } from 'underscore';

/**
 * Mahō web component
 */
export class Maho extends MahoBase {

  /**
   * Mahō base node
   */
  private node: HTMLInputElement;

  /**
   * Creates an instance of Mahō.
   */
  constructor(
    node: HTMLInputElement,
    source: any,
    config?: IMahoConfig
  ) {
    super(source, config);

    this.node = node;

    this.bind();
  }

  /**
   * Search string accessor
   */
  get search(): string {
    return this.node.value;
  }

  set search(value: string) {
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

    return data.then(Array.from).catch(
      () => Promise.reject('invalid source or source response')
    );
  }

  /**
   * Binds the event handlers to the input field
   */
  private bind() {
    this.node.addEventListener(
      "keyup",
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
