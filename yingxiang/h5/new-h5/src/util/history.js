import { cloneDeep, isEqual } from 'lodash';
import Queue from './queueList';
const queue = new Queue();
// const defaultData = {
//   imageIdToolState: {}, 
//   elementToolState: {}, 
//   elementViewport: {},
// }
export default class History {
  constructor(activeId = '',initStep = {}, length = 10) {
    this.activeId = activeId;
    this.maxLength = length;
    this.history = [];
    this.status = '';
    this.prevStep = initStep;
    this.stepNum = -1;
    this.nextStatus = false;
  }
  active(imageId) {
    this.activeId = imageId;
  }
  setStatus(status) {
    if(['prev', 'next', 'add'].indexOf(status) < 0) {
      console.log('设定的操作为上一步（prev）或者下一步（next）或者添加（add）');
      return;
    }
    // 当前操作是 添加 并且 有对历史记录有操作 则把当前历史记录截取
    // if (status === 'add' && this.stepNum !== undefined) {
    //   this.history = this.history.slice(0, this.stepNum);
    // }
    this.status = status;
  }
  add(state) {
    if (this.activeId === '') {
      console.log('请先激活imageId');
      return;
    }
    // 如果存在 操作状态 并且 属于上一步或者下一步的操作 不存储当前数据
    if (!!this.status && this.status === 'prev' || this.status === 'next') return;
    const cloneState = cloneDeep(state);
    // queue.add(cloneState);
    const diffStatus = this.diff(cloneState);
    if (diffStatus) {
      this.prevStep = cloneState;
      this.history.push(cloneState);
      this.stepNum = this.history.length - 1;
    } else {
      // if (!isEqual(cloneState, this.prevStep)) {
        if (this.history.length === 0) return;
        console.log(123);
        this.history[this.history.length - 1] = cloneState;
      // }
    }
  }
  prev(){
    this.setStatus('prev');
    console.log(`历史记录长度：${this.getLength()}`);
    const length = this.getLength();
    
    if (length === 0) {
      console.log('还没有任何操作');
      return 0; // 没有历史操作 
    }
    this.stepNum -= 1;
    console.log(`操作步数：${this.stepNum}`);
    if (length === 1) {
      console.log('历史记录只有一条');
      return 1; // 只有一条记录
    }
    if (this.stepNum < 0) {
      console.log('历史记录的第一步');
      this.stepNum = -1
      return 1; // 上一步操作到达第一步
    }
    const step = cloneDeep(this.history[this.stepNum]);
    console.log(step)
    return step;
  }
  next(){
    this.setStatus('next');
    console.log(`历史记录长度：${this.getLength()}`);
    
    const length = this.getLength();
    if (length === 0) {
      console.log('没有历史记录');
      return 0;
    }
    this.stepNum += 1;
    console.log(`操作步数：${this.stepNum}`);
    if (this.stepNum > this.getLength() - 1) {
      console.log('历史记录的最后一步');
      this.stepNum = this.getLength() - 1;
      return 0;
    }
    const step = cloneDeep(this.history[this.stepNum]);
    console.log(step)
    return step;
  }
  get() {
    return this.history;
  }
  getLength() {
    return this.history.length;
  }
  diff(curr) {
    const activeId = this.activeId;
    if (!curr.imageIdToolState[activeId]) return false;
    if (!this.prevStep.imageIdToolState) return true;
    if (!this.prevStep.imageIdToolState[activeId]) return true;
    const prevData = this.prevStep.imageIdToolState[activeId];
    const currData = curr.imageIdToolState[activeId];

    const prevKeys = Object.keys(prevData);
    const currKeys = Object.keys(currData);
    if (currKeys.length === 0 || prevKeys.length === 0) return false;
    if (currKeys.length === 0 || prevKeys.length === 0) return false;

    if (currKeys.length > prevKeys.length) {
      return true;
    } else if (currKeys.length === prevKeys.length) {
      const prevDataLength = prevKeys.reduce((l, c) => {
        return (l + prevData[c].data.length);
      }, 0);
      const currDataLength = currKeys.reduce((l, c) => {
        return (l + currData[c].data.length);
      }, 0);
      if (currDataLength > prevDataLength) {
        return true;
      } else {
        return false
      }
    } else {
      return false;
    }
  }
}