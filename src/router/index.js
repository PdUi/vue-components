import Vue from 'vue';
import Router from 'vue-router';
import searchbox from '@/components/searchbox';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'searchbox',
      component: searchbox
    }
  ]
});
