import {
  isEqual
} from 'lodash';
export default {
  getOrderTimeforMM (time) {
    let nowTime = new Date(time).toString();
    return nowTime.substring(16, 21);
  },
  setStateNoEqual(o, n, key) {
    if (!isEqual(o[key], n)) {
      o[key] = n
    }
  },
  getRangeArr(start, end, reverse){
    let rangeArr =[];
    for (let i = start; i <= end; i++) {
      rangeArr.push(i);
    }
    if(reverse) {
      rangeArr = rangeArr.reverse();
    }
    return rangeArr
  },
  createHashName() {
    return Math.random().toString(16).substr(2);
  }
}
