var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var str = bin.toString('utf-8'); //二进制转换为字符串
var bin2 = new Buffer('hello','utf-8');
console.log(bin2);
console.log(bin);
console.log(str);
var sub = bin.slice(2);
sub[0] = 0x65;
console.log(sub[0]);
console.log(bin);
var dup = new Buffer(bin2.length);
bin2.copy(dup);
console.log(dup);