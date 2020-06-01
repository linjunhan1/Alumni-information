var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.get('/xsjl', async ctx => {
  //   const bj = ctx.request.query
  var str = `
  select nj as value ,nj as label
  from bj
  GROUP BY value
  `
  var res = await sql.query(str)
  //json 化结果
  var nj = JSON.parse(JSON.stringify(res))
  console.log(nj)

  var resbjj = []
  for (var i = 0; i < nj.length; i++) {
    var strbj = `
  select bj as value ,bj as label
  from bj
  where nj = ${nj[i].value}
  `
    var resbj = await sql.query(strbj)

    var bj = JSON.parse(JSON.stringify(resbj))
    resbjj.push(bj)
  }
  console.log(resbjj)

  var jgg = []
  for (var j = 0; j < nj.length; j++) {
    var jg = {
      value: nj[j].value,
      label: nj[j].label + '级',
      children: resbjj[j]
    }
    jgg.push(jg)
  }

  console.log(jgg)
  ctx.body = jgg
})

module.exports = router
