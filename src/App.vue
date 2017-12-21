<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
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
