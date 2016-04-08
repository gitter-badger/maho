import { IMahoConfig } from './config.interface';
import { Matcher } from './matcher.class';
import { TimeUnit } from './time.enum';

/**
 * Default configuration object for Mahō
 */
export const defaultConfig: IMahoConfig = {
  delay: 300 * TimeUnit.MILLISECONDS,
  // listElement?
  itemElement: 'div',
  matcher: Matcher.matchAnywhere
};
