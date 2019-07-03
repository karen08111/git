<template>
	<div class="souList">
		<!--找个人-->
		<div class="main" v-if="id==1">
			<infoList v-for=" p in list" :list="p" type="geren"></infoList>
		</div>
		<!--找团队-->
		<div class="main" v-if="id==2">
			<infoList v-for=" p in list" :list="p" type="team"></infoList>
		</div>
		<!--工人找活-->
		<div class="main" v-if="id==3">
			<infoList v-for=" p in list" :list="p" isIcon="true" type="information"></infoList>
		</div>
		<!--团队找活-->
		<div class="main" v-if="id==4">
			<infoList v-for=" p in list" :list="p" isIcon="true"  type="information"></infoList>
		</div>
		<p class="zanwu" v-if="list.length==0">暂无信息~</p>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	export default {
		data() {
			return {
				baseURL:baseURL,
				id:'',
				page:1,
				urls:'',
				value:'',
				list:[],
				nature:''
			}
		},
		created() {
			this.id = this.$route.query.id
			this.urls = this.$route.query.urls
			if(this.$route.query.nature){
				this.nature = this.$route.query.nature
			}
			this.value = this.$route.query.title
			var that = this
			window.addEventListener("scroll",function(){
			 	if(that.getScrollHeight() < that.getDocumentTop() + that.getWindowHeight()+1){
				 		if(that.id ==1 || that.id ==2){
							that.getInfo();
						}else {
							that.getZhao();
						}
			 	}
			 })
		},
		mounted() {
			if(this.id==1 || this.id==2){
				this.getInfo();
			}else if(this.id ==3 || this.id ==4){
				this.getZhao();
			}
		},
		methods: {
			getInfo() {
				this.$http.get(this.urls+"?sort=1&keywords="+this.value+"&page="+this.page).then(res=>{
					if(res.code ==200){
						this.page = parseInt(res.data.current_page)+1
						this.list = this.list.concat(res.data.data)
					}
				})
			},
			//找活
			getZhao() {
				this.$http.get(this.urls+"?sort=1&keywords="+this.value+"&page="+this.page+"&nature="+this.nature).then(res=>{
					if(res.code ==200){
						this.page = parseInt(res.data.current_page)+1
						this.list = this.list.concat(res.data.data)
					}
				})
			},
			//文档高度
			getDocumentTop() {
			    var scrollTop =  0, bodyScrollTop = 0, documentScrollTop = 0;
			    if (document.body) {
			        bodyScrollTop = document.body.scrollTop;
			    }
			    if (document.documentElement) {
			        documentScrollTop = document.documentElement.scrollTop;
			    }
			    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
//			    console.log("scrollTop:"+scrollTop);
			    return scrollTop;
			},
			//可视窗口高度
			getWindowHeight() {
			    var windowHeight = 0;
			    if (document.compatMode == "CSS1Compat") {
			        windowHeight = document.documentElement.clientHeight;
			    } else {
			        windowHeight = document.body.clientHeight;
			    }
//			    console.log("windowHeight:"+windowHeight);
			    return windowHeight;
			},
			
 
			//滚动条滚动高度
			getScrollHeight() {
			    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
			    if (document.body) {
			        bodyScrollHeight = document.body.scrollHeight;
			    }
			    if (document.documentElement) {
			        documentScrollHeight = document.documentElement.scrollHeight;
			    }
			    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
//			    console.log("scrollHeight:"+scrollHeight);
			    return scrollHeight;
			}
		}
	}
</script>

<style scoped lang="less">
	.souList{
		padding-bottom: 1rem;
		background: #f7f7fa;
		width: 100%;
		box-sizing: border-box;
		height: 100%;
	}
	.zanwu{
		font-weight: 0.28rem;
		text-align: center;
		padding-top: 0.5rem;
		color: #000000;
	}
</style>