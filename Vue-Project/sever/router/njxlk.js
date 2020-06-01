var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.get('/njxlk', async ctx => {
  const str = `
  select nj
  from nj
  order by nj desc
  `
  var temp =await sql.query(str)
  var res = JSON.parse(JSON.stringify(temp))
  console.log(res)
  ctx.body = res
})

module.exports = router
