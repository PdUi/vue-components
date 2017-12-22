<template>
  <div class="extended-input">
    <input
      type="text"
      @keydown="onKeydown($event)"
      :placeholder="placeholder"
      v-focus="inputInFocus"
      v-model="myText" />
    <i
      class="icon"
      :class="actionableIcon.classList"
      v-for="actionableIcon in actionableIcons"
      @click="onAction($event, actionableIcon)"
      :key="actionableIcon.action">
    </i>
    <div
      class="selectable-options"
      v-if="mySelectableOptions.length">
        <div class="option close-selectable-options">
          <i
            class="icon close"
            @click="closeSelectableOptions()"></i>
        </div>
        <div
          tabindex="-1"
          class="option"
          v-for="option in mySelectableOptions"
          @click="optionClicked(option)"
          v-focus="option === optionInFocus"
          @keydown="onKeydown($event)"
          :key="option">
            {{option}}
        </div>
    </div>
  </div>
</template>

<script>
  import Keycode from '@/enums/keycode';
  import focus from '@/directives/focus';

  export default {
    name: 'extended-input',
    directives: {
      focus: focus
    },
    props: {
      actionableIcons: {
        type: Array,
        default: function () {
          return [];
        }
      },
      keycodeEmitters: {
        type: Array,
        default: function () {
          return [];
        }
      },
      placeholder: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      selectableOptions: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    data () {
      return {
        myText: this.text,
        mySelectableOptions: this.selectableOptions,
        inputInFocus: true,
        optionInFocus: undefined
      };
    },
    watch: {
      selectableOptions: function (val) {
        this.mySelectableOptions = val.slice(0);
      }
    },
    methods: {
      closeSelectableOptions: function () {
        this.mySelectableOptions = [];
      },
      onKeydown: function (event) {
        var arrowKeys = [Keycode.uparrow, Keycode.downarrow];
        if (!arrowKeys.find(arrowKey => arrowKey === event.keyCode)) {
          this.closeSelectableOptions();
        } else if (this.mySelectableOptions.length) {
          var inFocusIndex = this.mySelectableOptions.indexOf(this.optionInFocus);

          if (inFocusIndex === -1) {
            this.optionInFocus = this.mySelectableOptions[0];
            this.inputInFocus = false;
          } else if (inFocusIndex !== this.mySelectableOptions.length - 1) {
            this.optionInFocus = this.mySelectableOptions[inFocusIndex + 1];
            this.inputInFocus = false;
          } else {
            this.optionInFocus = undefined;
            this.inputInFocus = true;
          }
        }

        var keycodeEmitter = this.keycodeEmitters.find((keycodeEmitter) => keycodeEmitter.keycode === event.keyCode);
        if (keycodeEmitter) {
          this.$emit('key', { code: event.keyCode, input: this.myText });

          if (keycodeEmitter.shouldClear) {
            this.myText = '';
          }

          if (keycodeEmitter.retainFocus) {
            this.inputInFocus = true;
            this.optionInFocus = undefined;
          } else {
            this.inputInFocus = false;
          }
        }
      },
      onAction: function (event, actionableIcon) {
        this.$emit('action', { action: actionableIcon.action, input: this.myText });

        if (actionableIcon.shouldClear) {
          this.myText = '';
        }

        if (actionableIcon.retainFocus) {
          this.event.element.focus();
        }
      },
      optionClicked: function (clickedOption) {
        this.$emit('action', { action: 'option-selected', input: clickedOption });
      }
    }
  };
</script>

<style scoped>
  .extended-input {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-grow: 1;
    position: relative;
  }

  input {
    border: 0;
    min-width: 15%;
  }

  input:focus {
    outline: unset;
  }

  .selectable-options {
    min-width: 15%;
    margin-top: .25rem;
    position: absolute;
    top: 100%;
  }

  .close-selectable-options {
    left: 90%;
    position: absolute;
  }
</style>
