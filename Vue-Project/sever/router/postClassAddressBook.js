var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.post('/postClassAddressBook', async ctx => {
  ctx.body = 1
  console.log(ctx.request.query)
  const data = ctx.request.query

  //存入
  var name = `'${data.name}'`
  var wechat = `'${data.wechat}'`
  var phoneNum = `'${data.phoneNum}'`
  var email = `'${data.email}'`
  var livingCity = `'${data.livingCity}'`
  var nowPosition = `'${data.nowPosition}'`
  var graduationToWhere = `'${data.graduationToWhere}'`
  var threeYearsAfterGraduation = `'${data.wechat}'`
  var classId = data.classId
  var userId = data.userId


 
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
      classId,
      userId
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
      'classId',
      'userId'
    ],
    'classaddressbook'
  )
})

module.exports = router
