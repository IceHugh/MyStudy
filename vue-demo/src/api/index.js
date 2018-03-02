import Axios from '../common/axios';
import store from '../store';
const Api = {
  getToken(data) {
    return Axios.post('/authenticate',data)
  },
  getOrder(data) {
    return Axios.get('/butler-orders/butlerUnfinished',{params: data})
  },
  putStatus(data) {
    return Axios.put(`/butler-orders/${store.state.orderId}/status`,data)
  },
  putChargeLocation(data) {
    return Axios.put(`/butler-orders/${store.state.orderId}/changingStation`,data)
  },
  putStartElectric(data) {
    return Axios.put(`/butler-orders/${store.state.orderId}/electricityRemaining`,data)
  },
  putFinsihedElectric(data) {
    return Axios.put(`/butler-orders/${store.state.orderId}/electricityFinished`,data)
  },
  putBill(type,data){
    return Axios.put(`/butler-orders/${store.state.orderId}/${type}`,data)
  },
  uploadImg(type, data) {
    return Axios.post(`/upload/${type}`,data)
  }
}
export default Api;
