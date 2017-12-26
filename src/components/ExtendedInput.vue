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

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop, Watch } from 'vue-property-decorator';

  import focus from '../directives/focus';
  import ActionEmitter from '../models/actionEmitter';
  import KeycodeEmitter from '../models/keycodeEmitter';

  @Component({
    directives: { focus }
  })
  export default class ExtendedInput extends Vue {
    @Prop() actionableIcons: ActionEmitter[];
    @Prop() keycodeEmitters: KeycodeEmitter[];
    @Prop() advanceFocusKeycodes: any[];
    @Prop() regressFocusKeycodes: any[];
    @Prop() placeholder: string;
    @Prop() text: string;
    @Prop() selectableOptions: any[];

    myText: string = ''; // this.text;
    mySelectableOptions: any[] = this.selectableOptions;
    inputInFocus: boolean = true;
    optionInFocus: any = undefined;
    // name: 'extended-input',
    // directives: {
    //   focus: focus
    // },
    // data () {
    //   return {
    //     myText: this.text,
    //     mySelectableOptions: this.selectableOptions,
    //     inputInFocus: true,
    //     optionInFocus: undefined
    //   };
    // },
    @Watch('selectableOptions') onChange (val: any[], oldVal: any[]) {
      this.mySelectableOptions = val.slice(0);
    }

    closeSelectableOptions () {
      this.mySelectableOptions = [];
    }

    onKeydown (event: any) {
      var shouldAdvance = !!this.advanceFocusKeycodes.find(arrowKey => arrowKey.keycode === event.keyCode);
      var shouldRegress = !!this.regressFocusKeycodes.find(arrowKey => arrowKey.keycode === event.keyCode);

      if (this.mySelectableOptions.length && (shouldAdvance || shouldRegress)) {
        var inFocusIndex = this.mySelectableOptions.indexOf(this.optionInFocus);
        var lastOptionInFocus = inFocusIndex === this.mySelectableOptions.length - 1;
        var firstOptionInFocus = inFocusIndex === 0;

        console.log(this.inputInFocus);
        console.log(inFocusIndex);
        console.log(`lastOptionInFocus: ${lastOptionInFocus}`);
        console.log(`firstOptionInFocus: ${firstOptionInFocus}`);
        console.log(`shouldAdvance: ${shouldAdvance}`);
        console.log(`shouldRegress: ${shouldRegress}`);

        if (this.inputInFocus) {
          this.optionInFocus = shouldAdvance ? this.mySelectableOptions[0] : this.mySelectableOptions[this.mySelectableOptions.length - 1];
          this.inputInFocus = false;
        } else if (shouldAdvance && !lastOptionInFocus) {
          console.log('here');
          this.optionInFocus = this.mySelectableOptions[inFocusIndex + 1];
          this.inputInFocus = false;
        } else if (shouldRegress && !firstOptionInFocus) {
          this.optionInFocus = this.mySelectableOptions[inFocusIndex - 1];
          this.inputInFocus = false;
        } else {
          this.optionInFocus = undefined;
          this.inputInFocus = true;
        }
      } else {
        this.closeSelectableOptions();
      }

      var keycodeEmitter = this.keycodeEmitters.find((keycodeEmitter) => keycodeEmitter.keycode === event.keyCode);
      if (keycodeEmitter) {
        this.$emit('key', { code: event.keyCode, input: this.myText });

        this.pHandleActionsCommonFunctionality(keycodeEmitter);
      }
    }

    onAction (event: any, actionableIcon: any) {
      this.$emit('action', { action: actionableIcon.action, input: this.myText });

      this.pHandleActionsCommonFunctionality(actionableIcon);
    }

    optionClicked (clickedOption: any) {
      this.$emit('action', { action: 'option-selected', input: clickedOption });
    }

    pHandleActionsCommonFunctionality (action: any) {
      if (action.shouldClear) {
        this.myText = '';
      }

      if (action.retainFocus) {
        this.inputInFocus = true;
        this.optionInFocus = undefined;
      } else {
        this.inputInFocus = false;
      }
    }
  }
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
