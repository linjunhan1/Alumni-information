var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.post('/xgbj', async ctx => {
  console.log(ctx.request.query)

  //修改
  const str = `
  UPDATE bj SET bjms='${ctx.request.query.bjms}'
where nj = ${ctx.request.query.nj} and bj = '${ctx.request.query.bj}'
  `
  sql.query(str)
  ctx.body = 1111111
})

module.exports = router
