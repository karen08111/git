<template>
	<div class="invite">
		<div class="tost" v-if="tost"></div>
		<div class="li" v-if="publisher==1">
			<invite v-for=" p in list" :key="p.id" @isTost="getTost" :list="p" type="information" menu="true"></invite>
			<!--<invite v-for=" p in list.filter(value=>value.nature==2)" @isTost="getTost" :list="p" type="information" menu="true"></invite>-->
		</div>
		<div class="li" v-if="publisher==2">
			<invite v-for=" p in list" @isTost="getTost" :list="p" type="information" menu="true"></invite>
		</div>
		<div class="pickList">
			<div :class="isPick?'addList1':'addList'">
				<router-link class="zhaoRen" :to="{path:'/inviteForm/1',query:{publisher:publisher}}">招工人</router-link>
				<router-link class="zhaoTeam" :to="{path:'/inviteForm/2',query:{publisher:publisher}}">招团队</router-link>
			</div>
			<div class="add" @click="fabu" v-if="publisher == 1">发布招聘信息</div>
			<div class="add" @click="tuanFa" v-if="publisher == 2">发布招聘信息</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				list:[],
				tost:false,
				isPick:false,
				publisher:1,
				tid:'',
				store:true,
			}
		},
		mounted() {
			var that = this
			this.getList()
//			console.log(that.page)
			window.addEventListener("scroll",function(){
			 	if(that.getScrollHeight() < that.getDocumentTop() + that.getWindowHeight()+1 && that.page>1){
//			 		console.log(that.page)
				 		that.getList()
			 	}
			})
			
		},
		created() {
			this.publisher = this.$route.params.publisher
			
		},
		methods: {
			getTost(val) {
				this.tost = val
			},
			fabu() {
				this.isPick = !this.isPick
			},
			tuanFa() {
				this.$router.push({path:"/inviteForm/1",query:{publisher:this.publisher,tid:this.tid}})
			},
			getList() {
				//加载招聘列表
				if(this.publisher==1){//企业招聘列表
					this.$http.get("/member/recruit?page="+this.page+"&publisher="+this.publisher).then(res=>{
						if(res.code == 200) {
							this.list = this.list.concat(res.data.data)
							this.page = parseInt(res.data.current_page)+1
//							console.log(this.page)
							if(res.data.data.length<15){
								this.store = false
							}
						}
					})
				}else if(this.publisher==2){
					this.$http.get("/member/recruit?page="+this.page+"&publisher="+this.publisher).then(res=>{
						if(res.code == 200) {
							this.list = this.list.concat(res.data.data)
							this.page = parseInt(res.data.current_page+1)
//							console.log(this.list)
							this.tid = res.data.tid
							if(res.data.data.length<15){
								this.store = false
							}
						}
					})
				}
				
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
	.invite{
		background: #FAFAFA;
		padding-bottom: 1rem;
		box-sizing: border-box;
		position: relative;
	}
	.menu{
		span{
			display: block;
			width: 1.1rem;
			text-align: center;
			color: #FFFFFF;
		}
		.isShow{
			
		}
	}
	.tost{
		background: #000000;
		opacity: 0.5;
		width: 100%;
		height: 100%;
		z-index: 9;
		position: fixed;
		top: 0;
		left: 0;
	}
	.add{
		position: fixed;
		bottom: 0.9rem;
		left: 0;
		width: 100%;
		height: 1rem;
		background-color: #3388ff;
		border-radius: 0.1rem 0.1rem 0 0;
		text-align: center;
		line-height: 1rem;
		color: #FFFFFF;
		font-size: 0.32rem;
		letter-spacing: 0.03rem;
	}
	.pickList{
		position: relative;
	}
	.addList{
		height: 0rem;
		overflow: hidden;
		position: fixed;
		bottom: 1.9rem;
		left: 0;
		display: flex;
		width: 100%;
		transition: all .3s linear;
		z-index: 9;
		border-radius: 0.1rem 0.1rem 0 0;
		border-top: 0.01rem solid #E5E5E5;
	}
	.addList1{
		height: 1rem;
		overflow: hidden;
		position: fixed;
		bottom: 1.9rem;
		left: 0;
		display: flex;
		width: 100%;
		z-index: 9;
		transition: all .3s linear;
		border-radius: 0.1rem 0.1rem 0 0;
		border-top: 0.01rem solid #E5E5E5;
	}
	.zhaoRen{
		width: 50%;
		text-align: center;
		line-height: 1rem;
		color: #666;
		font-size: 0.32rem;
		background: #FFFFFF;
		letter-spacing: 0.02rem;
		border-right: 0.01rem solid #E5E5E5 ;
		
	}
	.zhaoTeam{
		width: 50%;
		text-align: center;
		line-height: 1rem;
		color: #666;
		font-size: 0.32rem;
		background: #FFFFFF;
		letter-spacing: 0.02rem;
	}
</style>