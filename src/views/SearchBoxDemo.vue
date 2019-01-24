<template>
  <search-box v-on:search="onSearch($event)" :typeaheadFunction="typeaheadFunction"></search-box>
</template>

<script>
import SearchBox from '@/components/SearchBox';

export default {
  name: 'search-box-demo',
  components: {
    SearchBox
  },
  methods: {
    onSearch (event) {
      console.log(event);
    },
    typeaheadFunction (searchTerm) {
      console.log('not default: ' + searchTerm);
      // this.selectableOptions = ['water', 'h2o'];
    }
  }
};
</script>

<style scoped>
</style>
