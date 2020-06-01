const mysql = require('./db')

class Userdb {
  test() {
    console.log(mysql)
  }

  // 查询
  query(str = '') {
    return new Promise((resolve, reject) => {
      mysql.query(str, (err, result) => {
        if (err) {
          console.log('[操作数据库失败] - ', err.message)
          reject(err)
        }
        console.log('操作数据库成功')
        resolve(result)
      })
    })
  }
  // 检测是否存在
  detectionQuery(str) {
    return new Promise((resolve, reject) => {
      mysql.query(str, (err, result) => {
        if (err) {
          console.log('[操作数据库失败] - ', err.message)
          reject(err)
        }
        console.log('操作数据库查询成功')
        
        const len = result.length
        if (len >= 1) {
          // 存在
          resolve(1) //存在返回1
          console.log('存在')
        } else {
          // 不存在
          resolve(0) //不存在返回0
          console.log('不存在')
        }
      })
    })
  }

  //注册
  registered(str) {
    return new Promise((resolve, reject) => {
      mysql.query(str, (err, result) => {
        if (err) {
          console.log('[插入数据库失败] - ', err.message)
          reject(err)
        }
        console.log('插入数据库查询成功')
        resolve(4) //插入成功返回
      })
    })
  }

  //插入数据  arr表值数组， arra 表明数组 ，table表
  insertData(arr, arra, table) {
    //表值
    var arrstr = ''
    for (var i = 0; i < arr.length; i++) {
      arrstr += arr[i] + ','
    }
    if (arrstr.length > 0) {
      arrstr = arrstr.substr(0, arrstr.length - 1)
    }
    console.log(arrstr)

    //表名
    console.log(arra)
    var arrstra = ''
    for (var j = 0; j < arra.length; j++) {
      arrstra += arra[j] + ','
      
    }
    if (arrstra.length > 0) {
      arrstra = arrstra.substr(0, arrstra.length - 1)
    }
    // console.log(arrstra)
  

    let str = `
    INSERT INTO ${table} ( ${arrstra} )
                       VALUES
                       ( ${arrstr} );
    `
    // let str = `
    // INSERT INTO post ( text, time,img )
    //                    VALUES
    //                    ( 123, 20160612,123456 );
    // `
    return new Promise((resolve, reject) => {
      mysql.query(str, (err, result) => {
        if (err) {
          console.log('[操作数据库失败] - ', err.message)
          reject(err)
        }
        console.log('操作数据库成功')
        resolve(result)
      })
    })
  }
}
module.exports = new Userdb()
