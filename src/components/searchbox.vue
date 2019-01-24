<template>
  <div class="search-box">
    <extended-input
      :actionableIcons="myActionableIcons"
      :disabled="disabled"
      :inputKeycodeEmitters="inputKeycodeEmitters"
      :placeholder="placeholder"
      :selectableOptions="selectableOptions"
      v-on:key="onKey($event)"
      v-on:action="onAction($event)">
    </extended-input>
  </div>
</template>

<script>
  import ExtendedInput from '@/components/ExtendedInput';
  import ActionEmitter from '@/models/actionEmitter';
  import KeycodeEmitter from '@/models/keycodeEmitter';
  import { KeyCode, TextKeyCodes } from '@/enums/keycode';
  import { isNullOrWhiteSpace } from '@/extensions/string';

  export default {
    name: 'search-box',
    components: {
      ExtendedInput
    },
    props: {
      actionableIcons: {
        type: Array,
        default: function () {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      inputKeycodeEmitters: {
        type: Array,
        default: function () {
          return TextKeyCodes.map(keycode => {
            return new KeycodeEmitter(keycode, { shouldClear: false });
          }).concat([
            new KeycodeEmitter(KeyCode.enter)
          ]);
        }
      },
      placeholder: {
        type: String,
        default: 'Enter search text...'
      },
      selectableOptions: {
        type: Array,
        default: function () {
          return [];
        }
      },
      typeaheadFunction: {
        type: Function,
        default: function (searchTerm) {
          console.log(searchTerm);
          // this.selectableOptions = ['water', 'h2o'];
        }
      }
    },
    data () {
      return {
        myActionableIcons: this.actionableIcons
      };
    },
    methods: {
      onKey: function (event) {
        if (isNullOrWhiteSpace(event.input)) {
          this.myActionableIcons = [];
        } else {
          if (!this.myActionableIcons.length) {
            this.myActionableIcons = [
              new ActionEmitter('clear', { classList: 'clear' }),
              new ActionEmitter('search', { classList: 'search', shouldClear: false })
            ];
          }

          if (event.keycode !== KeyCode.enter) {
            this.typeaheadFunction(event.input);
          } else {
            this.$emit('search', event.input);
          }
        }
      },
      onAction: function (event) {
        if (event.action === 'search') {
          this.$emit('search', event.input);
        }
      }
    }
  };
</script>

<style scoped>
</style>

<style>
  .icon.search::after {
    content: '\2315';
  }

  .icon.clear::after {
    content: 'x';
  }
</style>
