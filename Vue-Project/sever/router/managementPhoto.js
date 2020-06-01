var Router = require('koa-router')
const upload = require('../methods/upload.js')
const Time = require('../methods/time.js')
const sql = require('../db/user.js')
var config = require('../config/DBConfig.js') //引入配置文件
var router = new Router()
// console.log(upload)
router.post('/managementPhoto', upload.array('avatar', 5), async ctx => {
  ctx.body = 1
  //  console.log(ctx.request.query)

  //查询班级管理员班级id
  var str = `
  SELECT classId
  from classmanagement
  where username = '${ctx.request.query.userId}'`

  var res = await sql.query(str)
  //json 化结果
  var classId = JSON.parse(JSON.stringify(res))
  //把值取出来重新赋值
  classId = classId[0].classId

  //存入数据库

  var photoNum = ctx.req.files.length
  var time = Time.getTime()

  console.log([classId, time, img])

  
  for (var i = 0; i < photoNum; i++) {
    var img = `'http://${config.host}:3000/LeaveMessageImg/${ctx.req.files[i].filename}'`
    sql.insertData(
      [classId, time, img],   
      ['classId', 'time', 'img'],
      'classphoto'
    )
  }
})

module.exports = router
