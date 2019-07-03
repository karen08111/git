<template>
  <ul>
    <li v-for="item in clist">
      <div class="image">
        <img :src="$store.state.site + item.avatar" :onerror="`this.src='${defImg}'`" alt="">
      </div>
      <div class="title">
        <router-link v-if="isUid && !item.follow_id" :to="`${path}/${item.id}`" target="_blank">
          {{item.team_name || item.name || item.title}}
        </router-link>
        <router-link v-else-if="item.follow_id" :to="`${path}/${item.follow_id}`" target="_blank">
          {{item.team_name || item.name || item.title}}
          <span v-if="item.current_state" class="zhuangtai" :class="item.current_state === '空闲中' && 'leisure' || 'working'"></span>
        </router-link>
        <router-link v-else :to="`${path}/${item.id}`" target="_blank">
          {{item.title || item.team_name || item.name}}
          <span v-if="item.current_state" class="zhuangtai" :class="item.current_state === '空闲中' && 'leisure' || 'working'"></span>
        </router-link>
        <p>
          <slot name="type" :item="item"></slot>
          <slot name="nums" :item="item"></slot>
          <slot name="time" :item="item"></slot>
          <slot name="pay" :item="item"></slot>
          <span v-if="item.city">{{item.city}}</span>
        </p>
        <p>{{item.publisher || item.name}}</p>
      </div>
      <div class="time">
        <p>发布于{{item.update_time}}</p>
        <p>{{item.hits}}次浏览</p>
      </div>
      <div class="contact">
        <el-button type="primary" @click="getMobile(item)">立即联系</el-button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'list',
  props: {
    list: Array,
    path: String,
    isUid: {
      type: Boolean,
      default: false
    },
    defImg: {
      type: String,
      default: require('../../../assets/none.png')
    },
    mod: Number
  },
  computed: {
    clist () {
      let arr = this.list
      for (let i of arr) {
        i['city'] = []
        for (let j of i.region) {
          i['city'].push(j.title)
        }
        i['city'] = i['city'].join('-')
      }
      return arr
    }
  },
  methods: {
    getMobile (item) {
      let id
      if (item.follow_id) {
        id = item.follow_id
      } else {
        id = item.id
      }
      this.$store.commit('toLoginPlus')
      this.$http.get(`/member/getInfoMobile/${id}/${this.mod}`).then(res => {
        if (res.data.code == 200) {
          this.$alert(res.data.data, '联系方式', {
            confirmButtonText: '确定',
            callback: action => {

            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .zhuangtai {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 8;
    width: 40px;
    height: 46px;
    opacity: 0.8;
    display: none;
    &.leisure{
      background-image: url("../../../assets/leisure.png");
    }
    &.working{
      background-image: url("../../../assets/working.png");
    }
  }

  ul {
    width: 100%;
    margin: 0 auto 20px;

    li {
      width: 100%;
      height: 123px;
      padding: 16px 20px;
      box-sizing: border-box;
      border-left: 1px solid #cccccc;
      border-right: 1px solid #cccccc;
      border-bottom: 1px solid #cccccc;
      display: flex;
      align-items: center;
      position: relative;
      &:first-of-type{
        border-top: 1px solid #cccccc;
      }
      &:hover {
        background-color: #fafafb;

        .time {
          display: none;
        }

        .contact {
          display: flex;
        }
        .zhuangtai{
          display: block;
        }
      }

      & > div {
        height: 90px;
      }

      .image {
        width: 90px;
        height: 90px;
        margin-right: 20px;
        z-index: 9;
        img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .title {
        margin-right: auto;

        a {
          letter-spacing: 1px;
          color: #34495e;
          margin-bottom: 18px;
          display: block;

          &:hover {
            color: #3388ff;
          }
        }

        p {
          font-size: 12px;
          letter-spacing: 1px;
          color: #999999;

          &:nth-of-type(1) {
            margin-bottom: 19px;
          }

          span {
            display: inline-block;
            height: 22px;
            line-height: 22px;
            border-radius: 4px;
            border: solid 1px #999999;
            margin-right: 15px;
            padding: 0 10px;
          }
        }
      }

      .time {
        p {
          font-size: 12px;
          letter-spacing: 1px;
          color: #cccccc;
          margin-bottom: 29px;
          text-align: right;
        }
      }

      .contact {
        display: flex;
        align-items: center;
        display: none;
      }
    }
  }
</style>
