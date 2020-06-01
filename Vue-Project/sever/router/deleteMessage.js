var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.get('/deleteMessage', async ctx => {
  console.log(ctx.request.query)

  const classId = ctx.request.query.classId
  var id = ctx.request.query.id
  console.log(classId)
  console.log(id)

  //删除
  var str = `
  DELETE FROM classmessageboard WHERE classId = ${classId} and id in (${id})
    `
  sql.detectionQuery(str)

  ctx.body = 1
})

module.exports = router
