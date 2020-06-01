var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.post('/scxs', async ctx => {
  console.log(ctx.request.query)

  //删除
  const str = `
  DELETE FROM xs WHERE studentid = '${ctx.request.query.studentid}'
  `
  sql.query(str)
  ctx.body = '删除成功'
})

module.exports = router
