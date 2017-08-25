const Koa = require('koa');
const path = require('path');
const convert = require('koa-convert');
const views = require('koa-views');
const static = require('koa-static');

const { uploadFile } = require('./util/upload');

const app = new Koa();

app.use(views(path.join(__dirname, './view'),{
  extension: 'ejs'
}));

const staticPath = './static';

app.use(convert(static(path.join(__dirname, staticPath))));
console.log(__dirname);

app.use( async (ctx) => {
  if (ctx.method === 'GET' && ctx.url === '/') {
    let title = 'upload pic async';
    await ctx.render('index', {
      title,
    })
  } else if (ctx.url === '/api/picture/upload.json' && ctx.method === 'POST') {
    let result = { success: false };
    let serverFilePath = path.join(__dirname, 'static/image');
    result = await uploadFile(ctx, {
      fileType: 'album',
      path: serverFilePath,
    });
    ctx.body = result;
  } else {
    ctx.body = '404';
  }
});
app.listen(3001);