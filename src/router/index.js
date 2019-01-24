import Vue from 'vue';
import Router from 'vue-router';
import ExtendedInputDemo from '@/views/ExtendedInputDemo';
import SearchBoxDemo from '@/views/SearchBoxDemo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'extended-input-demo',
      component: ExtendedInputDemo
    },
    {
      path: '/searchbox',
      name: 'searchbox',
      component: SearchBoxDemo
    }
  ]
});
