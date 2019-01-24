import Vue from 'vue';
import ExtendedInput from '@/components/ExtendedInput';
import ActionEmitter from '@/models/actionEmitter';
import KeycodeEmitter from '@/models/keycodeEmitter';
import { KeyCode } from '@/enums/keycode';

const Constructor = Vue.extend(ExtendedInput);
const vmFactory = propsData => new Constructor({ propsData }).$mount();

describe('ExtendedInput.vue', () => {
  describe('default props', () => {
    it('should have no text', () => {
      const vm = vmFactory();

      expect(vm.$el.querySelector('input').value)
        .toEqual('');
    });

    it('should place focus on input', () => {
      const vm = vmFactory();

      expect(vm.$el.querySelector(':focus').tagName)
        .toEqual('INPUT');
    });

    it('should have no area rendered for selectable options', () => {
      const vm = vmFactory();

      expect(vm.$el.querySelector('.selectable-options'))
        .toBeNull();
    });

    it('should have no placeholder', () => {
      const vm = vmFactory();

      expect(vm.$el.querySelector('input').placeholder)
        .toEqual('');
    });

    it('should not be disabled', () => {
      const vm = vmFactory();

      expect(vm.$el.querySelector('input:disabled'))
        .toBeNull();
    });

    it('should not have actionable icons', () => {
      const vm = vmFactory();

      expect(vm.$el.querySelectorAll('extended-input > i').length)
        .toEqual(0);
    });
  });

  describe('input', () => {
    it('should have text', () => {
      const vm = vmFactory({ text: 'Hello World!' });

      expect(vm.$el.querySelector('input').value)
        .toEqual('Hello World!');
    });

    it('should have placeholder', () => {
      const vm = vmFactory({ placeholder: 'Hello World!' });

      expect(vm.$el.querySelector('input').placeholder)
        .toEqual('Hello World!');
    });

    it('should be disabled', () => {
      const vm = vmFactory({ disabled: true });

      expect(vm.$el.querySelector('input:disabled'))
        .not
        .toBeNull();
    });

    it('calls onKeydown when key pressed in input', () => {
      const stub = jest.fn();
      const vm = vmFactory();
      vm.onInputKeyup = stub;

      const event = document.createEvent('HTMLEvents');
      event.initEvent('keyup', false, true);
      vm.$el.querySelector('input').dispatchEvent(event);
      expect(stub).toBeCalled();
    });
  });

  describe('actionableIcons', () => {
    it('should have 2 icons', () => {
      const actionableIcons = [new ActionEmitter(), new ActionEmitter()];
      const vm = vmFactory({ actionableIcons });

      expect(vm.$el.querySelectorAll('.extended-input > i').length)
        .toEqual(actionableIcons.length);
    });

    it('should have classList', () => {
      const classes = ['delete', 'close'];
      const actionableIcons = [new ActionEmitter('', { classList: classes.join(' ') })];
      const vm = vmFactory({ actionableIcons });

      expect(vm.$el.querySelector('.extended-input > i').classList)
        .toContain('icon');

      expect(vm.$el.querySelector('.extended-input > i').classList)
        .toContain(classes[0]);

      expect(vm.$el.querySelector('.extended-input > i').classList)
        .toContain(classes[1]);
    });

    it('calls onActionableIconClick when click on actionableIcon', () => {
      const stub = jest.fn();
      const classes = 'delete close';
      const actionableIcons = [new ActionEmitter('', { classList: classes })];
      const vm = vmFactory({ actionableIcons });
      vm.onActionableIconClick = stub;

      vm.$el.querySelector(`.delete`).click();
      expect(stub).toBeCalled();
    });
  });

  describe('selectableOptions', () => {
    it('should be rendered', () => {
      const selectableOptions = [''];
      const vm = vmFactory({ selectableOptions });

      expect(vm.$el.querySelector('.selectable-options'))
        .not
        .toBeNull();
    });

    it('calls closeSelectableOptions when click on close icon', () => {
      const stub = jest.fn();
      const selectableOptions = [''];
      const vm = vmFactory({ selectableOptions });
      vm.closeSelectableOptions = stub;

      vm.$el.querySelector('.icon.close').click();
      expect(stub).toBeCalled();
    });

    it('should be closable', () => {
      const selectableOptions = [''];
      const vm = vmFactory({ selectableOptions });

      expect(vm.$el.querySelector('.icon.close'))
        .not
        .toBeNull();

      vm.$el.querySelector('.icon.close').click();
      vm._watcher.run();
      expect(vm.$el.querySelector('.icon.close'))
        .toBeNull();
    });

    it('should render all options', () => {
      const selectableOptions = ['', ''];
      const vm = vmFactory({ selectableOptions });

      expect(vm.$el.querySelectorAll('.option:not(.close-selectable-options)').length)
        .toEqual(2);
    });

    it('should not place focus on any option', () => {
      const vm = vmFactory();

      expect(vm.$el.querySelectorAll('.option:focus').length)
        .toEqual(0);
    });

    it('calls onKeydown when key pressed on option', () => {
      const stub = jest.fn();
      const selectableOptions = ['', ''];
      const vm = vmFactory({ selectableOptions });
      vm.onSelectableOptionKeydown = stub;

      const event = document.createEvent('HTMLEvents');
      event.initEvent('keydown', false, true);
      vm.$el.querySelector('.option:not(.close-selectable-options)').dispatchEvent(event);
      expect(stub).toBeCalled();
    });
  });

  describe('closeSelectableOptions', () => {
    it('should clear mySelectableOptions', () => {
      const selectableOptions = ['', ''];
      const vm = vmFactory({ selectableOptions });

      expect(vm.mySelectableOptions.length)
        .toEqual(2);

      vm.closeSelectableOptions();

      expect(vm.mySelectableOptions.length)
        .toEqual(0);
    });
  });

  describe('onInputKeyup', () => {
    it('should call p_handleKey', () => {
      const stub = jest.fn();

      const vm = vmFactory();
      vm.p_handleKey = stub;
      vm.onInputKeyup(undefined);

      expect(stub)
        .toBeCalled();
    });
  });

  describe('onSelectableOptionKeydown', () => {
    it('should call p_handleKey', () => {
      const stub = jest.fn();

      const vm = vmFactory();
      vm.p_handleKey = stub;
      vm.onSelectableOptionKeydown(undefined);

      expect(stub)
        .toBeCalled();
    });
  });

  describe('onActionableIconClick', () => {
    it('should emit', () => {
      const stub = jest.fn();
      const vm = vmFactory();
      vm.$emit = stub;
      vm.onActionableIconClick({}, {});
      expect(stub).toBeCalled();
    });

    it('should clear text', () => {
      const vm = vmFactory({ text: 'Hello World' });
      expect(vm.myText).toEqual('Hello World');

      vm.onActionableIconClick({}, new ActionEmitter('', { retainFocus: false, shouldClear: true }));
      expect(vm.myText).toEqual('');
    });

    it('should not clear text', () => {
      const vm = vmFactory({ text: 'Hello World' });
      expect(vm.myText).toEqual('Hello World');

      vm.onActionableIconClick({}, new ActionEmitter('', { retainFocus: false, shouldClear: false }));
      expect(vm.myText).toEqual('Hello World');
    });

    it('should keep input in focus', () => {
      const vm = vmFactory({ inputInFocus: false });

      vm.onActionableIconClick({}, new ActionEmitter());
      expect(vm.inputInFocus).toEqual(true);
      expect(vm.optionInFocus).toEqual(undefined);
    });

    it('should keep not input in focus', () => {
      const vm = vmFactory({ inputInFocus: true });

      vm.onActionableIconClick({}, new ActionEmitter('', { retainFocus: false }));
      expect(vm.inputInFocus).toEqual(false);
    });
  });

  describe('optionClicked', () => {
    it('should emit', () => {
      const stub = jest.fn();
      const vm = vmFactory();
      vm.$emit = stub;
      vm.optionClicked();
      expect(stub).toBeCalled();
    });
  });

  describe('p_handleKey', () => {
    it('p_handleFocus should be called', () => {
      const inputKeycodeEmitters = [new KeycodeEmitter(KeyCode.enter)];
      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.tab;
      event.initEvent('keydown', false, true);

      const stub = jest.fn();
      const vm = vmFactory();
      vm.p_handleFocus = stub;
      vm.p_handleKey(event, inputKeycodeEmitters, undefined);
      expect(stub).toBeCalled();
    });

    it('p_handleActionsCommonFunctionality should be called', () => {
      const inputKeycodeEmitters = [new KeycodeEmitter(KeyCode.enter)];
      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);

      const stub = jest.fn();
      const vm = vmFactory();
      vm.p_handleActionsCommonFunctionality = stub;
      vm.p_handleKey(event, inputKeycodeEmitters, undefined);
      expect(stub).toBeCalled();
    });

    it('$emit should be called', () => {
      const inputKeycodeEmitters = [new KeycodeEmitter(KeyCode.enter)];
      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);

      const stub = jest.fn();
      const vm = vmFactory();
      vm.$emit = stub;
      vm.p_handleKey(event, inputKeycodeEmitters, 'Hello World');
      expect(stub).toBeCalled();
    });
  });

  describe('p_handleActionsCommonFunctionality', () => {
    it('input should retain focus', () => {
      const inputKeycodeEmitters = [new KeycodeEmitter(KeyCode.enter)];
      const vm = vmFactory({ inputKeycodeEmitters });

      expect(vm.inputInFocus)
        .toEqual(true);

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keyup', false, true);

      vm.onInputKeyup(event);

      expect(vm.inputInFocus)
        .toEqual(true);
    });

    it('input should not retain focus', () => {
      const inputKeycodeEmitters = [new KeycodeEmitter(KeyCode.enter, { retainFocus: false })];
      const vm = vmFactory({ inputKeycodeEmitters });

      expect(vm.inputInFocus)
        .toEqual(true);

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keyup', false, true);

      vm.onInputKeyup(event);

      expect(vm.inputInFocus)
        .toEqual(false);
    });

    it('focus should be called on input', () => {
      const stub = jest.fn();

      const inputKeycodeEmitters = [new KeycodeEmitter(KeyCode.enter)];
      const vm = vmFactory({ inputKeycodeEmitters });

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);
      vm.$el.querySelector('input').dispatchEvent(event);
      event.target.focus = stub;

      vm._watcher.run();

      expect(stub)
        .toBeCalled();
    });

    it('focus should not be called on input', () => {
      const stub = jest.fn();

      const inputKeycodeEmitters = [new KeycodeEmitter(KeyCode.enter, { retainFocus: false })];
      const vm = vmFactory({ inputKeycodeEmitters });

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keyup', false, true);
      vm.$el.querySelector('input').dispatchEvent(event);
      event.target.focus = stub;

      vm._watcher.run();

      expect(stub)
        .not
        .toBeCalled();
    });

    it('keycode emitter should clear input', () => {
      const inputKeycodeEmitters = [new KeycodeEmitter(KeyCode.enter)];
      const vm = vmFactory({ text: 'Hello World', inputKeycodeEmitters });

      expect(vm.$el.querySelector('input').value)
        .toEqual('Hello World');

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keyup', false, true);
      vm.$el.querySelector('input').dispatchEvent(event);

      vm._watcher.run();

      expect(vm.$el.querySelector('input').value)
        .toEqual('');
    });

    it('keycode emitter should not clear input', () => {
      const inputKeycodeEmitters = [new KeycodeEmitter(KeyCode.enter, { shouldClear: false })];
      const vm = vmFactory({ text: 'Hello World', inputKeycodeEmitters });

      expect(vm.$el.querySelector('input').value)
        .toEqual('Hello World');

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);
      vm.$el.querySelector('input').dispatchEvent(event);

      vm._watcher.run();

      expect(vm.$el.querySelector('input').value)
        .toEqual('Hello World');
    });
  });

  describe('p_handleFocus', () => {
    it('should close selectable options', () => {
      const stub = jest.fn();

      const vm = vmFactory({ advanceFocusKeycodes: [], regressFocusKeycodes: [], selectableOptions: [''] });

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);

      vm.closeSelectableOptions = stub;
      vm.p_handleFocus(event);

      expect(stub)
        .toBeCalled();
    });

    it('should not close selectable options', () => {
      const stub = jest.fn();

      const vm = vmFactory({ advanceFocusKeycodes: [KeyCode.enter], regressFocusKeycodes: [], selectableOptions: [''] });

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);

      vm.closeSelectableOptions = stub;
      vm.p_handleFocus(event);

      expect(stub)
        .not
        .toBeCalled();
    });

    it('should remove focus from input', () => {
      const vm = vmFactory({
        advanceFocusKeycodes: [KeyCode.enter],
        regressFocusKeycodes: [],
        selectableOptions: ['']
      });

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);

      expect(vm.inputInFocus)
        .toEqual(true);

      vm.p_handleFocus(event);

      expect(vm.inputInFocus)
        .toEqual(false);
    });

    it('should place focus on option', () => {
      const vm = vmFactory({
        advanceFocusKeycodes: [KeyCode.enter],
        regressFocusKeycodes: [],
        selectableOptions: ['']
      });

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);

      expect(vm.optionInFocus)
        .toEqual(undefined);

      vm.p_handleFocus(event);

      expect(vm.optionInFocus)
        .toEqual('');
    });

    it('should advance focus', () => {
      const selectableOptions = ['foo', 'bar'];
      const vm = vmFactory({
        advanceFocusKeycodes: [KeyCode.enter],
        regressFocusKeycodes: [],
        selectableOptions
      });

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);

      vm.optionInFocus = selectableOptions[0];
      vm.inputInFocus = false;

      vm.p_handleFocus(event);

      expect(vm.optionInFocus)
        .toEqual(selectableOptions[1]);
    });

    it('should regress focus', () => {
      const selectableOptions = ['foo', 'bar'];
      const vm = vmFactory({
        advanceFocusKeycodes: [],
        regressFocusKeycodes: [KeyCode.enter],
        selectableOptions
      });

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);

      vm.optionInFocus = selectableOptions[1];
      vm.inputInFocus = false;

      vm.p_handleFocus(event);

      expect(vm.optionInFocus)
        .toEqual(selectableOptions[0]);
    });

    it('should place focus on input', () => {
      const selectableOptions = ['foo', 'bar'];
      const vm = vmFactory({
        advanceFocusKeycodes: [],
        regressFocusKeycodes: [KeyCode.enter],
        selectableOptions
      });

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);

      vm.optionInFocus = selectableOptions[0];
      vm.inputInFocus = false;

      vm.p_handleFocus(event);

      expect(vm.inputInFocus)
        .toEqual(true);
    });

    it('should remove focus from option', () => {
      const selectableOptions = ['foo', 'bar'];
      const vm = vmFactory({
        advanceFocusKeycodes: [],
        regressFocusKeycodes: [KeyCode.enter],
        selectableOptions
      });

      const event = document.createEvent('HTMLEvents');
      event.keyCode = KeyCode.enter;
      event.initEvent('keydown', false, true);

      vm.optionInFocus = selectableOptions[0];
      vm.inputInFocus = false;

      vm.p_handleFocus(event);

      expect(vm.optionInFocus)
        .toEqual(undefined);
    });
  });
});
