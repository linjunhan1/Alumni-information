import echarts from 'echarts'
const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          // 画一条简单的线    画简介的折线图
          line1: function(id,arr) {
            this.chart = echarts.init(document.getElementById(id))
            this.chart.clear()

            

            const optionData = {
              title: {
                text: '访问量'
              },
              xAxis: {
                type: 'category',
                data: [
                  '一月',
                  '二月',
                  '三月',
                  '四月',
                  '五月',
                  '六月',
                  '七月',
                  '八月',
                  '九月',
                  '十月',
                  '十一月',
                  '十二月'
                ]
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: arr,
                  type: 'line',
                  smooth: true
                }
              ]
            }

            this.chart.setOption(optionData)
          }
        }
      }
    }
  })
}

export default {
  install
}
