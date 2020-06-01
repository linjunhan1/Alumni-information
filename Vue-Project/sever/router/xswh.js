var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.get('/xswh', async ctx => {
  var str = `
      SELECT *
      from xs 
      order by studentid 
      `

  var res = await sql.query(str)
  //json 化结果
  var xs = JSON.parse(JSON.stringify(res))

  ctx.body = xs
})

module.exports = router
