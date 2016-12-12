var fs = require('fs');
function copy (src,dst) {
    fs.writeFileSync(dst,fs.readFileSync(src));
}
function main (argv) {
    copy(argv[0],argv[1]);
}
main(process.argv.slice(2)); //截取命令行参数后两项

//输入node copy-small-file.js hello/main.js hello/main2.js
//process.argv 获取命令行参数