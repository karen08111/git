<template>
	<van-swipe-cell :right-width="liWidth">
		<div :class="list.is_show==1?'li':'lis'">
		  	<router-link :to="!isRes?`/${type}/${list.id}`:`/${type}/${list.follow_id}`">
		  		<div class="top">
		  			<div class="top-title">
		  				<p class="top-title-name">{{list.title || list.name || list.team_name}}
		  					<!--<i v-if="list.team_name">团队找-{{list.industry_type}}</i>-->
		  					<img v-if="list.nature==1 && !isIcon" src="../../../../assets/images/zhaoGeren.png"/>
		  					<img v-if="list.nature==2 && !isIcon" src="../../../../assets/images/zhaoTeam.png"/>
		  					<span class="kong" v-if="list.current_state">{{list.current_state}}</span>
		  				</p>
		  				<p>
		  					<!--<span class="top-icon border-right" v-if="list.work_type || list.industry_type">{{list.work_type || list.industry_type}}</span>-->
		  					<span class="top-icon border-right" v-if="list.work_type">{{list.work_type.title}}</span>
		  					<span class="top-icon border-left border-right" v-if="list.nums">{{list.nums}}人</span>
		  					<span class="top-icon border-left border-right" v-if="list.avg_work_time">平均工龄:{{list.avg_work_time}}年</span>
		  					<span class="top-icon border-left border-right" v-if="list.update_time">{{list.update_time}}</span>
		  					<span class="top-icon border-left" v-if="list.work_time">{{list.work_time[0]?list.work_time[0]:list.work_time}}年</span>
		  					
		  				</p>
		  			</div>
		  			<div class="top-pay" v-if=" list.min_pay==0">面议</div>
		  			<div class="top-pay" v-if="list.min_pay!=0 && list.quantity_unit">{{list.min_pay}}/{{list.quantity_unit}}</div>
		  		</div>
		  		<div class="user-intr">
		  			<!--<img v-if="list.avatar" :src="baseURL+list.avatar"/>
		  			<img v-else src="../../../../assets/none.png" alt="">-->
		  			<p class="user-name">{{list.publisher || list.name || list.team_name}}</p>
		  			<p class="user-right">
		  				<span v-if="list.region[0].title!=undefined && list.region[1].title!=undefined">{{list.region[0].title}}-{{list.region[1].title}}</span>
		  				<!--<span>{{region}}</span>-->
		  				<!--<span class="user-time" v-if="list.update_time">{{list.update_time}}</span>-->
		  				<span class="user-time">{{list.hits?list.hits:'0'}}浏览</span>
		  			</p>
		  		</div>
		  		<div class="clear"></div>
		  	</router-link>
		  	<!--滑动菜单-->
		  	<div class="menu" v-if="menu">
				<span class="isShow" @click="yin" v-if="list.is_show==1">隐藏</span>
				<span class="isShow" @click="show" v-else>显示</span>
				<span class="set" @click="bianji">编辑</span>
				<span class="del" @click="dels">删除</span>
			</div>
		</div>
		<div class="tost"></div>
	</van-swipe-cell>
</template>

<script>
import { baseURL } from '@/axios'
import { Toast } from 'vant';
import { Dialog } from 'vant';
  export default {
    name: "infoList",
    data (){
      return {
        baseURL: baseURL,
        re:[],
        str:'',
        cheng:'',
        shi:'',
        liWidth:Number,
        Toast:Toast,
        Dialog:Dialog, 
      }
    },
    methods: {
    	yin() {
    		var arr = this.list
    		this.$http.get("/member/recruit/"+this.list.id+"/setHide").then(res=>{
    			if(res.data == 1){
    				arr.is_show = 0
    				this.list = arr
    			}
    		})
    	},
    	show() {
    		//显示或者隐藏
    		var arr = this.list
    		this.$http.get("/member/recruit/"+this.list.id+"/setShow").then(res=>{
    			if(res.data == 1){
					arr.is_show = 1
					this.list = arr
    			}
    		})
    	},
    	bianji() {
//  		this.$router.push({path:'/inviteForm/'+this.list.id})
//			alert('还在写..')
			this.$router.push({path:'/inviteForm/'+this.list.nature,query:{id:this.list.id}})
    	},
    	dels() {
    		var that = this
    		this.$emit('isTost',true)
			this.$dialog.alert({
		      message: '是否删除本条信息',
		      showCancelButton:true,
		      overlay:true,
		    }).then(()=>{
		    	that.$http.get("/member/recruit/"+that.list.id+"/delete").then(res=>{
		    		if(res.code == 200){
		    			that.Toast(res.msg)
		    			setTimeout(function(){
		    				location.reload() ;
		    			},1000)
		    		}
		    	})
		    	that.$emit("isTost",false)
		    }).catch(() => {
			  // on cancel
			  that.$emit("isTost",false)
			});
    	}
    },
    computed: {
      clist (){
        let arr = []
        for(let i of this.list){
          if(i.min_pay === 0 && i.max_pay === 0){
            i['pay'] = '面议'
          }else{
            i['pay'] = `${i.min_pay}k-${i.max_pay}k`
          }
          arr.push(i)
        }
				//
				if(this.store){
					for(let j=0;j<this.list.length;j++){
						if(this.list[j].follow_type==1){
							this.list[j].st="read"
						}else if(this.list[j].follow_type==2){
							this.list[j].st="detail"
						}
					}
				}
				
        return arr
     },
     region() {
     		if(this.list.region[0].title!==undefined && this.list.region[1].title!==undefined ){
     			return this.list.region[0].title+'-'+this.list.region[1].title
     		}
     		
     }
    },
    created() {
//  	console.log(this.list)
//  	this.cheng = this.list.region[0]
    	
    },
    mounted() {
    	this.liWidth = parseInt(document.getElementsByClassName('menu')[0].offsetWidth)
    	
    },
//  props:{
//  	list:{
//  		type:Object,
//  		default:{
//  			region:[
//  				{id:1,title:''},{id:2,title:''}
//  			]
//  		}
//  	},
//  	type:{
//  		type:String
//  	},
//  	store:{
//  		type:Boolean
//  	},
//  	isIcon:{
//  		type:Boolean
//  	},
//  	isRes:{
//  		type:Boolean
//  	}
//  },
    props: ['list','type','store','isIcon','isRes','menu']
  }
