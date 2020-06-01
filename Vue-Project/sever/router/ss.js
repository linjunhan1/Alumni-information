var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.post('/ss', async ctx => {
  const a = ctx.request.query
  //   console.log(a.data)

  var strs = []
  strs = a.data.split(',')
  //   console.log(strs)

  //   console.log(a['0[]'])
  // var arr = []

  //   var j = 0
  //   console.log(a[`'${j}[]'`])
  var xss = []
  for (var i = 0; i < strs.length / 2; i++) {
    var str = `
        SELECT *
        from xs
        where nj = ${strs[i * 2]} and bj = '${strs[i * 2 + 1]}'
             `
    var res = await sql.query(str)
    //json 化结果
    var xs = JSON.parse(JSON.stringify(res))
    xss.push(xs)
  }

//   console.log(xss[2])
  //   console.log(xss)

  //   console.log(xss)

  // order by studentid
  //   var res = await sql.query(str)
  //   //json 化结果
  //   var xs = JSON.parse(JSON.stringify(res))

  var len = xss.length
  var xsss = []
  for(var j=0;j<len;j++){
    // xsss.push(xss[j])
    xsss.push.apply(xsss,xss[j]);
  }
console.log(xsss)
  ctx.body = xsss
})

module.exports = router
