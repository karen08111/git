<template>
	
	<div class="body"  id="scroll">
		<!--找个人-->
		<div class="main" v-if="id==1">
			<shai @giveRe="giveRe" @jobId="jobId" @gitCityId="gitCityId" @stops="stops" :sort="sort"></shai>
			<infoList v-for=" p in list" :list="p" type="geren"></infoList>
		</div>
		<!--找团队-->
		<div class="main" v-if="id==2" @giveList2="giveList2">
			<shai @giveRe="giveRe" @jobId="jobId" @gitCityId="gitCityId" :sort="sort"></shai>
			<infoList v-for=" p in list" :list="p" type="team"></infoList>
		</div>
		<!--工人找活-->
		<div class="main" v-if="id==3">
			<shai @giveRe="giveRe" @jobId="jobId" @gitCityId="gitCityId" :sort="sort"></shai>
			<infoList v-for=" p in list" :list="p"  type="information"></infoList>
		</div>
		<!--团队找活-->
		<div class="main" v-if="id==4">
			<shai @giveRe="giveRe" @jobId="jobId" @gitCityId="gitCityId" :sort="sort"></shai>
			<infoList v-for=" p in list" :list="p"  type="information"></infoList>
		</div>
		<p class="zanwu" v-if="list.length==0">暂无信息~</p>
	</div>
	
</template>

