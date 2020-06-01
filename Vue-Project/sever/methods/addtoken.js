const jwt = require('jsonwebtoken')
const serect = 'token' //密钥，不能丢
module.exports = userinfo => {
  //创建token并导出
  const token = jwt.sign(
    {
      userId: userinfo.userId,
      password: userinfo.password
    },
    serect,
    { expiresIn: '1h' }
  )
  return token
}
