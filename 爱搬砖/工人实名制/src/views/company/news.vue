<template>
  <div class="news">
    <div class="newsHeaderClass">
      <el-row :gutter="24">
        <el-col :span="8"
                :offset="2"
                style="height:100%;border-right:2px solid #ddd">
          <div><img width="80%"
                 :src="src" /></div>
        </el-col>
        <el-col :span="8"
                :offset="2">
          <div><img width="80%"
                 :src="src" /></div>
        </el-col>
      </el-row>
    </div>
    <div class="newsList">
    </div>
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  methods: {
  },
  mounted: function () {
    this.proId = localStorage.getItem('proId')
    this.$http.get('/member/project/notPageLists', {}).then(res => {
      this.projectArr = res.data.data
    })
  }
}
</script>

<style scoped lang="less">
.news {
  margin: 24px auto 0 !important;
  background-color: #fff;
  :global {
    .el-select {
      display: block;
    }
    .breadcrumbItemStyle {
      margin-bottom: 0;
    }
  }
}
.newsHeaderClass {
  width: 1200px;
}
.btnGroup {
  text-align: right;
  margin-bottom: 24px;
}
.plusClass {
  margin-left: 8px;
}
.radioStyle {
  margin: 10px 24px 10px 0;
}
</style>
