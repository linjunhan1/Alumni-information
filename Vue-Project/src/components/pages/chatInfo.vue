<template>
  <div class="wrapper">

    <ul class="list">
      <li v-for="item in text">
        <div class="list-main">
          <div id="img">
            <img :src="item.img" />
          </div>
          <div class="text">
            <p>{{item.text}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      text: [
        // {
        //   time: new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //   time: new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //   time: new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //   time: new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //   time: new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //   time: new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //   time: new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // }
      ],
      //请求计数 
      count:0
    }
  },
  watch: {},
  computed: {},
  methods: {
    getData() {
      console.log(this.count)
      this.count = 1
      // console.log('getdata is begin')
      axios
        .get('chatInfo')
        .then((response)=> {
          // console.log(response.data.text)
          this.text = response.data.text
          //  window.sessionStorage.setItem('chatInfo',response.data.text)
          //  window.sessionStorage.setItem('count',this.count)
        })
        .catch((error)=> {
          console.log(error)
        })
    }
  },
  created() {
    // window.sessionStorage.getItem('count',this.count)
    // console.log(this.count)
    if(this.count == 0){ this.getData();}
   
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}

/* 消息列表样式 */
li {
  padding: 10px;
  list-style-type: none;
  height: 100px;
  overflow: hidden;
  p {
    width: 200px;
    height: 40px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
.list img {
  width: 50px;
  height: 50px;
}

.list-main {
  display: flex;
  height: 200px;
}

#img {
  padding: 20px;
}
.text {
  height: 30px;
}
.list {
  li {
    border-bottom: 1px #909399 solid;
  }
}
</style>