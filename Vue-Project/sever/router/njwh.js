var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.get('/njwh', async ctx => {
  var str = `
      SELECT *
      from nj
      `

  var res = await sql.query(str)
  //json 化结果
  var nj = JSON.parse(JSON.stringify(res))

  ctx.body = nj
})

module.exports = router