<script>
	import { baseURL } from '@/axios'
	import $ from 'jquery'
	export default {
		data() {
			return {
				id:'',
				page:1,
				urls:'',
				list:[],
				baseURL:baseURL,
				pageStore:true,
				nature:null,
				sort: +sessionStorage.getItem('screenSort') || 1,
				top:'',
				stop:false
			}
		},
    watch: {
		  sort (val){
		    sessionStorage.setItem('screenSort',val)
      }
    },
		created() {
			this.id = this.$route.query.id;//获取选项类型
			this.urls = this.$route.query.urls;//获取请求地址
			if(this.$route.query.nature){
				this.nature = this.$route.query.nature
//				this.getZhao()
			}else {
//				this.getOne()
			}
			
		},
		mounted() {
			var that = this
			//查看是否有浏览历史记录
			if(localStorage.getItem("liuScroll")>this.getScrollHeight()){
				that.list = [];
				var page = localStorage.getItem("liuPage")
				var arr = []
				for(let i=0;i<page-1;i++) {
					if(this.nature){
						this.getZhao2(i+1)
					}else {
						this.getOne2(i+1)
					}
					//监听滚动条
					if(that.pageStore){
						window.addEventListener("scroll",function(){
							that.top= document.documentElement.scrollTop||document.body.scrollTop;
						 	if(that.getScrollHeight() < that.getDocumentTop() + that.getWindowHeight()+1){
							 		if(that.id ==1 || that.id ==2){
										that.getOne2(i+1)
									}else {
										that.getZhao2(i+1)
									}
						 	}
						 })
					}
					
				}
				$("html,body").animate({ scrollTop: localStorage.getItem("liuScroll") }, 1000);
			}else {
				if(this.nature){
					this.getZhao()
				}else {
					this.getOne()
				}
				
				//监听滚动条
				if(that.pageStore){
					window.addEventListener("scroll",function(){
						that.top= document.documentElement.scrollTop||document.body.scrollTop;
					 	if(that.getScrollHeight() < that.getDocumentTop() + that.getWindowHeight()+1){
						 		if(that.id ==1 || that.id ==2){
									that.getOne()
								}else {
									that.getZhao()
								}
					 	}
					 })
				}
//				window.scrollTo(0,500)
			}
			
			
		},
		beforeDestroy() {
			localStorage.setItem("liuPage",this.page)
			localStorage.setItem("liuScroll",this.top)
		},
		methods: {
			giveList(list){
				//搜索个人
				var that = this
				this.id = 1
				this.$http.get("/resumeList?sort="+ this.sort +"&keywords="+this.souVal+"&page="+this.page).then(res=>{
					if(res.code ==200) {
						that.list = that.list.concat(res.data.data)
						this.page = parseInt(res.data.current_page)+1
					}
				})
			},
			stops(s) {
				this.stop = s
			},
			//搜索团队
			giveList2(val){
				var that = this
				this.id = 2
//				console.log(val)
			},
			giveList3(val){
				var that = this
				this.id = 3
//				console.log(val)
			},
			giveList4(val){
				var that = this
				this.id = 4
//				console.log(val)
			},
			//监听
			giveRe(id){
//				console.log(id)
				this.sort=id
				this.page = 1;
				this.list=[];
				if(!this.nature){
					this.getOne()
				}else{
					//招聘
					var that = this
					that.$http.get(that.urls+"?sort="+that.sort+"&nature="+that.nature+"&page="+that.page).then(res=>{
						if(res.code==200){
							that.page = parseInt(res.data.current_page)+1
							that.list = that.list.concat(res.data.data)
//							console.log(that.list)
						}
					})
				}
				
			},
			jobId(id,i){
				this.page = 1;
				this.list=[];
				if(i==1){
					var that = this
					if(!this.nature){
						that.$http.get(that.urls+"?sort="+that.sort+"&page="+that.page+"&big_type="+id).then(res=>{
							if(res.code==200){
								that.page = parseInt(res.data.current_page)+1
								that.list = that.list.concat(res.data.data)
//								console.log(that.list)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
							}
						})
					}else {
						//招聘
						var that = this
						that.$http.get(that.urls+"?sort="+that.sort+"&nature="+that.nature+"&page="+that.page+"&big_type="+id).then(res=>{
							if(res.code==200){
								that.page = parseInt(res.data.current_page)+1
								that.list = that.list.concat(res.data.data)
//								console.log(that.list)
							}
						})
					}
					
				}else if(i==2){
					var that = this
					if(!this.nature){
						that.$http.get(that.urls+"?sort="+that.sort+"&page="+that.page+"&works="+id).then(res=>{
							if(res.code==200){
								that.page = parseInt(res.data.current_page)+1
								that.list = that.list.concat(res.data.data)
		//						console.log(that.list)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
							}
						})
					}
					
				}
			},
			gitCityId(id) {
				this.page = 1;
				this.list=[];
				var that = this
				if(!this.nature){
					that.$http.get(that.urls+"?sort="+that.sort+"&page="+that.page+"&province="+id).then(res=>{
						if(res.code==200){
							that.page = parseInt(res.data.current_page)+1
							that.list = that.list.concat(res.data.data)
	//						console.log(that.list)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
						}
					})
				}else {
					//招聘
					var that = this
					that.$http.get(that.urls+"?sort="+that.sort+"&nature="+that.nature+"&page="+that.page+"&province="+id).then(res=>{
						if(res.code==200){
							that.page = parseInt(res.data.current_page)+1
							that.list = that.list.concat(res.data.data)
	//						console.log(that.list)
						}
					})
				}
				
			},
			//个人和团队请求
			getOne() {
				var that = this
				that.$http.get(that.urls+"?sort="+that.sort+"&page="+that.page).then(res=>{
					if(res.code==200){
						that.page = parseInt(res.data.current_page)+1
						that.list = that.list.concat(res.data.data)
//						console.log(that.list)
					}
				})
			},
			//招聘
			getZhao() {
				var that = this
				that.$http.get(that.urls+"?sort="+that.sort+"&nature="+that.nature+"&page="+that.page).then(res=>{
					if(res.code==200){
						that.page = parseInt(res.data.current_page)+1
						that.list = that.list.concat(res.data.data)
//						console.log(that.list)
					}
				})
			},
			getZhao2(page) {
				var that = this
				that.$http.get(that.urls+"?sort="+that.sort+"&nature="+that.nature+"&page="+page).then(res=>{
					if(res.code==200){
						that.page = parseInt(res.data.current_page)+1
						that.list = that.list.concat(res.data.data)
//						console.log(that.list)
					}
				})
			},
			getOne2(page) {
				var that = this
				that.$http.get(that.urls+"?sort="+that.sort+"&page="+page).then(res=>{
					if(res.code==200){
						that.page = parseInt(res.data.current_page)+1
						that.list = that.list.concat(res.data.data)
//						console.log(that.list)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
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
	.main{
		background: #f7f7fa;
		width: 100%;
		padding-bottom: 0.5rem;
		padding-top: 2rem;
		box-sizing: border-box;
		overflow: scroll;
	}
	.zanwu{
		font-weight: 0.28rem;
		text-align: center;
		padding-top: 0.5rem;
		color: #000000;
	}
</style>