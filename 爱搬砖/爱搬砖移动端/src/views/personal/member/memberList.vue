<template>
	<div class="member">
		<div class="member-title">
			<div class="name-list">
				<span class="bor-right">姓名</span>
				<span class="bor-right">手机号</span>
				<span class="">团队负责人</span>
			</div>
		</div>
		<userInfo v-for="(p,index) in userList" :list="p" @isTost="isTost" :tid="tid"></userInfo>
		<router-link class="add" :to="{path:'/memberForm',query:{tid:tid}}">添加成员</router-link>
		<div class="zhezhao" v-if="store"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userList:[],
				page:1,
				tid:'',
				liWidth:null,
				store:false,
			}
		},
		mounted() {
			this.getUser();
//			console.log(that.page)
			var that = this;
			window.addEventListener("scroll",function(){
				that.top= document.documentElement.scrollTop||document.body.scrollTop;
			 	if(that.getScrollHeight() < that.getDocumentTop() + that.getWindowHeight()+1 && that.page>1){
//			 		console.log(that.page)
			 		this.getUser();
			 	}
			 })
		},
		methods: {
			getUser() {
				this.$http.get("/member/teamMamber/odd?page="+this.page).then(res=>{
//					console.log(res.data.data)
					if(res.code == 200 ){
						this.userList = this.userList.concat(res.data.data);
						this.page = parseInt(res.data.current_page)+1;
						this.tid = res.data.tid
					}
				})
			},
			isTost(sto) {
				this.store = sto
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
	.member{
		padding-bottom: 2rem;
		box-sizing: border-box;
		background: #FAFAFA;
		.member-title{
			height: 0.96rem;
			/*display: flex;*/
			font-size: 0.28rem;
			color: #343434;
			padding-top: 0.34rem;
			box-sizing: border-box;
			border-bottom:0.01rem solid #e5e5e5;
			background-color: #ffffff;
		}
	}
	.zhezhao{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000000;
		opacity: 0.5;
	}
	.userList{
		display: flex;
		height: 1.27rem;
		background: #FFFFFF;
		line-height: 1.27rem;
		font-size: 0.24rem;
		color: #343434;
		letter-spacing: 0.01rem;
		margin-bottom: 0.1rem;
		position: relative;
		.span{
			display: inline-block;
			width: 33%;
			text-align: center;
		}
	}
	.bor-right{
		border-right: 0.01rem solid #e5e5e5;
		/*border-left: 0.01rem solid #e5e5e5;*/
		/*padding: 0 0.6rem 0 0.6rem;*/
		box-sizing: border-box;
	}
	.name-list{
		display: flex;
		width: 100%;
		height: 0.3rem;
		overflow: hidden;
		span{
			display: block;
			width: 33%;
			text-align: center;
		}
	}
	.add{
		display: block;
		position: fixed;
		bottom: 0.9rem;
		left: 0;
		text-align: center;
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		background-color: #3388ff;
		border-radius: 0.1rem 0.1rem 0 0;
		color: #FFFFFF;
		font-size: 0.32rem;
		letter-spacing: 0.03rem;
	}
	
</style>