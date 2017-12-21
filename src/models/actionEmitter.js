export default class ActionEmitter {
  constructor (action, { classList = undefined, shouldClear = true, retainFocus = true } = {}) {
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
