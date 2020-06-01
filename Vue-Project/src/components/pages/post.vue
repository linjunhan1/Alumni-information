<template>
  <div class="wrapper">
    <!-- 头部面包屑 -->
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Introduction' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>校友论坛</el-breadcrumb-item>
        <el-breadcrumb-item>帖子</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mian">
      <!-- 卡片 -->
      <el-card class="box-card" shadow="always" ref="card">
        <!-- 搜索框 -->
        <el-row>
          <el-col :span="6">
            <div class="serch">
              <el-input placeholder="搜索帖子" clearable>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <ul class="list">
          <li v-for="item in text">
            <div class="list-main">
              <div id="img">
                
                  <img :src="item.img" />
                
              </div>
              <div>
                <div>
                  <h3>{{item.title}}</h3>
                  <div>
                    <spand>{{item.time|dateFilter}}</spand>
                  </div>
                </div>
                <p>{{item.text}}</p>
              </div>
            </div>

            <el-divider></el-divider>
          </li>
        </ul>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'news',
  components: {},
  props: {},
  data() {
    return {
      scrollToTop: 0,
      text: [
        // {
        //   time:new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   title: '点燃我的生命',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //   time:new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   title: '点燃我的生命',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //    time:new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   title: '点燃我的生命',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //   time:new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   title: '点燃我的生命',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //   time:new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   title: '点燃我的生命',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //   time:new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   title: '点燃我的生命',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // },
        // {
        //   time:new Date(),
        //   img:
        //     'http://www.gsm.pku.edu.cn/__local/C/C5/58/105E3385B09F4C6508995F1A145_5B4ED53A_1C4CD.jpg',
        //   title: '点燃我的生命',
        //   text: `为了更好地贯切学校“停课不停学“的安排，做好网络授课的相关工作，以及全面落实教学评估的执行计划，2月29日，艺术设计学院举行了实时网络视频会议，及时高效地进行院内部署和沟通各项工作进展情况。参会人员包括副院长赖伟成，各教研室主任以及其他行政人员。会议由赖伟成主持。   `
        // }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    getPostListst() {
      axios
        .get('getPostListst')
        .then(resopse => {
          console.log(resopse)
          this.text = resopse.data
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  created() {
    this.getPostListst()

    // axios
    //   .get('getImg')
    //   .then(Response => {
    //     this.urlImg = Response.data.data.ImgUrl
    //   })
    //   .catch(function(error) {
    //     console.log(error)
    //   })
  },
  mounted() {}
}
</script>
<style lang ="less" scoped>
.wrapper {
  height: auto;
  overflow: hidden;
}
/* 帖子列表样式 */
li {
  padding: 30px;
  list-style-type: none;
}
.list img {
  width: 100px;
  height: 100px;
}

.list-main {
  display: flex;
}

h3 {
  line-height: 0;
}

#img {
  padding: 20px;
}
</style>
