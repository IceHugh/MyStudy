const Koa = require('koa');
const app = new Koa();

app.use(async function (ctx) {
  let url = ctx.url;
  let request = ctx.request;
  let req_query = request.query;
  let req_queryString = request.querystring;

  let ctx_query = ctx.query;
  let ctx_queryString = ctx.querystring;

  ctx.body = {
    url,
    req_query,
    req_queryString,
    ctx_query,
    ctx_queryString,
  }
});

app.listen(3000, () => {
  console.log('[demo] request get is starting at port 3000');
})
