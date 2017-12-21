import Vue from 'vue';
import Router from 'vue-router';
// import searchbox from '@/components/searchbox';
import ExtendedInputDemo from '@/views/ExtendedInputDemo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'extended-input-demo',
      component: ExtendedInputDemo
    } // ,
    // {
    //   path: '/searchbox',
    //   name: 'searchbox',
    //   component: searchbox
    // }
  ]
});
