<template>
  <div class="extended-input">
    <input
      type="text"
      ref="input"
      @keydown="onInputKeydown($event)"
      :placeholder="placeholder"
      :disabled="disabled"
      v-focus="inputInFocus"
      v-model="myText" />
    <i
      class="icon"
      :class="actionableIcon.classList"
      v-for="actionableIcon in actionableIcons"
      @click="onActionableIconClick($event, actionableIcon)"
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
          @keydown="onSelectableOptionKeydown($event)"
          :key="option">
            {{option}}
        </div>
    </div>
  </div>
</template>

<script>
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
      advanceFocusKeycodes: {
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
          return [];
        }
      },
      placeholder: {
        type: String,
        default: ''
      },
      regressFocusKeycodes: {
        type: Array,
        default: function () {
          return [];
        }
      },
      selectableOptions: {
        type: Array,
        default: function () {
          return [];
        }
      },
      selectableOptionsKeycodeEmitters: {
        type: Array,
        default: function () {
          return [];
        }
      },
      text: {
        type: String,
        default: ''
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
      onInputKeydown: function (event) {
        this.p_handleKeydown(event, this.inputKeycodeEmitters, this.myText);
      },
      onSelectableOptionKeydown: function (event) {
        this.p_handleKeydown(event, this.selectableOptionsKeycodeEmitters, this.optionInFocus);
      },
      onActionableIconClick: function (event, actionableIcon) {
        this.$emit('action', { action: actionableIcon.action, input: this.myText });

        this.p_handleActionsCommonFunctionality(actionableIcon);
      },
      optionClicked: function (clickedOption) {
        this.$emit('action', { action: 'option-selected', input: clickedOption });
      },
      p_handleKeydown (event, keycodeEmitters, emit) {
        var keycodeEmitter = keycodeEmitters.find((keycodeEmitter) => keycodeEmitter.keycode === event.keyCode);
        if (keycodeEmitter) {
          if (emit) {
            this.$emit('key', { code: event.keyCode, input: emit });
          }

          this.p_handleActionsCommonFunctionality(keycodeEmitter);
        } else {
          this.p_handleFocus(event);
        }
      },
      p_handleActionsCommonFunctionality (action) {
        if (action.shouldClear) {
          this.myText = '';
        }

        if (action.retainFocus) {
          this.inputInFocus = true;
          this.optionInFocus = undefined;
        } else {
          this.inputInFocus = false;
        }
      },
      p_handleFocus (event) {
        var shouldAdvance = this.advanceFocusKeycodes.find(keyCode => keyCode === event.keyCode);
        var shouldRegress = this.regressFocusKeycodes.find(keyCode => keyCode === event.keyCode);

        if (this.mySelectableOptions.length && (shouldAdvance || shouldRegress)) {
          var inFocusIndex = this.mySelectableOptions.indexOf(this.optionInFocus);
          var lastOptionInFocus = inFocusIndex !== this.mySelectableOptions.length - 1;
          var firstOptionInFocus = inFocusIndex !== 0;

          if (this.inputInFocus) {
            this.optionInFocus = shouldAdvance ? this.mySelectableOptions[0] : this.mySelectableOptions[this.mySelectableOptions.length - 1];
            this.inputInFocus = false;
          } else if (shouldAdvance && lastOptionInFocus) {
            this.optionInFocus = this.mySelectableOptions[inFocusIndex + 1];
            this.inputInFocus = false;
          } else if (shouldRegress && firstOptionInFocus) {
            this.optionInFocus = this.mySelectableOptions[inFocusIndex - 1];
            this.inputInFocus = false;
          } else {
            this.optionInFocus = undefined;
            this.inputInFocus = true;
          }
        } else if (this.mySelectableOptions.length) {
          this.closeSelectableOptions();
        }
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

  .option:focus {
    outline: none;
  }
</style>
