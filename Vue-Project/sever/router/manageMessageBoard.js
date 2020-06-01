var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.get('/manageMessageBoard', async ctx => {
  const userId = ctx.request.query.userId
  // console.log(ctx.request.query.userId)

  //查找班级id
  var str = `
      SELECT classId
      from classmanagement
      where username = '${userId}'`
  //   console.log(str)
    // console.log(classId)
  var res = await sql.query(str)
  //json 化结果
  var classId = JSON.parse(JSON.stringify(res))
  //把值取出来重新赋值
  classId = classId[0].classId


  //查找图片地址
  var strClassPhoto = `
  SELECT *
  from classmessageboard
  where classId = ${classId}`
  var resImg = await sql.query(strClassPhoto)
  //json 化结果
  var img = JSON.parse(JSON.stringify(resImg))

    // console.log(img)

  ctx.body = img
})

module.exports = router
