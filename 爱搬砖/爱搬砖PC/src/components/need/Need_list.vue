<template>
    <div class="list">
        <ul>
            <li v-if="!from" v-for="i in list.slice((pageNum-1)*12,pageNum*12)">
                <router-link :to="{path: link,query: {id:i.id}}" target="_blank">
                    <div class="image" v-if="i.imgs"><img :src="$store.state.site + i.imgs" :onerror="$store.state.defaultImg"></div>
                    <div class="image" v-else><img src="../../assets/none.png"></div>
                    <div class="txt">
                        <p class="red">￥:<span class="bs">{{i.min_pay == 0 ? '面议' : (i.min_pay == i.max_pay ? i.max_pay+'k' : i.min_pay+'k-'+i.max_pay+'k')}}</span></p>
                        <p class="tit">{{i.title}}</p>
                        <div class="com">{{i.name}}</div>
                        <div class="bot">
                            <span class="bt">{{i.work_name}}</span>
                            <div class="place"><i class="el-icon-location-outline"></i>{{i.region[0].title}}{{i.region[1].title}}</div>
                        </div>
                        <div style="clear: both"></div>
                    </div>
                </router-link>
            </li>
            <li class="pro" v-if="from" v-for="i in list">
                <router-link :to="{path: link,query: {id:i.id}}" target="_blank">
                    <div class="image" v-if="i.imgs"><img :src="$store.state.site + i.imgs.path" :onerror="$store.state.defaultImg"></div>
                    <div class="image" v-else><img src="../../assets/none.png"></div>
                    <div class="txt">
                        <p class="tit">{{i.title}}</p>
                        <p class="com">{{i.company_name}}</p>
                        <div class="bot">
                            <span class="bt">{{i.project_type}}</span>
                            <div class="place"><i class="el-icon-time"></i>{{i.update_time.slice(0,10)}}</div>
                        </div>
                        <div style="clear: both"></div>
                    </div>
                </router-link>
            </li>
        </ul>
        <div class="block" v-if="listCount != 0">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageNum"
                    :page-size="12"
                    :pager-count="7"
                    background
                    layout="prev, pager, next, jumper"
                    :total="listCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Need_list',
  data () {
    return {
      pageNum: 1
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.pageNum = val
      this.$emit('changePage', val)
    }
  },
  props: ['list', 'link', 'total', 'from'],
  computed: {
    listCount () {
      if (this.total) { return this.total } else { return this.list.length }
    }
  }
}
</script>

<style scoped lang="less">
    ul{
        display: flex;
        flex-wrap: wrap;
        width: 906px;
        li{
            width:220px;
            height:352px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(231,231,231,1);
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            box-sizing: border-box;
            margin-right: 6px;
            margin-bottom: 40px;
            transition: all .4s;
            position: relative;
            overflow: hidden;
            &:hover{
                margin-top: -2px;
                margin-bottom: 42px;
                box-shadow: 0 10px 15px #e2e2e2;
            }
          &.pro{
            height: 326px !important;
          }
            .image{
                width: 100%;
                height: 178px;
                overflow: hidden;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .txt{
                padding: 0 10px;
                .red{
                    font-size:13px;
                    color:rgba(245,70,70,1);
                    margin-top: 10px;
                    span{
                        font-size: 16px;
                    }
                }
                .tit{
                    font-size:13px;
                    color:rgba(51,51,51,1);
                    height: 38px;
                    line-height:38px;
                    display: -webkit-box;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .com{
                    font-size:13px;
                    color:rgba(153,153,153,1);
                    line-height:1;
                    padding: 13px 0 18px;
                    border-top: 1px dashed rgba(229,229,229,1);
                }
                .bt{
                    height: 20px;
                    line-height: 20px;
                    padding: 0 9px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(51,136,255,1);
                    border-radius:4px;
                    font-size: 13px;
                    color: #3388ff;
                    white-space: nowrap;
                }
                .place{
                    font-size:13px;
                    color:rgba(153,153,153,1);
                    line-height:20px;
                    white-space: nowrap;
                  margin-top: 11px;
                }
            }
        }
    }
    .block{
        text-align: center;
    }
</style>
