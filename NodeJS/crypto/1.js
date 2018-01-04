const crypto = require('crypto');
const md5 = crypto.createHash('md5');

const message = 'hello';
const digest = md5.update(message, 'utf-8').digest('hex');
console.log(digest);
