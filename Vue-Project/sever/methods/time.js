class Time {
  test() {
    console.log('test')
  }
  //获取20160102格式的日期
  getTime() {
    var date = new Date()
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? '0' + d : d
    return y + m + d
  }
}
module.exports = new Time()
