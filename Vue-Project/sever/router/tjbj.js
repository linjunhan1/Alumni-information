var Router = require('koa-router')
const sql = require('../db/user.js')
var router = new Router()

router.post('/tjbj', async ctx => {
  const bj = ctx.request.query

  //操作数据库
  //检测是否存在
  var str = `
  select *
  from bj
  where bj = '${bj.bj}' and  nj = ${bj.nj}
  `
  var sfcz = await sql.detectionQuery(str)
//   console.log(sfcz)

//   //存在
  if (sfcz) {
    ctx.body = '存在'
    return
  }

  //不存在，存入年级
  var bja = `'${bj.bj}'`
  var bjms = `'${bj.bjms}'`
  var nj = bj.nj
  sql.insertData([bja, bjms,nj], ['bj', 'bjms','nj'], 'bj')
  ctx.body = '成功存入'
})

module.exports = router
