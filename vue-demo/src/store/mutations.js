
import util from '../common/util';

export default {
  login: (state, payload) => {
    let {
      token,
      username
    } = payload;
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('username', username);
    state.token = token;
    state.username = username;
  },
  logout: (state) => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
    state.token = null
    state.username = null;
  },
  setOrderInfo: (state, payload) => {
    state.orderInfo = payload;
    state.orderId = payload.id;
    let orderTimeLocation = {
      pickTime: util.getOrderTimeforMM(payload.expectedPickTime),
      pickLocation: payload.expectedPickLocation,
      returnTime: util.getOrderTimeforMM(payload.expectedPickTime),
      returnLocation: payload.expectedReturnLocation,
    }
    console.log('order status: ' + payload.status)
    util.setStateNoEqual(state, payload.user, 'user');
    util.setStateNoEqual(state, payload.status, 'status');
    util.setStateNoEqual(state, payload.payment, 'payment');
    util.setStateNoEqual(state, orderTimeLocation, 'orderTimeLocation');
  },
  resetOrder: (state) => {
    state.orderId = null;
    state.orderInfo = null;
    state.user = null;
    state.payment = null;
    state.status = null;
  }
}
