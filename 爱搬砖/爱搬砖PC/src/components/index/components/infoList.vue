<template>
  <ul class="infoList">
    <li v-for="item in list" :title="item.title">
      <router-link :to="`${path}/${item.id}`">
        <div class="header">
          <b class="tag" v-if="item.nature" :class="item.nature == 1 && 'red' || item.nature == 2 && 'blue'">{{item.nature == 1 && '工' || item.nature == 2 && '团'}}</b>
          <span class="tit gao"><span>{{item.title}}</span>
            <!--<img v-if="item.nature==1" src="../../../assets/zhaoGeren.png" :onerror="$store.state.defaultImg" class="zhaoIco"/>
            <img v-if="item.nature==2" src="../../../assets/zhaoTeam.png" :onerror="$store.state.defaultImg" class="zhaoIco"/>-->
          </span>
        </div>
        <div class="num" v-if="!ispro">
          <span><b>{{item.work_type || item.industry_type}}</b></span>
          <span v-if="item.nums != null"><b v-if="item.nums != 0">{{item.nums}}人</b><b v-else>不限人数</b></span>
          <span v-if="item.nature"><b v-if="item.work_time">{{item.work_time}}年</b><b v-else>不限工龄</b></span>
          <span v-if="item.avg_work_time !== undefined"><b v-if="item.avg_work_time === 0">工龄未知</b><b v-else>{{item.avg_work_time}}年</b></span>
          <span v-if="item.work_time && !item.nature"><b>{{item.work_time}}年</b></span>
        </div>
        <div class="user">
          <img :src="$store.state.site+item.avatar" :onerror="defImg || $store.state.defaultImg" alt="">
          <span class="name">{{item.publisher || item.name || item.team_name}}</span>
          <span class="area" v-if="path!='/Project_details'">{{item.region.map(value => value.title).join('')}}</span>
          <span class="area" v-if="path=='/Project_details'">{{item.region.map(value => value.title).join('')}}</span>
        </div>
      </router-link>
    </li>
    <li class="empty"></li>
  </ul>
</template>

<script>
export default {
  name: 'infoList',
  props: ['list', 'path', 'ispro', 'defImg']
}
</script>

<style scoped lang="less">
/*.kuang{
	display: inline-block;
	position: relative;
	width: 50px;
	height: 18px;
	background-color: #ed702c;
	border-radius: 3px;
	color: #FFFFFF;
	text-align: center;
	line-height: 18px;
}
.kuang:before{
	content:"";
	position: absolute;
   right: 100%;
   top: 26px;
   width: 0;
   height: 0;
   border-top: 13px solid transparent;
   border-right: 26px solid red;
   border-bottom: 13px solid transparent;
}*/
.zhaoIco{
	width: 50px;
	min-width: 50px;
	height: 18px;
	min-height: 18px;
	position: relative;
	/*top: -10px;*/
}
.gao{
	padding-top: 10px;
	/*padding-right: 50px;*/
	box-sizing: border-box;
	display: flex;
	white-space: nowrap;
	span{
		overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	}
}
  .infoList{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0;
    overflow: hidden;
    li{
      width: 389px;
      height: 160px;
      background-color: #ffffff;
      border: solid 1px #eaeeed;
      margin-bottom: 10px;
      box-sizing: border-box;
      transition: all .4s;
      &.empty{
        height: 0 !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      &:hover{
        box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
        border-color: #3388ff;
      }
      a{
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        .header{
          margin-bottom: 15px;
          display: flex;
          align-items: flex-end;
          padding: 20px 20px 0;
          .tag{
            display: inline-block;
            width: 16px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 2px;
            font-weight: 400;
            font-size: 12px;
            color: #ffffff;
            margin-right: 5px;
            &.blue{
              background-color: #3388ff;
            }
            &.red{
              background-color: #ed702c;
            }
          }
          .tit{
            width: 200px;
            font-size: 16px;
            letter-spacing: 2px;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover{
              color: #3388ff;
            }
	        	img{
	        		/*width: 50px;
	        		height: 18px;*/
	        		margin-top: -10px;
	        		margin-left: 5px;
	        	}
          }
        }
        .num{
          font-size: 0;
          margin-bottom: 20px;
          display: flex;
          padding: 0 20px;
          span{
            font-size: 12px;
            letter-spacing: 1px;
            color: #333333;
            box-sizing: border-box;
            white-space: nowrap;
            b{
              display: inline-block;
              height: 22px;
              line-height: 22px;
              padding: 0 6px;
              font-weight: 400;
              &:hover{
                background-color: #f5f5f7;
              }
            }
            &:not(:last-of-type):after{
              content: '';
              display: inline-block;
              width: 1px;
              height: 14px;
              background-color: #999999;
              margin: 0 10px;
              transform: translateY(3px);
            }
          }
          .vertical{
            margin: 0 10px;
          }
        }
        .user{
          width: 100%;
          height: 70px;
          /*line-height: 70px;*/
          border-top: 1px dashed #cccccc;
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 0 20px;
          &:hover{
            background-color: #fafafb;
            .name{
              text-decoration: underline;
            }
          }
          img{
            width: 30px;
            height: 30px;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 9px;
          }
          span{
            display: inline-block;
            /*width: 305px;*/
            line-height: 70px;
            font-size: 16px;
            letter-spacing: 2px;
            color: #333333;
            white-space: nowrap;
          }
          .name{
            margin-right: auto;
          }
          .area{
            font-size: 12px;
            letter-spacing: 1px;
            color: #333333;
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>
