import Vue from 'vue';
import ExtendedInput from '@/components/ExtendedInput';
import ActionEmitter from '@/models/actionEmitter';

describe('default ExtendedInput.vue', () => {
  it('should have an empty input', () => {
    const Constructor = Vue.extend(ExtendedInput);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('input').value)
      .toEqual('');
  });

  it('should place focus on input', () => {
    const Constructor = Vue.extend(ExtendedInput);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector(':focus').tagName)
      .toEqual('INPUT');
  });

  it('should have no area rendered for selectable options', () => {
    const Constructor = Vue.extend(ExtendedInput);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.selectable-options'))
      .toBeNull();
  });

  it('should have no placeholder', () => {
    const Constructor = Vue.extend(ExtendedInput);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('input').placeholder)
      .toEqual('');
  });
});

describe('ExtendedInput.vue input', () => {
  it('should have text', () => {
    const Constructor = Vue.extend(ExtendedInput);
    const vm = new Constructor({ propsData: { text: 'Hello World!' } }).$mount();
    expect(vm.$el.querySelector('input').value)
      .toEqual('Hello World!');
  });

  it('should have placeholder', () => {
    const Constructor = Vue.extend(ExtendedInput);
    const vm = new Constructor({ propsData: { placeholder: 'Hello World!' } }).$mount();
    expect(vm.$el.querySelector('input').placeholder)
      .toEqual('Hello World!');
  });
});

describe('ExtendedInput.vue actionableIcons', () => {
  // actionableIcons: [{ classList: '', action: '', shouldClear: true, retainFocus: true }] }
  it('should have 2 icons', () => {
    const actionableIcons = [new ActionEmitter(), new ActionEmitter()];
    const Constructor = Vue.extend(ExtendedInput);
    const vm = new Constructor({ propsData: { actionableIcons } }).$mount();
    expect(vm.$el.querySelectorAll('.extended-input > i').length)
      .toEqual(actionableIcons.length);
  });

  it('should have classList', () => {
    const classes = ['delete', 'close'];
    const actionableIcons = [new ActionEmitter('', { classList: classes.join(' ') })];
    const Constructor = Vue.extend(ExtendedInput);
    const vm = new Constructor({ propsData: { actionableIcons } }).$mount();
    expect(vm.$el.querySelector('.extended-input > i').classList)
      .toContain(classes[0]);

    expect(vm.$el.querySelector('.extended-input > i').classList)
      .toContain(classes[1]);
  });
});
