var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.post('/scbj', async ctx => {
  console.log(ctx.request.query)

  //删除
  const str = `
  DELETE FROM bj WHERE nj = ${ctx.request.query.nj} and bj = '${ctx.request.query.bj}'
  `
  sql.query(str)
  ctx.body = '删除成功'
})

module.exports = router
