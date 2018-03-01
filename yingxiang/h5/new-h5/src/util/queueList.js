export default class QueueList {
  constructor(length = 10){
    this.queue = [];
    this.maxLength = length;
    this.length = 0;
  }
  add(item) {
    const len = this.queue.length;
    if(len < this.maxLength) {
      this.queue.push(item);
    } else {
      this.queue.shift();
      this.queue.push(item);
    }
    this.length = this.queue.length;
  }
  getLast() {
    return this.queue[this.length - 2];
  }
}