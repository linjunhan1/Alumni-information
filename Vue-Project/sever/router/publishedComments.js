var Router = require('koa-router')
const upload = require('../methods/upload.js')
const Time = require('../methods/time.js')
const insert = require('../db/user.js')
var config = require('../config/DBConfig.js') //引入配置文件
var router = new Router()
// console.log(upload)
router.post('/publishedComments', upload.array('avatar', 5), async ctx => {
  //   console.log(ctx.req.files[0].filename)
    console.log(ctx.request.query.text)
  ctx.body = {
    msg: '成功留言'
  } //返回数据

  //存入数据库
  var text = `'${ctx.request.query.text}'`
  var time = Time.getTime()
  var img = `'http://${config.host}:3000/LeaveMessageImg/${ctx.req.files[0].filename}'`
    console.log([text,time,img])

  insert.insertData([text, time, img], ['text', 'time', 'img'],'post')
})

module.exports = router
