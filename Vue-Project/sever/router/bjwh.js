var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.get('/bjwh', async ctx => {
  var str = `
      SELECT *
      from bj
      order by nj desc
      `

  var res = await sql.query(str)
  //json 化结果
  var bj = JSON.parse(JSON.stringify(res))

  ctx.body = bj
})

module.exports = router
