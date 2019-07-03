<template>
  <div class="fTable">
    <el-table
        :data="list"
        :show-header="false"
        :cell-style="{borderBottom: '1px dashed #e5e5e5', letterSpacing: '1px', color: '#999999'}"
        style="width: 100%">
      <el-table-column
          prop="create_time"
          label=""
          align="center"
          min-width="20%">
      </el-table-column>
      <el-table-column
          prop="title"
          label=""
          align="center"
          min-width="20%">
      </el-table-column>
      <el-table-column
          prop="genre_text"
          label=""
          align="center"
          min-width="20%">
      </el-table-column>
      <el-table-column
          label=""
          align="center"
          min-width="20%">
        <template slot-scope="scope">
          <span :style="{color: +scope.row.genre === 2 ? '#ff7b0e' : '#1bb974'}">{{+scope.row.genre === 2 ? `-${scope.row.total_fee}` : `+${scope.row.total_fee}`}}</span>
        </template>
      </el-table-column>
      <el-table-column
          label=""
          align="center"
          min-width="20%">
        <template slot-scope="scope">
          <router-link class="details" :to="`/fillDetails/${scope.row.genre}/${scope.row.id}`">详情</router-link>
        </template>
      </el-table-column>
    </el-table>
    <paging class="pag" :total="total" :size="size" :page.sync="page"></paging>
  </div>
</template>

<script>
  import paging from '@/components/need/components/paging'
  export default {
    name: "fTable",
    components: {paging},
    props: ['genre'],
    data (){
      return {
        list: [],
        total: 0,
        size: 0,
        page: 1
      }
    },
    watch: {
      page (){
        this.req()
      }
    },
    methods: {
      req (){
        this.$http.get('/member/payment/stream', {params: {page: this.page, genre: this.genre}}).then(res => {
          if(res.data.code === 200){
            const data = res.data.data
            this.list = data.data
            this.total = +data.total
            this.size = +data.per_page
            this.page = +data.current_page
          }
        })
      }
    },
    created (){
      this.req()
    }
  }
</script>

<style scoped lang="less">
  .fTable{
    width: 100%;
    min-height: 486px;
    background-color: #fff;
    position: relative;
    padding-bottom: 100px;
    box-sizing: border-box;
    .pag{
      position: absolute;
      left: 50%;
      bottom: 34px;
      transform: translateX(-50%);
    }
    .details{
      cursor: pointer;
    }
  }
</style>

<style lang="less">
  .fTable{
    .el-table::before{
      display: none;
    }
  }
</style>
