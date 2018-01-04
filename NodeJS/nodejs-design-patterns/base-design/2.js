// 如果ready事件是异步发布的，那么上述代码将会正常运行，然而，由于事件是同步发布的，并且监听器在发送事件之后才被注册，所以结果不调用监听器，该代码将无法打印到控制台。

const EventEmitter = require('events').EventEmitter;
class SyncEmit extends EventEmitter {
	constructor() {
		super();
		setTimeout(() => this.emit('async'), 100);
		this.emit('read');
	}
}
const syncEmit = new SyncEmit();
syncEmit.on('read', () => console.log('Object is ready to be used'));
syncEmit.on('async', () => console.log('Object is ready to be used for async'));
