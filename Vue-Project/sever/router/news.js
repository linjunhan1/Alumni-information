var Router = require('koa-router')

var router = new Router()
const Mysql = require('../lib/Mysql')

router.get('/news', async (ctx, next) => {
  ctx.status = 200
  let data = await Mysql.query()
  // console.log('wwwwwww' + newsMysql.query())
  ctx.body = {
    pagenum: 10,
    total: 50,
    status: 200,
    news: data
  }
  // console.log(ctx.request.body)
})

module.exports = router
