const vFilter = {
  dateFilter: function(value) {
    // 截取当前数据到小数点后两位
    let realVal = Number(value).toFixed(2)
    return realVal
  }
}

export default vFilter
