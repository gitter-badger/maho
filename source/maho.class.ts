import { MahoBase } from './base.class';
import { IMahoConfig } from './config.interface';
import * as request from 'request';
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
    source?: string | any[],
    config?: IMahoConfig
  ) {
    super(config);

    this.node = node;

    // TODO: move this in a function
    if (typeof source === 'string') {
      this.fetch = () => new Promise<any[]>(function(resolve, reject) {
        request(`${location.protocol}//${location.host}/${source}`, function(error, response, body) {
          resolve(JSON.parse(body));
        });
      });
    } else {
      this.fetch = () => Promise.resolve(source);
    }

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

  private async match() {
    let results = await this.fetch();
    console.log(results);
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
