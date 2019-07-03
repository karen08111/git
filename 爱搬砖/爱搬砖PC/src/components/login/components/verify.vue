<template>
  <div><div class="verify">
    <div class="image">
      <div class="front" :style="{background: `url('${imgUrl}') no-repeat left center / 100%`, left: left + 'px'}"></div>
      <div class="behind" :style="{background: `url('${imgUrl}') no-repeat left top / 100%`}"></div>
    </div>
    <div class="slide" ref="slide">
      <div class="slide-btn" :style="{left: left + 'px'}" ref="btn" @mousedown="start($event)"></div>
      <div class="slide-pathway">{{txt}}</div>
    </div>
    <div class="btn">
      <i class="close" @click="close"></i>
      <i class="refresh" @click="refresh"></i>
    </div>
  </div>
  <div class="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'verify',
  props: ['mobile', 'method', 'state'],
  data () {
    return {
      imgUrl: '',
      disX: 0,
      left: 0,
      flag: false,
      txt: '验证码加载中'
    }
  },
  computed: {
    urls () {
      const url = process.env.THIRD_URL

      if (this.method === 'wx') {
        return {
          img: `${url}/wxapi/auth/vercode`,
          mob: `${url}/wxapi/auth/captcha`
        }
      } else if (this.method === 'qq') {
        return {
          img: `${url}/qqapi/auth/vercode`,
          mob: `${url}/qqapi/auth/captcha`
        }
      } else {
        return {
          img: '/member/captcha/verimg',
          mob: '/member/captcha/vermob'
        }
      }
    },
    headers () {
      if (!this.method) {
        return null
      } else {
        return { 'X-Requested-With': 'XMLHttpRequest' }
      }
    }
  },
  watch: {
    left (val) {
      if (val < 0) {
        this.left = 0
      } else if (val > 184) {
        this.left = 184
      }
    }
  },
  methods: {
    getImg () {
      this.$http.get(this.urls.img, { params: { state: this.state } }).then(res => {
        this.imgUrl = res.data
        this.$cookies.set('abzID', res.headers['abz-request-id'])
      }).then(_ => {
        this.flag = true
        this.txt = '拖动左边滑块完成上方拼图'
      })
    },
    start (e) {
      if (this.flag) {
        const btn = this.$refs.btn
        this.disX = e.clientX - btn.offsetLeft

        document.onmousemove = e => this.move(e)
        document.onmouseup = _ => this.end()
      }
    },
    move (e) {
      this.left = e.clientX - this.disX
      this.txt = ''
    },
    end () {
      this.flag = false
      this.txt = '拖动左边滑块完成上方拼图'
      this.$http.post(this.urls.mob, { mobile: this.mobile, code: this.left, state: this.state }, { headers: this.headers }).then(res => {
        if (res.data.code == 200) {
          this.$emit('success')
        } else {
          this.refresh()
        }
      })
      document.onmousemove = null
      document.onmouseup = null
    },
    close () {
      this.$emit('close')
    },
    refresh () {
      this.disX = 0
      this.left = 0
      this.flag = false
      this.getImg()
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style scoped lang="less">
  .verify{
    width: 260px;
    height: 260px;
    background-color: #fff;
    padding: 10px;
    padding-bottom: 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    position: fixed;
    top: 234px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99;
    .image{
      width: 240px;
      height: 150px;
      position: relative;
      background-color: #cccccc;
      & > div{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .front{
        z-index: 999;
      }
    }
    .slide{
      width: 240px;
      height: 36px;
      background-color: #dfe1e2;
      border-radius: 18px;
      margin: 15px 0;
      background: url("../../../assets/ver_icon.png") no-repeat 0 0;
      position: relative;
      .slide-btn{
        width:56px;
        height:56px;
        background: url("../../../assets/ver_icon.png") no-repeat -5px -47px;
        position: absolute;
        left: 0;
        top: -10px;
        cursor: pointer;
      }
      .slide-pathway{
        padding-left: 60px;
        line-height: 36px;
        color: #88949d;
      }
    }
    .btn{
      height: 30px;
      border-top: 1px solid #ccc;
      display: flex;
      align-items: center;
      i{
        display: block;
        width:20px;
        height:20px;
        background-image: url('../../../assets/ver_icon.png');
        background-repeat: no-repeat;
        cursor: pointer;
      }
      .close{
        background-position: -1px -189px;
        margin-right: 20px;
      }
      .refresh{
        background-position:-2px -354px;
      }
    }
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 77;
    background-color: rgba(0,0,0,0.3);
  }
</style>
