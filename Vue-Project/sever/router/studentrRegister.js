var Router = require('koa-router')
var Mysql = require('../lib/Mysql')

var router = new Router()
var b
router.post('/stduntRegister', async ctx => {
  ctx.body = ctx.request.body
  // console.log(ctx.request.body)
  var sql = `SELECT * FROM students
  where studentId = ${ctx.request.body.studentId}
  `
  var str = `
            INSERT INTO user ( username, password ,identity,role)
                       VALUES
                       ( ${ctx.request.body.studentId}, ${ctx.request.body.studentPassword},'student' ,'ordinary');
            `
  var a = Mysql.mysqlQuery(sql, ctx.request.body.studentName, str)

  // a.then(async(val) =>{
  //   console.log(val)
  //   // b = val
  //   // console.log(b)
  //   // b=  val
  //   // console.log(b)
  // })
  ctx.body = await a

  console.log(ctx.body)
})

module.exports = router
