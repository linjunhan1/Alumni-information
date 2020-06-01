<template>
  <div class="wrapper">
    <!-- 头部面包屑 -->
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Introduction' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公共模块</el-breadcrumb-item>
        <el-breadcrumb-item>校园新闻</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mian">
      <!-- 卡片 -->
      <el-card class="box-card" shadow="always">
        <!-- 搜索框 -->
        <el-row>
          <el-col :span="6">
            <div class="serch">
              <el-input
                placeholder="搜索新闻"
                v-model="getNewsListVar.query"
                clearable
                @clear="getNewsList"
              >
                <el-button slot="append" icon="el-icon-search" @click="getNewsList"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 新闻列表 -->
        <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="resetDateFilter">清除所有过滤器</el-button>-->
        <el-table :data="newList" default-sort="{prop: 'date', order: 'ascending'}">
          <el-table-column label="日期" prop="date" sortable ref="dateFilter" :formatter="formatDate"></el-table-column>

          <el-table-column label="新闻标题" prop="title"></el-table-column>
          <el-table-column label="点赞数" prop="goodnum" sortable></el-table-column>
          <el-table-column fixed="right" label="操作" width="120" prop="id">
            <template slot-scope="scope">
              <el-button @click.native.prevent="newsDetail(scope)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="getNewsListVar.pagenum"
          :page-sizes="[10, 20, 300, 40]"
          :page-size="getNewsListVar.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
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
      //获取新闻列表所需要传过去的参数
      getNewsListVar: {
        query: '',
        //当前页数
        pagenum: 1,
        //每页显示的新闻
        pagesize: 2
      },
      //接收到的新闻列表数据
      newList: [], //新闻信息对象
      total: 0, //新闻总署
      backtop: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    
    
    //新闻详情
    newsDetail(scope) {
      console.log(scope)

      this.$router.push({ name: 'newsDetails', params: { scope } })
    },
    //获取新闻列表
    getNewsList() {
      axios
        .get(
          // ' http://mock.studyinghome.com/mock/5e4a64667f1250195fcbc931/koapro/newsList'
          'http://localhost:3000/news',
          {
            params: this.getNewsListVar
          }
        )
        .then(response => {
          console.log(response)

          if (response.data.status !== 200) {
            console.log('新闻列表数据请求失败')
            return
          } else {
            const res = response.data

            console.log(res)

            this.newList = res.news
            this.total = res.total
            console.log(this.newList)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 监听一次显示多少新闻记录
    handleSizeChange(pagesize) {
      // console.log(pagesize)
      this.getNewsListVar.pagesize = pagesize
      this.getNewsList()
    },
    //监听页码变化
    handleCurrentChange(PageNum) {
      // console.log(PageNum)
      this.getNewsListVar.pagenum = PageNum
      this.getNewsList()
    }
  },
  created() {
    //获取新闻列表
    this.getNewsList()
    
  },
  mounted() {}
}
</script>
<style lang ="less" scoped>
.wrapper {
  height: auto;
  overflow: hidden;
}
.el-card{
  height: 780px;
}
</style>
