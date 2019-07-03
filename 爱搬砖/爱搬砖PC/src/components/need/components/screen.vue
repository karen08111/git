<template>
  <div class="screen" :class="{overtop : ismore && isMore}">
    <div class="label">{{label}}:</div>
    <span :class="{active : index == 0}" @click="choose(0)">全部</span>
    <span v-for="item in list" :class="{active : item.id == index}" @click="choose(item.id,item.title || item.work_name)">{{item.title || item.work_name}}</span>
    <div :class="cname" @click="more($event)"></div>
  </div>
</template>

<script>
export default {
  name: 'screen',
  props: {
    label: String,
    list: Array,
    ismore: {
      type: Boolean,
      default: false
    },
    idx: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      index: this.idx,
      isMore: true
    }
  },
  computed: {
    cname () {
      if (this.isMore) return 'more'
      else return 'few'
    }
  },
  watch: {
    idx (val) {
      this.index = val
    }
  },
  methods: {
    choose (id, title) {
      this.index = id
      this.$emit('choose', { id, title })
    },
    more (e) {
      this.isMore = !this.isMore
      // e.target.parentNode.classList.remove('overtop')
    }
  }
}
</script>

<style scoped lang="less">
  .screen{
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    border-bottom: 1px dashed #cccccc;
    position: relative;
    box-sizing: border-box;
    &.overtop{
      max-height: 88px;
      overflow: hidden;
      .more{
        display: block;
        width: 55px;
        height: 22px;
        background: url("../../../assets/more.png") no-repeat center 5px;
        border: solid 1px #cccccc;
        transition: all .4s;
        position: absolute;
        right: 0;
        bottom: 10px;
        cursor: pointer;
        &:hover{
          background-position: center -19px;
        }
      }
    }
    .label{
      display: inline;
      margin-right: 20px;
    }
    span{
      display: inline-block;
      cursor: pointer;
      margin-right: 13px;
      font-size: 14px;
      letter-spacing: 1px;
      color: #666666;
      margin-bottom: 16px;
      padding: 4px 7px;
      border-radius: 4px;
      &.active, &:hover{
        color: #fff;
        background-color: #3388ff;
      }
    }
    .more{
      display: none;
    }
    .few{
      display: block;
      width: 55px;
      height: 22px;
      background: url("../../../assets/more.png") no-repeat center -19px;
      border: solid 1px #cccccc;
      transition: all .4s;
      position: absolute;
      right: 0;
      bottom: 10px;
      cursor: pointer;
      &:hover{
        background-position: center 5px;
      }
    }
  }
</style>
