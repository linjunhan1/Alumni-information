var Router = require('koa-router')
const User = require('../db/user') //引入数据库操作方法类
const addtoken = require('../methods/addtoken')

var router = new Router()

router.post('/login', async ctx => {
  // ctx.body = 111
  //   console.log(ctx.request.body)

  const req = ctx.request.body //提交的信息

  // 验证身份
  const strDentity = `
select *
from user
where username = ${req.userId} and password = ${req.password}
`

  //json 化结果
  var res = await User.query(strDentity)
  console.log(res)
  var result = JSON.parse(JSON.stringify(res))
  console.log(result)
  if (result.length == 0) {
    ctx.body = {
      msg: '登录失败'
    }
    return
  }

  ctx.status = 200

  let token = addtoken({ userId: req.userId, password: req.password }) //token中要携带的信息，自己定义
  ctx.body = {
    msg: '正确',
    token, //返回给前端
    userId: req.userId,
    code: 1,
    role: result[0].role,
    classId: result[0].classId
  }
})

module.exports = router
