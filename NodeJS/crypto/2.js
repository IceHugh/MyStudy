/* MAC--Message Authentication Code
   HMAC--Hash-based Message Authentication Code */
const crypto = require('crypto');

const hmac = crypto.createHmac('md5', '123456');
const ret = hmac.update('hello').digest('hex');
console.log(ret);

