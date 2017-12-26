<template>
  <extended-input
    v-on:action="onAction($event)"
    v-on:key="onKey($event)"
    :keycodeEmitters="keys"
    :selectableOptions="typeaheadItems"
    :advanceFocusKeycodes="advanceFocusKeycodes"
    :regressFocusKeycodes="regressFocusKeycodes">
  </extended-input>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import KeyCode from '../enums/keycode';
import KeycodeEmitter from '../models/keycodeEmitter';
import ExtendedInput from '../components/ExtendedInput.vue';

@Component({
  components: { ExtendedInput }
})
export default class ExtendedInputDemo extends Vue {
  keys: KeycodeEmitter[] = [
    new KeycodeEmitter(KeyCode.enter),
    new KeycodeEmitter(KeyCode.tab)
  ];
  typeaheadItems: any[] = [];
  advanceFocusKeycodes: KeycodeEmitter[] = [new KeycodeEmitter(KeyCode.downarrow)];
  regressFocusKeycodes: KeycodeEmitter[] = [new KeycodeEmitter(KeyCode.uparrow)];

  onKey (event: any) {
    console.log(event);
    this.typeaheadItems = ['water', 'h2o'];
  }

  onAction (event: any) {
    console.log(event);
  }
}
</script>

<style scoped>
</style>
