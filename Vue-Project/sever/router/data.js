var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.get('/data', async ctx => {
  //本月月份
  var date = new Date()
  var month = date.getMonth()

  var monStr = `UPDATE data SET num = num+1
WHERE monMum = ${month}`
  sql.query(monStr)

  var str = `
    select num
    FROM data 
      `

  var resImg = await sql.query(str)
  //json 化结果
  var img = JSON.parse(JSON.stringify(resImg))

  //   console.log(img)
  var res = []
  img.forEach(function(item) {
    console.log(item.num)
    res.push(item.num)
  })
  console.log(res)
  ctx.body = res
})

module.exports = router
