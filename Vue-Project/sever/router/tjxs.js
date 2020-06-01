var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.post('/tjxs', async ctx => {
  const xs = ctx.request.query
  const bj = ctx.request.query['bj[]']
  //   console.log(ctx.request.query['xx'])
  //   console.log(ctx.request.query['bj[]'])

  const xx = JSON.parse(ctx.request.query['xx'])
  console.log(xx)
  console.log(bj)
  //操作数据库
  //检测是否存在
  var str = `
  select *
  from xs
  where studentid = '${xx.studentid}' 
  `
  var sfcz = await sql.detectionQuery(str)

  //   //存在
  if (sfcz) {
    ctx.body = '存在'
    return
  }

  //不存在，存入
  //存入
  var name = `'${xx.name}'`
  var wechat = `'${xx.wechat}'`
  var phoneNum = `'${xx.phoneNum}'`
  var email = `'${xx.email}'`
  var livingCity = `'${xx.livingCity}'`
  var nowPosition = `'${xx.nowPosition}'`
  var graduationToWhere = `'${xx.graduationToWhere}'`
  var threeYearsAfterGraduation = `'${xx.wechat}'`
  var nj = bj[0]
  var bja = `'${bj[1]}'`
  var studentid = `'${xx.studentid}'`
  // var

//   console.log(
//     name,
//     wechat,
//     phoneNum,
//     email,
//     livingCity,
//     nowPosition,
//     graduationToWhere,
//     threeYearsAfterGraduation,
//     classId,
//     userId
//   )
  sql.insertData(
    [
      name,
      wechat,
      phoneNum,
      email,
      livingCity,
      nowPosition,
      graduationToWhere,
      threeYearsAfterGraduation,
      nj,
      bja,
      studentid
    ],
    [
      'name',
      'wechat',
      'phoneNum',
      'email',
      'livingCity',
      'nowPosition',
      'graduationToWhere',
      'threeYearsAfterGraduation',
      'nj',
      'bj',
      'studentid'
    ],
    'xs'
  )

  ctx.body = '成功存入'
})

module.exports = router
