const fs = require('fs');
const path = require('path');

const dir = require('./dir');
const file = require('./file');
console.log(file)

async function content(ctx, fullStaticPath) {
  let reqPath = path.join(fullStaticPath, ctx.url);
  console.log(reqPath);
  let exist = fs.existsSync(reqPath);

  let content = '';
  if (!exist) {
    content = '404';
  } else {
    let stat = fs.statSync(reqPath);
    if (stat.isDirectory()) {
      content = dir(ctx.url, reqPath);
    } else {
      content = await file(reqPath);
    }
  }
  return content;
}
module.exports = content;