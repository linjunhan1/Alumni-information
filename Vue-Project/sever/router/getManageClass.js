var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.get('/getManageClass', async ctx => {
 
 
 //查询
 const str = `SELECT *
 FROM classmanagement
 `
var res = await sql.query(str)

 //json 化结果

 var Result = JSON.parse(JSON.stringify(res))

 ctx.body = Result
})

module.exports = router
