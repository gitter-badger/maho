/**
 * Configuration options for Mahō
 */
export interface IMahoConfig {
  /**
   * Time to wait (ms) before executing logic
   */
  delay?: number;
  /**
   * DOM element to use as the list
   * If none supplied, one will be created
   */
  listElement?: HTMLElement;
  /**
   * List item type
   * Type of elements to be created
   */
  itemElement?: string
}
