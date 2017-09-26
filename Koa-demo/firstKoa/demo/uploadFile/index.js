const Koa = require('koa');
const path = require('path');

const { uploadFile } = require('./uploadFile');

const app = new Koa();

app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    let html = `
      <h1>koa2 upload demo</h1>
      <form method="POST" action="/upload.json" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `;
    ctx.body = html;
  } else if (ctx.url === '/upload.json' && ctx.method === 'POST') {
    let result = { success: false};
    let serverFilePath = path.join(__dirname, 'upload-files');
    result = await uploadFile(ctx, {
      fileType: 'album',
      path: serverFilePath
    });
    ctx.body = result;
  } else {
    ctx.body = '404';
  }
});
app.listen(3001);