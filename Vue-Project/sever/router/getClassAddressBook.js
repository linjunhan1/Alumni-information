var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.get('/getClassAddressBook', async ctx => {
 
  console.log(ctx.request.query)
  const classId = ctx.request.query.classId
  //查询
  const str = `SELECT *
  FROM classaddressbook
  WHERE classId = ${classId}`
 var res = await sql.query(str)

  //json 化结果

  var Result = JSON.parse(JSON.stringify(res))
 console.log()
  ctx.body = Result


 
 
})

module.exports = router