</script>

<style scoped lang="less">
	.menu{
		height: 100%;
		width: 3.3rem;
		position: absolute;
		top: 0;
		left: 100%;
		display: flex;
		span{
			display: block;
			width: 1.1rem;
			color: #FFFFFF;
			height: 100%;
			letter-spacing: 0.03rem;
			align-items:center;
			display: -webkit-flex;
			justify-content:center; 
		}
		.isShow{
			background-color: #f09938;
		}
		.set{
			background: #ed752e;
		}
		.del {
			background: #ea4e3d;
		}
	}
	.clear{
	clear: both;
}
.kong{
	padding-left: 0.1rem;
	padding-right: 0.1rem;
	border: 0.01rem solid #3388FF;
	border-radius: 0.1rem;
	font-size: 0.16rem;
}
.border-right{
	border-right: 0.01rem solid #CCCCCC;
	padding-right: 0.1rem;
}
.border-left{
	padding-left: 0.1rem;
}
  .li{
  	margin-bottom: 0.1rem;
  	/*height: 2.12rem;*/
  	padding: 0.3rem;
  	box-sizing: border-box;
  	line-height: 0.45rem;
  	background: #FFFFFF;
  	position: relative;
  	a{
  		display: block;
  		width: 100%;
  		height: 100%;
  	}
  	.top{
  		display: flex;
  	}
  }
  .lis{
  	margin-bottom: 0.1rem;
  	opacity: 0.5;
  	/*height: 2.12rem;*/
  	padding: 0.3rem;
  	box-sizing: border-box;
  	line-height: 0.45rem;
  	background: #FFFFFF;
  	position: relative;
  	a{
  		display: block;
  		width: 100%;
  		height: 100%;
  	}
  	.top{
  		display: flex;
  	}
  }
  .top-title{
  	/*border-bottom: 0.01rem solid #CCCCCC;*/
  	width: 80%;
  }
  .top-title-name{
  	font-size: 0.28rem;
  	letter-spacing:0.03rem;
		color: #333333;
		img{
			/*width: 0.3rem;*/
			height: 0.3rem;
		}
  }
  .top-icon{
  	font-size: 0.22rem;
  	letter-spacing: 0.02rem;
  	color: #999999;
  }
  .top-pay{
  	width: 20%;
  	text-align: right;
  	font-size: 0.32rem;
  	color: #ff7856;
  	letter-spacing: 0.03rem;
  }
  .user-intr{
  	padding-top: 0.1rem;
  	box-sizing: border-box;
  	border-top: 0.01rem dashed #CCCCCC !important;
  	/*display: flex;*/
  	line-height: 0.5rem;
  	img{
  		float: left;
  		width: 0.3rem;
  		height: 0.3rem;
  		position: relative;
  		top: 0.08rem;
  		border-radius: 50%;
  	}
  	.user-name{
  		font-size: 0.24rem;
  		color: #999999;
  		font-size: 0.24rem;
  		float: left;
  		margin-left: 0.2rem;
  	}
  	.user-right{
  		float: right;
  		font-size: 0.2rem;
			color: #cccccc;
			text-align: right;
			.user-time{
				margin-right: 0.2rem;
				margin-left: 0.2rem;
			}
  	}
  }
</style>