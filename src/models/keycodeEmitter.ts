import KeyCode from '../enums/keycode';

export default class KeycodeEmitter {
  keycode: KeyCode;
  retainFocus: boolean;
  shouldClear: boolean;

  constructor (keycode: KeyCode, { shouldClear = true, retainFocus = true } = {}) {
    this.keycode = keycode;
    this.shouldClear = shouldClear;
    this.retainFocus = retainFocus;
  }
}
