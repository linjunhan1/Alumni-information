var Router = require('koa-router')
const upload = require('../methods/upload.js')
const Time = require('../methods/time.js')
const insert = require('../db/user.js')
var config = require('../config/DBConfig.js') //引入配置文件
var router = new Router()
// console.log(upload)
router.post('/postClassMessageBoard', upload.array('avatar', 5), async ctx => {
  // console.log(ctx.req.files[0].filename)
  // console.log(ctx.request.query)

  ctx.body = {
    msg: '成功留言'
  } //返回数据

  // //存入数据库
  var text = `'${ctx.request.query.text}'`
  var time = Time.getTime()
  var img = `'http://${config.host}:3000/LeaveMessageImg/${ctx.req.files[0].filename}'`
  var classId = ctx.request.query.classId
  var id = `'${new Date().valueOf()}${ctx.request.query.userId}'` //生成留言唯一id
  var userId = `${ctx.request.query.userId}`
  console.log([text, time, img, classId, id, userId])

    insert.insertData(
      [text, time, img, classId, id, userId],
      ['text', 'time', 'img', 'classId', 'id', 'userId'],
      'classmessageboard'
    )
})

module.exports = router
