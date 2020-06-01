var Router = require('koa-router')
const User = require('../db/user') //引入数据库操作方法类
var router = new Router()

router.get('/getLeaveMessage', async ctx => {
  var request = ctx.request.query
  // console.log(request. minPage)

  var str = `select *
    from post
    limit ${request.minPage}, ${request.maxPage}`

  //查总数
  var totol = await User.query(`select *
    from post
    `)
  var totolLength = totol.length
  // console.log(totol.length)
  var res = await User.query(str)

  //json 化结果
 
 
  var pageResult = JSON.parse(JSON.stringify(res))

  
//   console.log(pageResult)


  ctx.body = {
    pageResult,
    totolLength
  }
    console.log(ctx.body)
})

module.exports = router
