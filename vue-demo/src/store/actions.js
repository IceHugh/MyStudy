import Api from '@/api';


import Router from 'vue-router';

const router = new Router();
export default {
  async login({
    commit
  }, data) {
    let res = await Api.getToken(data.userMsg);
    let loginInfo = {
      username: data.userMsg.username,
      token: res.data.id_token
    }
    commit('login', loginInfo);
    router.push('/');
  },
  async getOrder({commit,state}) {
    let res = await Api.getOrder({login: state.username});
    commit('setOrderInfo',res.data);
  }
}
