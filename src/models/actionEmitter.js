export default class ActionEmitter {
  constructor (action, { classlist = '', shouldClear = true, retainFocus = true } = {}) {
    this.action = action;
    this.classlist = classlist;
    this.shouldClear = shouldClear;
    this.retainFocus = retainFocus;
  }
}
