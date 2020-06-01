var Router = require('koa-router')
const User = require('../db/user') //引入数据库操作方法类

var router = new Router()

router.post('/workerRegister', async ctx => {
  // console.log(ctx.request.body)
  const req = ctx.request.body //提交的信息

  // 验证身份
  const strDentity = `
select workerId
from workers
where workerId = ${req.workerId} and workerName = ${req.workerName}
`
  if ((await User.detectionQuery(strDentity)) == 0) {
    ctx.body = 3 // 查无此人则返回3
  } else {
    // 检测是否已经注册
    const str = `
  select workerId
  from workeruser
  where workerId = ${req.workerId}
  `
    if ((await User.detectionQuery(str)) == 1) {
      // 如果存在返回2 提示存在此账号
      ctx.body = 2
    }

    //注册
    const registeredStr = `
    INSERT INTO user ( username, password ,identity,role)
                       VALUES
                       ( ${req.workerId}, ${req.workerName} ,'worker','ordinary');
    `
    ctx.body = await User.registered(registeredStr)
  }
})

module.exports = router
