import { MahoBase } from './base.class';
import { IMahoConfig } from './config.interface';

/**
 * Mahō web component
 */
export class Maho extends MahoBase {

  /**
   * Mahō base node
   */
  private node: HTMLElement;

  /**
   * Creates an instance of Mahō.
   */
  constructor(node: HTMLElement, config?: IMahoConfig) {
    super(config);

    this.node = node;
  }

  /**
   * Search string accessor
   */
  get search(): string {
    return this.node.innerHTML;
  }

  set search(value: string) {
    this.node.innerHTML = value;
  }

}
