import { IMatcher } from './matcher.interface';

export class Matcher {

  /**
   * The search string must appear at the start of the value
   */
  public static matchStart: IMatcher = (search, value) => {
    return RegExp(`^${search}`, 'i').test(value);
  };

  /**
   * The search string may be found anywhere within the value
   */
  public static matchAnywhere: IMatcher = (search, value) => {
    return RegExp(`${search}`, 'i').test(value);
  };

  /**
   * The search string may be found anywhere within the value, allowing gaps
   */
  public static matchAnywhereSparse: IMatcher = (search, value) => {
    return RegExp(`${search.replace(/./gi, '$&.*')}`, 'i')
      .test(value);
  };

  /**
   * The search string and the value must be identical
   */
  public static matchExactly: IMatcher = (search, value) => {
    return RegExp(`^${search}$`, 'i').test(value);
  };

}
