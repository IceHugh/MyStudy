const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(bodyParser());
app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `;
    ctx.body = html;
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let parseData = ctx.request.body;
    ctx.body = parseData;
  } else {
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
  }
});

app.listen(3000, () => {
  console.log('[demo] request post is starting at port 3000');
});