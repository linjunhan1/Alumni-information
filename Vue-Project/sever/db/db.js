const mysqlConnection = require('mysql')
var config = require('../config/DBConfig.js') //引入配置文件

//配置文件
const connectionConfig = {
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
}

// 创建连接
var connection = mysqlConnection.createConnection(connectionConfig)

connection.connect(error => {
  if (error) {
    console.log('[数据库连接失败错误信息：] - ', error)
  }
  console.log('数据库连接成功')
})

module.exports = connection
