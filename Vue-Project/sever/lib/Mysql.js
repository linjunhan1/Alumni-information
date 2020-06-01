// 新闻列表
var mysql = require('mysql')
var config = require('../config/DBConfig.js')

// console.log(connection)

class Mysql {
  async query() {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection({
        // 创建连接
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
      })
      connection.connect(error => {
        if (error) {
          console.log('[数据库连接失败错误信息：] - ', error)
        }
        console.log('数据库连接成功')
      }) // 连接
      var sql = 'SELECT * FROM news' // 查询语句

      connection.query(sql, function(err, result) {
        if (err) {
          console.log('[操作数据库失败] - ', err.message)
          reject(err)
        }
        console.log('操作数据库查询成功')
        resolve(result)
        // console.log(result)
      })
    })
  }

  //查询
  async mysqlQuery(sql, name, str) {
    return new Promise((resolve, reject) => {
      //连数据库
      var connection = mysql.createConnection({
        // 创建连接
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
      })
      connection.connect(error => {
        if (error) {
          console.log('[数据库连接失败错误信息：] - ', error)
        }
        console.log('数据库连接成功')
      }) // 连接

      // var sql = 'SELECT * FROM news' // 查询语句

      connection.query(sql, function(err, result) {
        if (err) {
          console.log('[操作数据库失败] - ', err.message)
        }
        console.log('操作数据库查询成功')
        // console.log( typeof(result))

        var b = ''
        if (result == '') {
          console.log('此学号不存在')
          resolve(3)
        } else {
          // //判断是否已经注册
          // var existSql = `
          // SELECT * 
          // FROM studentuser
          // where studentId = 201606120001
          // `
          // connection.query(existSql, function(err, resulta) {
          //   if (err) {
          //     console.log('[操作数据库失败--注册存在查询] - ', err.message)
          //   }
          //   console.log('操作数据库查询成功--注册存在查询')
          //   if (result != '') {
          //     resolve(4) //已经注册过返回4
          //     console.log(result)




          //   }
          //   // console.log( typeof(result))
          // })

          //判断传过来的姓名是否正确
          result = JSON.stringify(result) //把results对象转为字符串，去掉RowDataPacket

          result = JSON.parse(result) //把results字符串转为json对象
          console.log(result[0].studentName)

          // 若学号判断传过来的姓名正确
          if (result[0].studentName == name) {
            console.log('姓名正确')
            //连接数据库并插入数据
            let inserSql = str
            //  `
            // INSERT INTO studentuser ( studentId, studentPassword )
            //            VALUES
            //            ( 201606120001, 123456 );
            // `
            connection.query(inserSql, (error, result) => {
              if (err) {
                console.log('[数据库插入] - ', error.message)
              }
              console.log('操作数据库插入成功')
              resolve(5)
            })
            return
          }
          console.log('学号姓名不匹配')
          resolve(2) //学号姓名不匹配返回2
        }
      })
    })
  }
}

module.exports = new Mysql()
