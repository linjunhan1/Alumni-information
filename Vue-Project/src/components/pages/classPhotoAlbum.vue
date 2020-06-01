<template>
  <div class="wrapper">
    <el-card>
      <!-- 面包屑 -->
      <breadCrumb name="我的班级" nameChirend="班级相册"></breadCrumb>
      <div class="img-box">
        <div v-for="item in srcList" class="img">
          <el-tooltip class="item" effect="dark" content="点击图片可以放大哦" placement="top-start">
            <el-image style="width: 100px; height: 100px" :src="item" :preview-src-list="srcList"></el-image>
          </el-tooltip>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from '../CustomComponent/breadCrumb'
import axios from 'axios'
export default {
  name: '',
  components: { breadCrumb },
  props: {},
  data() {
    return {
      srcList: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    getPhoto() {
      var userId = this.$store.userId
      //请求
      axios({
        url: 'classPhotoAlbum',
        method: 'get',
        // data: fd,
        params: { userId: userId }
      }).then(res => {
        console.log(res.data)

        //处理数据
        var arr = []
        for (var i = 0; i < res.data.length; i++) {
          arr[i] = res.data[i].img
        }
        console.log(arr)

        this.srcList = arr
      })
    }
  },
  //处理img数据
  img() {
    // var str = JSON.stringify(arr) //这样也能转化为字符串但现在还是数组的形式不过类型已经是字符串了；
    console.log(11111)
  },

  created() {
    this.getPhoto()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.wrapper {
}
//照片
.img-box {
  display: flex;
}
.img {
  padding: 20px;
}
.el-card{
  height: 780px;
}
</style>