var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.post('/xgxs', async ctx => {
  console.log(ctx.request.query)

  const bj = ctx.request.query['bj[]']
  // console.log(bj)
  //   console.log(ctx.request.query['bj[]'])

  const xx = JSON.parse(ctx.request.query['xx'])
  //   console.log(xx)
  //   console.log(bj)

  var name = `${xx.name}`
  var wechat = `${xx.wechat}`
  var phoneNum = `${xx.phoneNum}`
  var email = `${xx.email}`
  var livingCity = `${xx.livingCity}`
  var nowPosition = `${xx.nowPosition}`
  var graduationToWhere = `${xx.graduationToWhere}`
  var threeYearsAfterGraduation = `${xx.wechat}`

  var studentid = `${xx.studentid}`

  const str = `
      UPDATE xs SET name='${name}',wechat='${wechat}',phoneNum='${phoneNum}',email='${email}',livingCity='${livingCity}',nowPosition='${nowPosition}',graduationToWhere='${graduationToWhere}',threeYearsAfterGraduation='${threeYearsAfterGraduation}',name='${name}',studentid='${studentid}'
    where studentid = '${studentid}'
   `
  console.log(str)
  sql.query(str)
  //   //   //   console.log(
  //   //   //     name,
  //   //   //     wechat,
  //   //   //     phoneNum,
  //   //   //     email,
  //   //   //     livingCity,
  //   //   //     nowPosition,
  //   //   //     graduationToWhere,
  //   //   //     threeYearsAfterGraduation,
  //   //   //     classId,
  //   //   //     userId
  //   //   //   )

  ctx.body = '修改成功'
})

module.exports = router
