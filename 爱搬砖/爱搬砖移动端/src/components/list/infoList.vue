<template>
  <!--<ul class="list">
    <li v-for="item in clist">
      <router-link :to="`/details?type=${item.st?item.st:type}&id=${store?item.follow_id:item.id}`">
        <img v-if="item.avatar" :src="baseURL + item.avatar" alt="">
        <img v-else-if="item.img_path" :src="baseURL + item.img_path" alt="">
        <img v-else src="../../assets/none.png" alt="">
        <h3>{{item.title}}</h3>
        <p class="pay"><span>¥</span> {{item.pay}}</p>
        <p class="time"><i class="iconfont icon-shijian"></i>{{item.work_time || item.update_time}}</p>
        <p class="area">
          <span v-if="item.region.length>0"><i class="iconfont icon-landmark"></i>{{item.region[0].title}}</span>
          <span><i class="iconfont icon-zhiwei"></i>{{item.work_type}}</span>
        </p>
      </router-link>
    </li>
  </ul>-->
  <div class="li">
  	<router-link :to="!isRes?`/${type}/${list.id}`:`/${type}/${list.follow_id}`">
  		<div class="top">
  			<div class="top-title">
  				<p class="top-title-name" style="display: flex;" v-if="list.title || list.name || list.team_name">
  					<img v-if="list.nature==1 && !isIcon" src="../../assets/images/zhaoGeren.png"/>
  					<img v-if="list.nature==2 && !isIcon" src="../../assets/images/zhaoTeam.png"/>
  					<span style="display: inline-block;overflow: hidden;max-width:80%;white-space:nowrap;text-overflow:ellipsis;white-space: nowrap;">{{list.title || list.name || list.team_name}}</span>
  					<!--<i v-if="list.team_name">团队找-{{list.industry_type}}</i>-->
  					<span class="kong" v-if="list.current_state">{{list.current_state}}</span>
  				</p>
  				<p>
  					<span class="top-icon border-right" v-if="list.work_type || list.industry_type">{{list.work_type || list.industry_type}}</span>
  					<!--<span class="top-icon border-right" v-if="list.work_type.title">{{list.work_type.title}}</span>-->
  					<span class="top-icon border-left border-right" :style="list.avg_work_time?'border-right: 0.01rem solid #CCCCCC;padding-right: 0.1rem;':''" v-if="list.nums || list.nums==0">{{list.nums==0?'不限人数':list.nums+'人'}}</span>
  					<span class="top-icon border-left border-right" v-if="list.avg_work_time || list.avg_work_time==0">{{list.avg_work_time==0?'平均工龄:'+list.avg_work_time+'年':'不限工龄'}}</span>
  					<span class="top-icon border-left border-right" v-if="list.update_time">{{list.update_time}}</span>
  					<span class="top-icon border-left" v-if="list.work_time">{{list.work_time[0]?list.work_time[0]:list.work_time}}年</span>
  					
  				</p>
  			</div>
  			<div class="top-pay" v-if=" list.min_pay==0">面议</div>
  			<div class="top-pay" v-if="list.min_pay!=0 && list.quantity_unit">{{list.min_pay}}/{{list.quantity_unit}}</div>
  		</div>
  		<div class="user-intr">
  			<img v-if="list.avatar" :src="baseURL+list.avatar"/>
  			<img v-else src="../../assets/none.png" alt="">
  			<p class="user-name">{{list.publisher || list.name || list.team_name}}</p>
  			<p class="user-right">
  				<span v-if="list.region">{{list.region.map(value=>value.title).join('-')}}</span>
  				<!--<span>{{region}}</span>-->
  				<!--<span class="user-time" v-if="list.update_time">{{list.update_time}}</span>-->
  				<span class="user-time">{{list.hits?list.hits:'0'}}浏览</span>
  			</p>
  		</div>
  		<div class="clear"></div>
  	</router-link>
  </div>
</template>

<script>
  import { baseURL } from '@/axios'
  export default {
    name: "infoList",
    data (){
      return {
        baseURL: baseURL,
        re:[],
        str:'',
        cheng:'',
        shi:''
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
    watch: {
    	
    },
    created() {
//  	console.log(this.list)
//  	this.cheng = this.list.region[0]
    	
    },
    mounted() {
    	
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
    props: ['list','type','store','isIcon','isRes']
  }
</script>

<style scoped lang="less">
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
			position: relative;
			top: 0.05rem;
			height: 0.3rem;
			margin-right: 0.05rem;
			object-fit: cover;
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
  		object-fit: cover;
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