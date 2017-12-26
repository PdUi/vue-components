<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class App extends Vue {
};
</script>

<style>
  .icon.close::after,
  .icon.delete::after,
  .icon.remove::after {
    content: 'X';
  }

  .icon.plus::after {
    content: '+';
  }
</style>
