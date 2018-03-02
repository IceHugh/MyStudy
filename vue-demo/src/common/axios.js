/**
 * @author IceHugh
 * @email 14835187@qq.com
 * @create date 2017-09-14 05:23:42
 * @modify date 2017-09-14 05:23:42
 * @desc [description]
 */

import axios from 'axios';
import qs from 'qs';
import Router from 'vue-router';
import store from '../store';
import {
  Indicator,
  Toast
} from 'mint-ui';
const router = new Router();


const Axios = axios.create({
  baseURL: "https://devops-support-incu.daimler.com.cn:7999/api",
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'content-type': 'application/json'
  }
});

Axios.interceptors.request.use(
  config => {
    let {
      method
    } = config;
    if (store.state.token) {
      config.headers.Authorization = 'Bearer ' + store.state.token;
    }
    Indicator.open();
    return config;
  },
  error => {
    Toast({
      message: 'request error',
      duration: 2000
    });
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  res => {
    let requestUrl = res.request.responseURL.match(/(\/{1}\w+\/\w+)+/)[0];
    console.log('————————————接口：' + requestUrl + '，正确返回————————————')
    console.log(res)
    Indicator.close();
    return res;
  },
  error => {
    Indicator.close();
    let errRes = error.response;
    let {
      status,
      data,
      request
    } = errRes;
    // if (status == 404) return;
    let requestUrl = request.responseURL.match(/(\/{1}\w+\/\w+)+/)[0];
    let errorInfo = {
      requestUrl,
      message: '系统异常',
      status,
    }
    console.log('————————————接口：' + requestUrl + '，请求错误————————————');
    console.dir(error);
    console.table([errorInfo]);
    Toast({
      message: '系统异常' + errorInfo.message,
      duration: 2000
    });
    switch (parseInt(status)) {
      case 401:
        store.commit('logout')
        router.push('login');
        break;
      case 500:
        break;
      case 400:
        break;
      case 404:
        break;
      default:
        break;
    }
    return Promise.reject(error)
  }
);

export default Axios;
