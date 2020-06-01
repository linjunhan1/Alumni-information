var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.post('/modifyManageClass', async ctx => {
  console.log(ctx.request.query)
  const role = ctx.request.query.role
  const username = ctx.request.query.username

  //修改
  const str = `
 UPDATE user SET role='${role}'
WHERE username = '${username}'
 `
  sql.query(str)
  ctx.body = 'ok'
})

module.exports = router
