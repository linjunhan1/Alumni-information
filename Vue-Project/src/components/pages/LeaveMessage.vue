<template>
  <div class="wrapper">
    <!-- 头部面包屑 -->
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Introduction' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公共模块</el-breadcrumb-item>
        <el-breadcrumb-item>校友留言</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mian">
      <!-- 卡片 -->
      <el-card class="box-card" shadow="always">
        <!-- 搜索框 -->
        <el-row>
          <el-col :span="6">
            <div class="serch">
              <el-input placeholder="搜索关键字">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>

        <!-- 分割线 -->
        <el-divider content-position="left">校友留言︱您的心声是献给母校最好的礼物</el-divider>
        <!-- 校友留言列表 -->
        <ul class="list">
          <li v-for="item in text">
            <div class="list-main">
              <div id="img">
                 
                  
                  

                <img :src="item.img" alt="无上传图" />
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
          :current-page.sync="currentPage3"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <!-- 留言 -->
        <el-row>
          <el-form :model="goodinfo" ref="form" label-width="100px" class="demo-ruleForm">
            <el-col :span="20">
              <el-form-item label="留言">
                <el-input v-model="form.text"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="20">
              <el-form-item>
                <el-upload
                  action="#"
                  :limit="1"
                  ref="upload"
                  :multiple="true"
                  :auto-upload="false"
                  :file-list="fileList"
                  list-type="picture-card"
                  :on-exceed="handleExceed"
                >
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">上传图片大小不超过500kb并且只能上传一张图片哦</div>
                </el-upload>
              </el-form-item>
            </el-col>

            <el-col :span="20">
              <el-form-item>
                <el-button type="primary" @click="submitUpload">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>>
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
      //校友留言图
      urlImg: [],
      //校友留言数据
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
      currentPage3: 1,
      total: '',
      form: {
        text: ''
      },
      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url:
        //     'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // },
        // {
        //   name: 'food2.jpeg',
        //   url:
        //     'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }
      ],
     
    }
  },
  watch: {
    currentPage3: function() {
      this.getLeaveMessageList()
    }
  },
  computed: {},
  methods: {
    //只能上传1张
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    submitUpload() {
      // 获取到 上传的所有文件，它是一个数组
      const fileArray = this.$refs.upload.uploadFiles
      // console.log(fileArray)
      // 实例化FormData对象
      const fd = new FormData()
      // 遍历文件数组，将所有文件存入fd中
      for (let i = 0; i < fileArray.length; i++) {
        // 在这里数组每一项的.raw才是你需要的文件，有疑惑的可以打印到控制台看一下就清楚了
        fd.append('avatar', fileArray[i].raw)
      }
      // console.log(fd)
      // 发送HTTP请求，发送数据
      axios({
        url: 'publishedComments',
        method: 'post',
        data: fd,
        params: this.form
      }).then(res => {
        console.log(res.data)
      })
      //刷新
      this.$router.go(0)
    },



    //限制上传的照片
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    //获取留言列表
    getLeaveMessageList() {
      var maxPage = this.currentPage3 * 10
      var minPage = maxPage - 10

      // console.log(page)
      axios
        .get('getLeaveMessage', {
          params: {
            //请求参数
            maxPage: maxPage,
            minPage: minPage
          }
        })
        .then(resopse => {
          console.log(resopse)
          this.text = resopse.data.pageResult
          this.total = resopse.data.totolLength
          // console.log(resopse)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    //换页做的事
    handleCurrentChange() {}
  },
  created() {
    this.getLeaveMessageList()

    axios
      .get(
        'https://www.studyinghome.com/mock/5e4a64667f1250195fcbc931/koapro/getImg'
      )
      .then(Response => {
        this.urlImg = Response.data.data.ImgUrl
      })
      .catch(function(error) {
        console.log(error)
      })
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

/* 校友留言列表样式 */
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

.el-row {
  margin-top: 20px;
}
</style>
