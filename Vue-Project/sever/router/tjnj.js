var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.post('/tjnj', async ctx => {
  const nj = ctx.request.query

  //操作数据库
  //检测是否存在
  var str = `
  select *
  from nj
  where nj = ${nj.nj}
  `
  var sfcz = await sql.detectionQuery(str)
  console.log(sfcz)

  //存在
  if (sfcz) {
    
    ctx.body = '存在'
    return
  }

  //不存在，存入年级
  var nja = nj.nj
  var ms = `'${nj.ms}'`
  sql.insertData([nja, ms], ['nj', 'ms'], 'nj')
  ctx.body = '成功存入'
})

module.exports = router
