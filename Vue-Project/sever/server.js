const Koa = require('koa')
const router = require('./router/router')
const bodyParser = require('koa-bodyparser')
var cors = require('koa2-cors')
const path = require('path')
const serve = require('koa-static')
// 配置静态资源

var app = new Koa()
app.use(cors()) // 允许跨域
app.use(bodyParser())
app.use(router.routes())

/**静态资源（服务端） */
app.use(serve(__dirname + '/public'))

app.use(async (ctx, next) => {
  console.log(ctx.body)
})

app.listen(3000, () => {
  console.log('项目启动http://localhost:3000')
})
