import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import wechatAvatar from '../assets/images/head.png';
Vue.use(Vuex);
const defaultState = {
  username: null,
  token: null,
  orderId: null,
  user: {
    wechatAvatar,
  },
  chargingStation: '',
  status: '',
  payment: {},
  orderTimeLocation: {
    pickTime: '',
    pickLocation: '',
    returnTime: '',
    returnLocation: '',
  },
  orderInfo: {},
}

const store = new Vuex.Store({
  state: defaultState,
  mutations,
  actions,
  getters,
});
export default store;
