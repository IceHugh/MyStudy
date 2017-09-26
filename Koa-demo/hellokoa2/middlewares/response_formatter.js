const response_formatter = (ctx) => {
  if (ctx.body) {
    ctx.body = {
      code: 0,
      message: 'success',
      data: ctx.body
    }
  } else {
    ctx.body = {
      code: 0,
      message: 'success',
    }
  }
}

const url_filter = (pattern) => {
  return async (ctx, next) => {
    let reg = new RegExp(pattern);
    await next();
    console.log(ctx.originalUrl)
    if (reg.test(ctx.originalUrl)) {
      response_formatter(ctx);
    }
  }
}
module.exports = url_filter;