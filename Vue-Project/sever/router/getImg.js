var Router = require('koa-router')

var router = new Router()

router.get('/getImg', async ctx => {
  ctx.body = {
    ImgUrl: [
      'http://oa.gzcc.cn/uploadfile/2018/0413/20180413105846639.jpg',
      'http://oa.gzcc.cn/uploadfile/2018/0413/20180413105839459.jpg',
      'http://oa.gzcc.cn/uploadfile/2018/0413/20180413105819753.jpg'
    ]
  }
})

module.exports = router
