// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Vuelidate from 'vuelidate';
import FastClick from 'fastclick';
import { Picker } from 'mint-ui';

import '../static/flexible.min';

import 'normalize.css';
import './style/base/layout.scss'

Vue.component(Picker.name, Picker);
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}
Vue.use(Vuelidate);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
