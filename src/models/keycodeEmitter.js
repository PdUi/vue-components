export default class KeycodeEmitter {
  constructor (keycode, { shouldClear = true, retainFocus = true } = {}) {
    this.keycode = keycode;
    this.shouldClear = shouldClear;
    this.retainFocus = retainFocus;
  }
}
