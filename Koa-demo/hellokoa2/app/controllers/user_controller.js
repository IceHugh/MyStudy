exports.getUser = async (ctx, next) => {
  ctx.body = {
    username: 'ice',
    age: 27,
  }
}

exports.regiestUser = async (ctx, body) => {
  console.log('regiestUser: ' + ctx.request.body)
}