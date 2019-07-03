
<template>
	<keep-alive>
		<div id="app" v-cloak>
	  	<!--<div class="up">
	  		<span class="jiantou" @click="jump()"></span>
	  		<span></span>
	  	</div>-->
	    <router-view />
	    <MenuBar></MenuBar>
      <invitePop></invitePop>
	  </div>
	</keep-alive>
</template>
<script>
  import invitePop from './components/popUp/invitePop'
	export default {
    components: {invitePop},
		methods: {
			jump(){
				this.$router.go(-1)
			}
		},
		mounted() {
//			sessionStorage.setItem("ac",0)
      document.body.addEventListener('touchstart', function () {})
		},
		beforeRouteEnter(to,from,next) {

		}

	}
</script>
<style lang="less">
  @charset "utf-8";html{background-color:#fff;color:#000;font-size:12px}
  body,ul,ol,dl,dd,h1,h2,h3,h4,h5,h6,figure,form,fieldset,legend,input,textarea,button,p,blockquote,th,td,pre,xmp{margin:0;padding:0}
  body,input,textarea,button,select,pre,xmp,tt,code,kbd,samp{line-height:1.5;font-family:tahoma,arial,"Hiragino Sans GB",simsun,sans-serif}
  h1,h2,h3,h4,h5,h6,small,big,input,textarea,button,select{font-size:100%}
  h1,h2,h3,h4,h5,h6{font-family:"微软雅黑",simsun,sans-serif}
  h1,h2,h3,h4,h5,h6,b,strong{font-weight:normal}
  address,cite,dfn,em,i,optgroup,var{font-style:normal}
  table{border-collapse:collapse;border-spacing:0;text-align:left}
  caption,th{text-align:inherit}
  ul,ol,menu{list-style:none}
  fieldset,img{border:0}
  img,object,input,textarea,button,select{vertical-align:middle}
  article,aside,footer,header,section,nav,figure,figcaption,hgroup,details,menu{display:block}
  audio,canvas,video{display:inline-block;*display:inline;*zoom:1}
  blockquote:before,blockquote:after,q:before,q:after{content:"\0020"}
  textarea{overflow:auto;resize:vertical}
  input,textarea,button,select,a{outline:0 none;border: none;}
  button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}
  mark{background-color:transparent}
  a,ins,s,u,del{text-decoration:none}
  sup,sub{vertical-align:baseline}
  html {height: auto;font-size: 50px;-webkit-tap-highlight-color: transparent;}
  body {font-family: Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica, sans-serif;color: #333;font-size: .28em;line-height: 1;-webkit-text-size-adjust: none;height: auto;}
  hr {height: .02rem;margin: .1rem 0;border: medium none;border-top: .02rem solid #cacaca;}
  a {color: #25a4bb;text-decoration: none;}
	input[type="text"]::-webkit-input-placeholder{color: #cccccc;}
  [v-cloak] {
    display: none !important;
  }
  /*#app{
  	padding-top: 1rem;
  	box-sizing: border-box;
  }*/
 #app{
 	/*height: 100%;*/
 	/*overflow-y: auto;*/
 	position: relative;
 }
 #cnzz_stat_icon_1275856291{
 	display: none;
 }
  .up{
  	background: #B6B6B6;
  	color: #000000;
  	height: 1rem;
  	width: 100%;
  	z-index: 19999;
  	position: fixed;
  	top: 0;
  	left: 0;
  	/*margin-bottom: 1rem;*/
  }
  .jiantou{
  	width: 0.24rem;  
		height: 0.24rem;  
		position: absolute;  
		top: 0.5rem;
		left: 0.3rem;
		border-right: 0.01rem solid #000;  
		border-top: 0.01rem solid #000;  
		-webkit-transform: translate(0,-50%) rotate(-135deg);  
		transform: translate(0,-50%) rotate(-135deg); 
  }
  .shade{
		background: #000000;
		opacity: 0.5;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
	}
</style>
