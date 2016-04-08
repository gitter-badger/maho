export interface IMatcher {
  (search: string, value: string): boolean;
}
