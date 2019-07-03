<template>
	<div class="main">
		<van-tabs v-model="active">
		  <van-tab title="我关注的信息">
		  		<infoList v-for="(p,index) in list.filter(value=>value.follow_type==1)" :key="p.id" isRes="true" :list="p" type="geren" ></infoList>
		  		<infoList v-for="(p,index) in list.filter(value=>value.follow_type==2)" :key="p.id" isRes="true" :list="p" type="team" ></infoList>
		  		<infoList v-for="(p,index) in list.filter(value=>value.follow_type==3)" :key="p.id" isRes="true" :list="p" type="information" ></infoList>
		  		<infoList v-for="(p,index) in list.filter(value=>value.follow_type==4)" :key="p.id" isRes="true" :list="p" type="projectDetail" ></infoList>
		  </van-tab>
		  
		  <van-tab title="我关注的会员">
		  	<!--<van-swipe-cell :right-width="50" v-for="(item,index) of renList" :key="index" @click="jumps(item.follow_id,item.dq_type)">
			  <van-cell-group>
			    <van-cell :title="item.name" :value="item.create_time" />
			  </van-cell-group>
			  <span slot="right" class="del" @click="onClose(item.follow_id)" >取关</span>
			</van-swipe-cell>-->
			<BigProject :list="lists" type="compayMain"></BigProject>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	export default{
		data() {
			return {
				baseURL:baseURL,
				active:0,
				guanList:[],
				renList:[],
				page:1,
				pages:1,
				list:[],
				lists:[],
				pageStore:true,
			}
		},
		computed: {
	      
	    },
		mounted() {
			//监听滚动条
			var that = this
			this.getXin()
			this.getUser()
			if(that.pageStore){
				window.addEventListener("scroll",function(){
				 	if(that.getScrollHeight() < that.getDocumentTop() + that.getWindowHeight()+1){
					 		if(that.active ==0){
								that.getXin()
							}else {
								
							}
				 	}
				 })
			}
			
		},
		methods: {
			getXin(){
				this.$http.get("/member/releaseFollowList?page="+this.page).then(res=>{
					if(res.code==200){
						this.page=parseInt(res.data.current_page)+1
						if(res.data.data.length>0){
							this.list = this.list.concat(res.data.data)
						}
						
					}
				})
			},
			getUser() {
				this.$http.get("/member/followList?page="+this.pages).then(res=>{
					if(res.code==200){
						this.pages=parseInt(res.data.current_page)+1
						if(res.data.data.length>0){
							this.lists = this.lists.concat(res.data.data)
						}
						
					}
				})
			},
			onClose(follow_id) {
//				console.log(follow_id)
		          this.$dialog.confirm({
		            message: '确定取消关注吗？'
		          }).then((e) => {
		          	this.$http.get('/member/offFollow/'+follow_id).then(res=>{
//		          		console.log(res)
		          		if(res.code == 200){
		          			this.$toast.fail(res.msg);
		          		}
		          		setTimeout(function(){
		          			location.reload() 
		          		},1500)
		          	})
//		            instance.close();
		          });
		    },
		    jumps(id,dq_type){
//		    	console.log(id)
		    	let type = '';
		    	if(dq_type==1){
		    		type = 'person'
		    	}else if(dq_type==2){
		    		type = 'groupe'
		    	}
		    	this.$router.push(`/homePage/${type}/${id}`)
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
			},
		}
	}
</script>

<style scoped lang="postcss">
	.main{
		/*padding: 0.25rem;*/
		padding-top: 0;
		box-sizing: border-box;
		background: #f2f2f2;
	}
	.del{
		display: block;
		height: 100%;
		background:#f54646 ;
		color: #FFFFFF;
		line-height: 0.9rem;
		text-align: center;
		width: 1rem;
	}
	.lists{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 0.2rem;
		box-sizing: border-box;
	}
	
</style>