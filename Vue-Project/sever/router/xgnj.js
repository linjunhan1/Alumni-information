var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.post('/xgnj', async ctx => {
  
  console.log(ctx.request.query)

  //修改
  const str = `
  UPDATE nj SET ms='${ctx.request.query.ms}'
where nj = ${ctx.request.query.nj}
  `
  sql.query(str)
  ctx.body = 1111111
})

module.exports = router
