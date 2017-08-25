const koa = require('koa');
const fs = require('fs');
const app = new koa();

/**
 * 用Promise 封装异步读取文件
 * @param {string} page 
 * @return {promise}
 */
function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`;
    fs.readFile(viewUrl, 'binary', (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log(data);
        resolve(data);
      }
    })
  });
}
async function route(url) {
  let view = '404.html';
  switch (url) {
    case '/':
      view = 'index.html';
      break;
    case '/index':
      view = 'index.html';
      break;
    case '/404':
      view = '404.html';
      break;
    case '/todo':
      view = 'todo.html';
      break;
    default:
      break;
  }
  let html = await render(view);
  
  return html;
}

app.use(async (ctx) => {
  let url = ctx.request.url;
  let html = await route(url);
  ctx.body = html;
});

app.listen(3000);

