var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.get('/serch', async ctx => {
 
//  console.log(ctx.request.query)
 //查询
 const str = `SELECT *
 FROM user
 where ${ctx.request.query.select} = '${ctx.request.query.serch}'
 `
var res = await sql.query(str)

 //json 化结果

 var Result = JSON.parse(JSON.stringify(res))

 ctx.body = Result
 
})

module.exports = router
