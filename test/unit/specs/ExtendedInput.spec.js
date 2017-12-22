import Vue from 'vue';
import ExtendedInput from '@/components/ExtendedInput';
import ActionEmitter from '@/models/actionEmitter';

const Constructor = Vue.extend(ExtendedInput);
const vmFactory = propsData => new Constructor({ propsData }).$mount();

describe('ExtendedInput.vue', () => {
  describe('default props', () => {
    it('should have an empty input', () => {
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

    it('calls onKeydown when key pressed in input', () => {
      const stub = jest.fn();
      const vm = vmFactory();
      vm.onKeydown = stub;

      const event = document.createEvent('HTMLEvents');
      // event.keyCode = 35;
      event.initEvent('keydown', false, true);
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

    it('calls onAction when click on actionableIcon', () => {
      const stub = jest.fn();
      const classes = ['delete', 'close'];
      const actionableIcons = [new ActionEmitter('', { classList: classes.join(' ') })];
      const vm = vmFactory({ actionableIcons });
      vm.onAction = stub;

      vm.$el.querySelector(`.${classes[0]}`).click();
      expect(stub).toBeCalled();
    });

    // it('calls handleClick when click on message', () => {
    //   const classes = ['delete', 'close'];
    //   const actionableIcons = [new ActionEmitter('', { classList: classes.join(' ') })];
    //   const Constructor = Vue.extend(ExtendedInput);
    //   const vm = new Constructor({ propsData: { actionableIcons } }).$mount();
    //   spyOn(vm, 'onAction');

    //   vm.$el.querySelector(`.${classes[0]}`).click();
    //   expect(vm.onAction).toBeCalled();
    // });
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
  });
});
