const fs = require('fs');
const cache = {};

function inconsistentRead(filename, callback) {
	if (cache[filename]) {
		console.log('cache');
		process.nextTick(() => callback(cache[filename]));
	} else {
		fs.readFile(filename, 'utf-8', (err, data) => {
			cache[filename] = data;
			callback(data);
		});
	}
}

function createFileReader(filename) {
	const listeners = [];
	inconsistentRead(filename, value => {
		listeners.forEach(listener => listener(value));
	});
	return {
		onDataReady: listener => listeners.push(listener)
	};
}

const reader1 = createFileReader('test.txt');
reader1.onDataReady(data => {
	console.log('First call data: ' + data);
	const reader2 = createFileReader('test.txt');
	reader2.onDataReady(data => {
		console.log('Second call data: ' + data);
	});
});
