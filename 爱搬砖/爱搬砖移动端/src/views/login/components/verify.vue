<template>
  <div class="verify">
    <div class="image">
      <div class="front" :style="{background: `url('${imgUrl}') no-repeat left center / 100%`, left: left + 'PX'}"></div>
      <div class="behind" :style="{background: `url('${imgUrl}') no-repeat left top / 100%`}"></div>
    </div>
    <div class="slide" ref="slide">
      <div class="slide-btn" :style="{left: left + 'PX'}" ref="btn"  @touchstart='touchStart' @touchmove='touchMove' @touchend="touchend"></div>
      <!--@mousedown="start($event)"--> 
      <div class="slide-pathway" v-show="flag">拖动左边滑块完成上方拼图</div>
    </div>
    <div class="btn">
      <i class="close" @click="close"></i>
      <i class="refresh" @click="refresh"></i>
    </div>
  </div>
</template>

<script>
	import { baseURL } from '@/axios'
  import VueCookies from 'vue-cookies'
  export default {
    name: "verify",
    props: {
      mobile: String,
      x_qe_with: Object,
      img: {
        type: String,
        default: '/member/captcha/verimg'
      },
      mob: {
        type: String,
        default: '/member/captcha/vermob'
      },
      request_id: String
    },
    data() {
      return {
      	baseURL:baseURL,
        imgUrl: '',
        disX: 0,
        left: 0,
        flag: false,
        starts:'',
      }
    },
    watch: {
      left (val){
        if(val < 0){
          this.left = 0
        }else if(val > 184){
          this.left = 184
        }
      }
    },
    methods: {
      getImg (){
        this.flag = false
        this.$http.get(this.img,{headers: {'Abz-Request-Id': this.request_id || VueCookies.get("abzappid")}}).then(res => {
          this.imgUrl = res
        }).then(_ => {
          this.flag = true
        })
      },
      touchStart(ev){
				var btnWith = document.getElementsByClassName("slide-btn")[0].offsetWidth
				this.starts = ev.touches[0].clientX;
//				console.log(ev.touches[0])
				this.flag = false
      },
      touchMove(ev) {
      	ev.preventDefault();
      	var nums = ev.touches[0].clientX
      	this.left = nums-this.starts
//    	console.log(ev.touches[0])
      },
      touchend(e){
      	var that = this
				 	this.flag = false
						var data = {
							mobile: this.mobile, code: this.left
						}
						let url = ''
						if(!/^http/.test(this.mob)){
						  url = this.baseURL
            }
						fetch(url + this.mob,{
							method:"post",
							headers:{
								'Content-Type': 'application/json',
								'Abz-Request-Id': this.request_id || VueCookies.get("abzappid"),
                ...this.x_qe_with
							},
							body:JSON.stringify(data)
							}).then(res=>{
								res.json().then(r=>{
									if(r.code == 200) {
										that.$emit('success',r)
                    if(process.env.VUE_APP_NodeEnv !== 'production'){
                      alert(r.msg)
                    }
                  }else{
										that.$toast(r.msg)
										that.refresh()
									}
								})
							})
//	        this.$http.post('/member/captcha/vermob',{mobile: this.mobile, code: this.left}).then(res => {
//	          if(res.code == 200){
//	            this.$emit('success')
//	          }else{
//	            this.refresh()
//	          }
//	        })
	        document.onmousemove = null
	        document.onmouseup = null
      },
      start (e){
//    	console.log(e)
        if(this.flag){
          const btn = this.$refs.btn
          this.disX = e.clientX - btn.offsetLeft

          document.onmousemove = e => this.move(e)
          document.onmouseup = _ => this.end()
        }
      },
      move (e){
      	console.log(e)
        this.left = e.clientX - this.disX
      },
      end (){
        this.flag = false
        this.$http.post(this.mob,{mobile: this.mobile, code: this.left}).then(res => {
          if(res.code == 200){
            this.$emit('success')
          }else{
            this.refresh()
          }
        })
        document.onmousemove = null
        document.onmouseup = null
      },
      close (){
        this.$emit('close')
      },
      refresh (){
        this.disX = 0
        this.left = 0
        this.flag = false
        this.getImg()
      }
    },
    created (){
      this.getImg()
    }
  }
</script>

<style scoped lang="less">
  .verify{
    width: 260PX;
    height: 260PX;
    background-color: #fff;
    padding: 10PX;
    padding-bottom: 0;
    box-sizing: border-box;
    border: 1PX solid #ccc;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 99;
    .image{
      width: 240PX;
      height: 150PX;
      position: relative;
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
      width: 240PX;
      height: 36PX;
      background-color: #dfe1e2;
      border-radius: 18PX;
      margin: 15PX 0;
      background: url("../../../assets/images/icon.png") no-repeat 0 0;
      position: relative;
      .slide-btn{
        width:56PX;
        height:56PX;
        background: url("../../../assets/images/icon.png") no-repeat -5PX -47PX;
        position: absolute;
        left: 0;
        top: -10PX;
        cursor: pointer;
      }
      .slide-pathway{
        padding-left: 60PX;
        line-height: 36PX;
        color: #88949d;
        font-size: 0.2rem;
      }
    }
    .btn{
      height: 30PX;
      border-top: 1PX solid #ccc;
      display: flex;
      align-items: center;
      i{
        display: block;
        width:20PX;
        height:20PX;
        background-image: url('../../../assets/images/icon.png');
        background-repeat: no-repeat;
        cursor: pointer;
      }
      .close{
        background-position: -1PX -189PX;
        margin-right: 20PX;
      }
      .refresh{
        background-position:-2PX -354PX;
      }
    }
  }
</style>