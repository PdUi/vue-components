export default class ActionEmitter {
  action: string;
  classList: string[];
  retainFocus: boolean;
  shouldClear: boolean;

  constructor (action: string, { classList = undefined, shouldClear = true, retainFocus = true }: { classList?: string | string[] | undefined, shouldClear?: boolean, retainFocus?: boolean } = {}) {
    classList = classList || [];
    if (classList instanceof String) {
      classList = classList.split(' ');
    }

    this.action = action;
    this.classList = classList;
    this.shouldClear = shouldClear;
    this.retainFocus = retainFocus;
  }
}
