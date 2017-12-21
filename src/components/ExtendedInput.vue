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
      :class="actionableIcon.classlist"
      v-for="actionableIcon in actionableIcons"
      @click="onAction($event, actionableIcon)"
      :key="actionableIcon">
    </i>
    <div
      class="typeahead-items"
      v-show="myTypeaheadItems.length">
        <div class="item close-typeahead">
          <i
            class="icon close"
            @click="closeTypeahead"></i>
        </div>
        <div
          tabindex="-1"
          class="item"
          v-for="item in myTypeaheadItems"
          @click="typeaheadItemClicked(item)"
          v-focus="item === itemInFocus"
          @keydown="onKeydown($event)"
          :key="item">
            {{item}}
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
      typeaheadItems: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    data () {
      return {
        myText: this.text,
        myTypeaheadItems: [],
        inputInFocus: true,
        itemInFocus: undefined
      };
    },
    watch: {
      typeaheadItems: function (val) {
        this.myTypeaheadItems = val.slice(0);
      }
    },
    methods: {
      closeTypeahead: function () {
        this.myTypeaheadItems = [];
      },
      onKeydown: function (event) {
        var arrowKeys = [Keycode.uparrow, Keycode.downarrow];
        if (!arrowKeys.find(arrowKey => arrowKey === event.keyCode)) {
          this.closeTypeahead();
        } else if (this.myTypeaheadItems.length) {
          var inFocusIndex = this.myTypeaheadItems.indexOf(this.itemInFocus);

          if (inFocusIndex === -1) {
            this.itemInFocus = this.myTypeaheadItems[0];
            this.inputInFocus = false;
          } else if (inFocusIndex !== this.myTypeaheadItems.length - 1) {
            this.itemInFocus = this.myTypeaheadItems[inFocusIndex + 1];
            this.inputInFocus = false;
          } else {
            this.itemInFocus = undefined;
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
            event.target.focus();
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
      typeaheadItemClicked: function (clickedItem) {
        this.$emit('action', { action: 'typeahead-item-clicked', input: clickedItem });
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

  .typeahead-items {
    min-width: 15%;
    margin-top: .25rem;
    position: absolute;
    top: 100%;
  }

  .close-typeahead {
    left: 90%;
    position: absolute;
  }
</style>
