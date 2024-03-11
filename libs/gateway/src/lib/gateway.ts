import * as _ from 'radash'
export function gateway(): string {
  return _.uid(4);
}
