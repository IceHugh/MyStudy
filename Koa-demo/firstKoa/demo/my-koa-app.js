const Koa = require('koa') // koa v2
const convert = require('koa-convert')
const loggerGenerator1  = require('./middleware/logger-generator1')
const loggerGenerator2  = require('./middleware/logger-generator2')
const app = new Koa()

// app.use(convert(loggerGenerator2()))
// app.use(loggerGenerator2());
// app.use(( ctx ) => {
//   ctx.body = 'hello world!'
// })

app.use((ctx) => {
  let url = ctx.request.url;
  console.log(url);
  ctx.body = url;
});


app.listen(3000)
console.log('the server is starting at port 3000')