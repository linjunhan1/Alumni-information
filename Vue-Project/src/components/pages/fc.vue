<template>
  <div class="wrapper">
    <!-- 头部面包屑 -->
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Introduction' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公共模块</el-breadcrumb-item>
        <el-breadcrumb-item>校友风采</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mian">
      <!-- 卡片 -->
      <el-card class="box-card" shadow="always">
        <!-- 搜索框 -->
        <el-row>
          <el-col :span="6">
            <div class="serch">
              <el-input placeholder="搜索校友名字">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 校友风采走马灯 -->
        <div class="notable-box">
          <el-carousel height="600px" direction="vertical" :autoplay="false">
            <el-carousel-item v-for="item in urlImg" :key="item">
              <img :src="item" class="img" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 分割线 -->
        <el-divider content-position="left">校友风采</el-divider>
        <!-- 校友风采列表 -->
        <ul class="list">
          <li v-for="item in text" @click="goFcDetal(item)">
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
            <el-button type="warning" size="mini" v-if="flag">删除</el-button>

            <el-divider></el-divider>
          </li>
        </ul>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-card>
    </div>
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
      //校友风采轮播图
      urlImg: [],
      //校友风采数据
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
      ],
      currentPage: 1,
      total: '',
      flag: 0
    }
  },
  watch: {
    currentPage: function() {
      this.getNewsList()
    }
  },
  computed: {},
  methods: {
    //显示删除按钮
    flag(){
      if (this.$store.role == 'root') {
        this.flag = 1
        return
      }
      this.flag = 0
      return
    },
    //前往详情
    goFcDetal(item) {
      // console.log(item)
      this.$router.push({ name: 'fcDetail', params: item })
    },
    //获取新闻列表
    getNewsList() {
      // console.log(this.currentPage3)
      axios
        .get('getExampleList', {
          params: {
            //请求参数
            currentPage: this.currentPage
          }
        })
        .then(resopse => {
          console.log(resopse)
          this.text = resopse.data.pageResult
          this.total = resopse.data.totolLength
          // console.log(this.text)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    //换页做的事
    handleCurrentChange() {}
  },
  created() {
    this.getNewsList()

    axios
      .get('getImg')
      .then(Response => {
        // console.log(Response)
        this.urlImg = Response.data.ImgUrl
      })
      .catch(function(error) {
        console.log(error)
      })
    this.flag()
  },

  mounted() {}
}
</script>
<style lang ="less" scoped>
.wrapper {
  height: auto;
  overflow: hidden;
}
.el-divider__text {
  font-size: 25px;
}
/* 校友轮播图 */
.notable-box {
  background: #e4e7ed;
}

.img {
  padding-left: 200px;
}

/* 校友列表样式 */
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
