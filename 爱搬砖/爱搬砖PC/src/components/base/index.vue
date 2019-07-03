<template>
  <div class="base">
    <Header></Header>
    <!--加入我们的福利-->
    <div class="headTop">
    	<img src="../../assets/baseHeader.jpg"/>
    </div>
    <div class="tabList">
    	<h1 class="header-title yanse">加入我们的福利</h1>
    	<div class="orders">
			   	<span class="line yanBg"></span>
			   	<span class="txt yanse">JOIN OUR WELFARE</span>
			   	<span class="line yanBg"></span>
			</div>
			<div class="pickMeList">
    		<div class="pickMe" v-for="(item,index) in pickList" :key="index">
          <div class="newsDiv">
            <img :src="item.bg"/>
          </div>
    			<p class="pickName">{{item.title}}</p>
    			<p class="pickIntr">{{item.intr}}</p>
    		</div>
    	</div>
    </div>

    <header>
    	<div class="triangle-down"></div>
    	<h1 class="header-title">我们的优势</h1>
    	<div class="orders">
			   	<span class="line"></span>
			   	<span class="txt">OUR STRENGTHS</span>
			   	<span class="line"></span>
			</div>
      <ul>
        <li v-for="(item,index) in links" :style="{background: `url('${item.bg}')`}">
          <router-link :to="item.path">
            <!--<i class="iconfont" :class="item.icon"></i>-->
            <!--<div class="hr"></div>-->
            <h3>{{item.title}}</h3>
            <p style="">{{item.text}}</p>
          </router-link>
        </li>
      </ul>
    </header>
    <!--轮播-->
    <div style="width: 100%;height:875px;position: relative;box-shadow: -6px 11px 5px 0px rgba(0, 0, 0, 0.35);padding-top: 200px;box-sizing: border-box;">
   		<div class="bgHeng"></div>
   		<!--<div class="bgRight"></div>-->
	    <div id="certify">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item,index) in banners" :key="index">
								<img :src="item.bg" />
<!--              @click="prew(index,item.bg)"-->
						</div>
					</div>
				</div>
				<div class="swiper-pagination"></div>
				<div class="swiper-button-prev" style="left: 107px;top: 215px;">
					<img src="../../assets/turnLeft.png"/>
				</div>
				<div class="swiper-button-next" style="top: 215px;right: 90px;">
					<img src="../../assets/turnRight.png"/>
				</div>
				<div class="zheLeft"></div>
				<div class="zheRight"></div>
			</div>
		</div>

    <div class="fill" style="height: 120px;"></div>
    <!--预览图片-->
    <el-dialog
	    :visible.sync="isShowImageDialog"
	    @closed="clearImg"
	  >
	    <el-carousel indicator-position="outside" height="600px">
	      <el-carousel-item v-for="src in imgs">
	        <img :src="src" style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;"/>
	      </el-carousel-item>
	    </el-carousel>
	  </el-dialog>
  	<!--我要入驻表单-->
  	<div class="meEnter">
  		<div class="meEnterTitle">
  			<img src="../../assets/meRu.png"/>
  		</div>
  		<div class="meEnterIco"><img src="../../assets/down.png"/></div>
  		<div class="meEnterForm">
  			<div class="form-title">
  				<img src="../../assets/formTitle.png"/>
  			</div>
  			<div class="formConten">
  				<div class="form-left" label-width="150px">
  					<el-form :model="experForm">
  						<city label="请选择:" :prov.sync="experForm.province"  :city.sync="experForm.region"></city>
  						<el-form-item label="企业类型:" style="display: flex;">
	            	<el-input v-model="experForm.enter_type" placeholder=""></el-input>
	          	</el-form-item>
  					</el-form>
  				</div>
  				<div class="form-right">
  					<p class="qita">其它信息</p>
  					<el-form :model="experForm">
  						<el-form-item label="您的名字:" style="display: flex; margin: 10px 0 0 0 ;">
	            	<el-input v-model="experForm.enter_name" placeholder=""></el-input>
	          	</el-form-item>
	          	<el-form-item label="您的号码:" style="display: flex; margin: 10px 0 0 0 ;">
	            	<el-input v-model="experForm.mobile" placeholder=""></el-input>
	          	</el-form-item>
	          	<el-form-item label="您的邮箱:" style="display: flex; margin: 10px 0 0 0 ;">
	            	<el-input v-model="experForm.mailbox" placeholder=""></el-input>
	          	</el-form-item>
	          	<div @click="send" class="send">发送</div>
  					</el-form>
  				</div>
  			</div>
  		</div>
  	</div>
  	<!--我能入驻吗-->
  	<div class="isRu?">
  		<h1 class="header-title yanse">我能入驻吗？</h1>
    	<div class="orders">
			   	<span class="line yanBg"></span>
			   	<span class="txt yanse">CAN I CHECK IN</span>
			   	<span class="line yanBg"></span>
			</div>
  		<div class="idRuBg">
  			<div class="texts">网络科技、电商、设计、建筑工程相关类公司最佳
依法登记、自主经营，且注册地及办公场所在孵化器场地
内的企业
新注册企业或申请进入孵化器前成立时间不到5年的企业
主营业务属《中国高新技术产品目录》范围，或符合枣庄
市产业发展方向
  			</div>
  		</div>
  	</div>
  	<!--合作方式-->
  	<div class="isRu">
  		<h1 class="header-title yanse">合作方式</h1>
    	<div class="orders">
			   	<span class="line yanBg"></span>
			   	<span class="txt yanse" style="text-transform: uppercase;">ways of cooperation</span>
			   	<span class="line yanBg"></span>
			</div>
			<div class="cooper">
				<div class="cooperJiao"></div>
				<div class="cooper-list">
					<!--小banner-->
					<div class="swiper-container newSwiper">
					  <div class="swiper-wrapper" >
					    <div class="swiper-slide sma" v-for="(item,index) in toBanner" :key="index">
					    	<img :src="item.bg" />
					    </div>
					  </div>
					</div>
					<!--轮播菜单-->
					<div class="swiper-button-prev swiper-button-prevas" style="left: -20px;margin-top: -43px;"></div>
    			<div class="swiper-button-next swiper-button-nextas" style="right: 50%;margin-top: -43px;margin-right: -52px;"></div><!--右箭头-->
    			<div class="swiper-pagination abz"></div>
					<!---->
					<div class="cooper-right">
						<h3 class="cooper-right-title">直租模式</h3>
						<h6 class="cooper-intr">With direct rent</h6>
						<div class="cooper-content" style="white-space: pre-wrap;">第1年免租金，次年起
0.5元/平米/天，公用水电
均摊，自用水电自付，
不享有入驻政策福利</div>
					</div>

					<div class="leftJ"></div>
					<div class="rightJ"></div>
				</div>
				<div class="cooper-list2">
					<div class="swiper-container newSwiper">
					  <div class="swiper-wrapper" >
					    <div class="swiper-slide sma" v-for="(item,index) in toBanner2" :key="index">
					    	<img :src="item.bg" />
					    </div>
					  </div>
					</div>
					<!--轮播菜单-->
					<div class="swiper-button-prev swiper-button-prevas" style="left: -20px;margin-top: -43px;"></div>
    			<div class="swiper-button-next swiper-button-nextas" style="right: 50%;margin-top: -43px;margin-right: -52px;"></div><!--右箭头-->
    			<div class="swiper-pagination abz"></div>
					<!---->
					<div class="cooper-right">
						<h3 class="cooper-right-title">孵化模式</h3>
						<h6 class="cooper-intr">Incubation mode</h6>
						<div class="cooper-content" style="padding: 0;width: 100%;">2年起签，注册在匠心小镇，
匠心小镇占股3%-5%，第1
年免租金，次年若企业盈利继
续免租金，若无则按0.3元/
平米/天收取，公用水电均摊，
自用水电自付，享有入驻
政策福利</div>
					</div>
					<div class="leftJ"></div>
					<div class="rightJ"></div>
				</div>
			</div>
  	</div>
  	<!--底部-->
  	<div style="width: 100%;height: 35px;background: #FFFFFF;"></div>
  	<div class="baseFooter">
  		<div class="baseContent">
  			<div class="base-left">
  					<div class="base-map">
  						<baidu-map class="map" :center="center" :zoom="17">
  							 <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
							      <bm-label content="杭州匠韵科技有限公司" :labelStyle="{color: '#195fbc', fontSize : '14px',border:'none'}" :offset="{width: -55, height: 30}"/>
							   </bm-marker>
  						</baidu-map>
  					</div>
  					<p class="mobiles"><i class="el-icon-phone"></i>  |  <a href="tel:166-5715-9171">166-5715-9171</a></p>
  					<p class="email"><i class="el-icon-message el-left"></i> |  <span>Email：moyunwangluo@163.com</span></p>
  					<p class="loca"><i class="el-icon-location-outline el-left"></i> |  <span>地址：杭州滨江、山东枣庄</span></p>
  			</div>
  			<div class="base-right">
  				<div class="base-er"><img src="../../assets/erwei.png"/></div>
  				<p>微信扫一扫</p>
  				<p>电商专家免费为您服务</p>
  			</div>
  		</div>
  	</div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import city from '../admin/components/form/city'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'index',
  components: { city, BMap },
  data () {
    return {
      	center: { lng: 120.200823, lat: 30.195219 },
      	experForm: {},
      	toBanner: [
  				{
      			bg: require('../../assets/ban2.png')
      		},
      		{
      			bg: require('../../assets/bann2.png')
      		}
      	],
      	toBanner2: [
  				{
      			bg: require('../../assets/two1.png')
      		},
      		{
      			bg: require('../../assets/two2.png')
      		}
      	],
      	pickList: [
      		{
      			bg: require('../../assets/pick1.png'),
      			title: '免除租金',
      			intr: 'EXEMPTION FROM RENT'
      		},
      		{
      			bg: require('../../assets/pick2.png'),
      			title: '海量订单',
      			intr: 'MASSIVE ORDERS'
      		},
      		{
      			bg: require('../../assets/pick3.png'),
      			title: '线上推广',
      			intr: 'ONLINE PROMOTION'
      		},
      		{
      			bg: require('../../assets/pick4.png'),
      			title: '技术及运营支持',
      			intr: 'TECHNICAL AND OPERATIONAL SUPPORT'
      		},
      		{
      			bg: require('../../assets/pick5.png'),
      			title: '资金支持',
      			intr: 'EFINANCIAL SUPPORT'
      		},
      		{
      			bg: require('../../assets/pick6.png'),
      			title: '项目合作',
      			intr: ' PROJECT COOPERATION'
      		},
      		{
      			bg: require('../../assets/pick7.png'),
      			title: '补税政策',
      			intr: 'TAX COMPENSATION POLICY'
      		},
      		{
      			bg: require('../../assets/pick8.png'),
      			title: '行政财税',
      			intr: 'ADMINISTRATIVE TAX'
      		}
      	],
      	banners: [
      		{
      			bg: require('../../assets/l1.png')
      		},
      		{
      			bg: require('../../assets/l2.png')
      		},
      		{
      			bg: require('../../assets/l3.png')
      		},
      		{
      			bg: require('../../assets/l4.png')
      		},
      		{
      			bg: require('../../assets/l5.png')
      		}

      	],
      	imgs: [],
      	isShowImageDialog: false,
      links: [
        {
          bg: require('../../assets/base_2.png'),
          path: '#',
          icon: 'icon-gongsiwangzhi',
          title: '优势资源',
          text: '匠心小镇平台为企业提供线上店铺，作为其线上经营阵地和展示门户。'
        },
        {
          bg: require('../../assets/base_1.png'),
          path: '#',
          icon: 'icon-lianjie',
          title: '链接全国',
          text: '匠心小镇平台致力于发展全球建筑业业务，与您一起服务全国。'
        },
        {
          bg: require('../../assets/base_3.png'),
          path: '#',
          icon: 'icon-pinpai',
          title: '强烈扶持',
          text: '匠心小镇平台拥有众多优质商家入驻，与您携手共筑知名品牌。'
        },
        {
          bg: require('../../assets/base_4.png'),
          path: '#',
          icon: 'icon-yunyingzhongxintianchong',
          title: '专业团队',
          text: '匠心小镇平台为入驻商家提供线上平台的营销培训、技术支持、运营方法。'
        }
      ],
      offline: [
        {
          icon: require('../../assets/base_icon1.png'),
          txt: '免除租金',
          path: '#'
        },
        {
          icon: require('../../assets/base_icon2.png'),
          txt: '资金支持',
          path: '#'
        },
        {
          icon: require('../../assets/base_icon3.png'),
          txt: '办公空间',
          path: '#'
        },
        {
          icon: require('../../assets/base_icon4.png'),
          txt: '行政财税',
          path: '#'
        },
        {
          icon: require('../../assets/base_icon5.png'),
          txt: '海量订单',
          path: '#'
        },
        {
          icon: require('../../assets/base_icon6.png'),
          txt: '用品齐全',
          path: '#'
        }
      ],
      name: '',
      mobile: '',
      job: ''
    }
  },
  mounted () {
			  this.bigBanner()
			  this.smallBannerOne()
			  this.smallBannerTwo()
  },
  methods: {
    	send () {
    		this.$http.post('/member/newEnter', this.experForm).then(res => {
    			if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.experForm = {}
        }
    		})
    	},
    submit () {
      let formData = new FormData()
      formData.append('enter_name', this.name)
      formData.append('mobile', this.mobile)
      formData.append('enter_type', this.job)

      this.$http.post('/member/appEnter', formData).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.name = ''
          this.mobile = ''
          this.job = ''
        }
      })
    },
    clearImg () {
	      this.imgs = []
	    },
	    prew (index, img) {
	    	this.isShowImageDialog = true
	    	this.imgs.push(img)
	    },
	    bigBanner () {
	    	var mySwiper = new Swiper('#certify .swiper-container', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          progress (progress) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i)
              var slideProgress = this.slides[i].progress
              var modify = 1
              if (Math.abs(slideProgress) > 1) {
                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1
              }
              var translate = slideProgress * modify * 260 + 'px'
              var scale = 1 - Math.abs(slideProgress) / 5
              var zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
              slide.transform('translateX(' + translate + ') scale(' + scale + ')')
              slide.css('zIndex', zIndex)
              slide.css('opacity', 1)
              if (Math.abs(slideProgress) > 3) {
                slide.css('opacity', 0)
              }
            }
          },
          setTransition (transition) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i)
              slide.transition(transition)
            }
          }
        }
			  })
	    },
	    smallBannerOne () {
	    	 var mySwiper2 = new Swiper('.cooper-list .swiper-container', {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
				    el: '.cooper-list .swiper-pagination',
				    renderBullet: function (index, className) {
		          return '<div class="' + className + '" style="width:18px;height:18px;background-color: #357bd7;box-shadow: inset 0px 2px 5px 0px rgba(3, 0, 0, 0.52);border-radius:50%;margin-left:10px"></div>'
		        }
				  },
				  navigation: {
			      nextEl: '.cooper-list .swiper-button-next',
			      prevEl: '.cooper-list .swiper-button-prev'
			    }
      })
	    },
	    smallBannerTwo () {
	    	var mySwiper3 = new Swiper('.cooper-list2 .swiper-container', {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
				    el: '.cooper-list2 .swiper-pagination',
				    renderBullet: function (index, className) {
		          return '<div class="' + className + '" style="width:18px;height:18px;background-color: #357bd7;box-shadow: inset 0px 2px 5px 0px rgba(3, 0, 0, 0.52);border-radius:50%;margin-left:10px"></div>'
		        }
				  },
				  navigation: {
			      nextEl: '.cooper-list2 .swiper-button-next',
			      prevEl: '.cooper-list2 .swiper-button-prev'
			    }
      })
	    }
  },
  created () {
    document.title = '入驻基地'
    this.$cookies.set('navIdx', 6, '0')
    this.$store.commit('changeSearchIdx', '/base')
  }
}
</script>

<style scoped lang="less">
	.meEnterIco {
		width: 31px;
		height: 25px;
		margin:45px auto 0;
		img {
			width: 31px;
			height: 25px;
		}
	}
	.map {
		width: 100%;
		height: 100%;
	}
	.send {
		width: 102px;
		height: 34px;
		background-image: linear-gradient(
			#2e4ba7,
			#2e4ba7),
		linear-gradient(
			#d77d23,
			#d77d23);
		background-blend-mode: normal,
			normal;
			float: right;
			text-align: center;
			line-height: 34px;
			color: #FFFFFF;
			font-size: 20px;
			font-family: MicrosoftYaHei;
			border-radius: 10px;
			margin-right: 15px;
	}
	.meEnterForm {
		width: 983px;
		height: 437px;
		margin:60px auto 0;
		background: url(../../assets/form.png);
		background-position: center center;
		background-size: cover;
		border: solid 1px #acaaa7;
		border-radius: 10px;
		padding: 35px;
		box-sizing: border-box;
		.form-title {
			width: 100%;
			text-align: center;
		}
		.form-left {
			/*display: flex;*/
			width: 50%;
		}
	}
.formConten {
	display: flex;
	margin-top: 20px;
}
.form-right {
	width: 50%;
	.qita{
		border-bottom: 1px solid #b5b5b5;
		width: 100%;
		font-size: 27px;
		line-height: 28px;
		color: #000000;
		padding: 0 0 10px 0;
		box-sizing: border-box;
	}
}

.base-right {
	text-align: center;
	font-size: 16px;
	color: #FFFFFF;
	.base-er {
		img {
			width: 186px;
			height: 186px;
		}
	}
	p{
		line-height: 30px;
	}
}

.el-icon-phone {
	color: #9c9da4;
}
.el-icon-phone::before {
	font-size: 48px;
}
.el-icon-message::before {
	font-size: 16px;
}
.el-icon-location-outline::before {
	font-size: 16px;
}
.el-left {
	margin-right: 25px;
	margin-left: 20px;
}
.mobiles {
	font-size: 48px;
	color: #9c9da4;
	margin-top: 60px;
}
.email {
	font-size: 16px;
	color: #9c9da4;
	margin-top: 25px;
	span{
		font-size: 16px;
		color: #FFFFFF;
		margin-left: 10px;
		line-height: 40px;
	}
}
.loca {
	font-size: 16px;
	color: #9c9da4;
	span{
		font-size: 16px;
		color: #FFFFFF;
		margin-left: 10px;
		line-height: 40px;
	}
}
.mobiles a{
 font-size: 48px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 36px;
	letter-spacing: 0px;
	color: #ffffff;
	margin-left: 10px;
}
	/*底部*/
  @media screen and (max-width: 1366px) and (max-width: 1280px) and (max-width: 1024px) and (max-width: 1100px) and (max-width: 1440px){
    .baseFooter {
      height: 365px!important;
      width: 100%;
      background: url(../../assets/baseFooter.png) no-repeat;
      background-size: cover;
      background-position: center center;
      .baseContent {
        width: 900px!important;
        padding-top: 30px!important;
        box-sizing: border-box;
        margin: auto;
        display: flex;
        justify-content: space-between;
        .base-left {
          width: 60%;
          .base-map{
            width: 300px!important;
            height: 150px!important;
            background: #FFFFFF;
            overflow: hidden;
          }
        }
      }
    }
    .base-right {
      text-align: center;
      font-size: 16px;
      color: #FFFFFF;
      .base-er {
        img {
          width: 100px;
          height: 100px;
        }
      }
      p{
        line-height: 30px;
      }
    }
    .mobiles {
      font-size: 45px!important;
      color: #9c9da4;
      margin-top: 30px;
    }
    .email {
      font-size: 16px;
      color: #9c9da4;
      margin-top: 12px;
      span{
        font-size: 16px;
        color: #FFFFFF;
        margin-left: 10px;
        line-height: 30px;
      }
    }
    .loca {
      font-size: 16px;
      color: #9c9da4;
      span{
        font-size: 16px;
        color: #FFFFFF;
        margin-left: 10px;
        line-height: 20px;
      }
    }
    .el-icon-phone::before {
      font-size: 35px!important;
      margin-left: 10px;
      margin-right: 5px;
    }
    .mobiles a{
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 36px;
      letter-spacing: 0px;
      color: #ffffff;
      margin-left: 10px;
    }
  }
	.baseFooter {
		height: 730px;
		width: 100%;
		background: url(../../assets/baseFooter.png) no-repeat;
		background-size: cover;
		background-position: center center;
		.baseContent {
			width: 1200px;
			padding-top: 100px;
			box-sizing: border-box;
			margin: auto;
			display: flex;
			justify-content: space-between;
			.base-left {
				width: 60%;
				.base-map{
					width: 480px;
					height: 300px;
					background: #FFFFFF;
					overflow: hidden;
				}
			}
		}
	}

.cooper-list2 {
				width: 894px;
				height: 428px;
				position: relative;
				background: #FFFFFF;
				margin: auto;
				margin-bottom: 40px;
				display: flex;
				.leftJ {
					width:0;
			    height:0;
			    border-width:100px 50px 100px 0;
			    border-style:solid;
			    border-color:transparent #ffffff transparent transparent;
			    position:absolute;
			    left: -30px;
			    top: 100px;
				}
				.rightJ {
					width:0;
			    height:0;
			    border-width:100px 0 100px 50px;
			    border-style:solid;
			    border-color:transparent transparent transparent #ffffff;/*透明 透明 透明 灰*/
			    position:absolute;
			    right: -30px;
			    top: 100px;
				}
				.newSwiper {
					width: 430px;
					height: 350px;
					position: relative;
					right: 15px;
				}

			}
.sma img {
	width: 431px!important;
	height: 352px!important;
  border: none!important;
}
.swiper-button-prevas {
	background: url(../../assets/smallLft.png) !important;
	height: 60px!important;
	z-index: 9;
}
.swiper-button-nextas {
	background: url(../../assets/smallLft.png) !important;
	height: 60px!important;
	transform: rotate(180deg);
	z-index: 9;
}
.swiper-pagination-bullets {
	width:430px;
	position: absolute;
	bottom: 10px;
	display: flex;
	justify-content: center;
	margin-left: 25px;
	/*.swiper-pagination-bullet {
		display: block;
		width: 18px!important;
		height: 18px!important;
	}*/

}
.abzActive,.swiper-pagination-bullet {
		width: 18px!important;
		height: 18px!important;
		display: block!important;
		background-color: #357bd7;
		box-shadow: inset 0px 2px 5px 0px
			rgba(3, 0, 0, 0.52);
	}
.cooper-right {
	width: 380px;
	padding: 33px 25px 0 0;
	box-sizing: border-box;
	.cooper-right-title {
		font-size: 35px;
		font-weight: bold;
		letter-spacing: 1px;
		color: #195fbc;
		text-align: center;
	}
	.cooper-intr {
		font-size: 16px;
		color: #438ff2;
		line-height: 50px;
		text-align: center;
		border-bottom: 2px solid #438ff2;
	}
	.cooper-content {
		font-size: 25px;
		letter-spacing: 3px;
		color: #494949;
		line-height: 40px;
		margin: auto;
		width: 290px;
		padding: 5px;
		box-sizing: border-box;
	}
}
/*合作方式*/
		.cooper {
			width: 100%;
			height: 980px;
			background: #dfeeff;
			margin-top: 50px;
			position: relative;
			.cooperJiao {
					display: block;
				  width:0;
			    height:0;
			    border-width:0 100px 46px;
			    border-style:solid;
			    border-color:transparent transparent #dfeeff;/*透明 透明  灰*/
			    margin:0px auto;
			    position:relative;
			    top: -40px;

			}
			.cooper-list {
				width: 894px;
				height: 428px;
				position: relative;
				background: #FFFFFF;
				margin: auto;
				margin-bottom: 40px;
				display: flex;
				.leftJ {
					width:0;
			    height:0;
			    border-width:100px 50px 100px 0;
			    border-style:solid;
			    border-color:transparent #ffffff transparent transparent;
			    position:absolute;
			    left: -30px;
			    top: 100px;
				}
				.rightJ {
					width:0;
			    height:0;
			    border-width:100px 0 100px 50px;
			    border-style:solid;
			    border-color:transparent transparent transparent #ffffff;/*透明 透明 透明 灰*/
			    position:absolute;
			    right: -30px;
			    top: 100px;
				}
				.newSwiper {
					width: 430px;
					height: 350px;
					position: relative;
					right: 15px;
				}

			}
		}
		.idRuBg {
			background: url(../../assets/isRu2.png) no-repeat;
			background-position:center center;
			background-size: cover;
			width: 100%;
			height: 598px;
			margin-top: 30px;
			margin-bottom: 70px;
			.texts {
				white-space: pre-wrap;
				font-size: 36px;
				color: #FFFFFF;
				line-height: 72px;
				width: 1200px;
				margin: auto;
				padding-top: 80px;
				padding-left: 120px;
				box-sizing: border-box;
				font-family: 'AdobeHeitiStd-Regular';
				letter-spacing: 1px;
			}
		}
		.hao1 {
			img{
				position: relative;
				transform: rotate(180deg);
				top:-30px;
				right: 35px;
			}
		}
		.hao {
			img{
				position: relative;
				top: -30px;
				left: 10px;
			}
		}
/*表单*/
	.meEnter {
		width: 100%;
		height: 780px;
		.meEnterTitle {
			font-size: ;
			width: 265px;
			height: 72px;
			margin: 0 auto 0;
			img {
				width: 265px;
				height: 72px;
			}
		}
		.meEnterIco {

		}
	}

	.pickMeList {
		display: flex;
		flex-wrap: wrap;
		width: 933px;
		justify-content: space-between;
		margin: 20px auto 0;
		text-align: center;
		.pickMe {
			width: 25%;
			margin-top:50px;
			img {
				border-radius: 50%;
				width: 176px;
				height: 176px;
			}
			.pickName {
				color: #4072f3;
				font-size: 25px;
				letter-spacing: 1px;
				font-weight: 600;
				margin-bottom: 10px;
				margin-top: 10px;
			}
			.pickIntr {
				color: #4072f3;
				font-size: 16px;
				font-weight: 500;
			}

		}
	}

	.headTop {
		width: 100%;
		height: 1080px;
		img {
			width: 100%;
			height: 1080px;
		}
	}
	.tabList {
		width: 100%;
		height: 875px;
		background-color: #ffffff;
		box-shadow: -6px 11px 5px 0px
			rgba(0, 0, 0, 0.35);
		margin-bottom: 40px;
		padding-top: 50px;
		box-sizing: border-box;
	}
	.orders {
			   height: 60px;
			   /*line-height: 60px;*/
			   text-align: center;
			   padding: 0;
			}
			 .orders .line {
			   display: inline-block;
			   width: 116px;
			   border-top: 3px solid #ccc ;
			}
			.orders .txt {
			   color: #FFFFFF;
			   vertical-align: middle;
			   font-size: 43px;
			   letter-spacing: 2px;
			   line-height: 80px;
			}
	.bgHeng {
		height: 6px;
		/*background-color: #cce4fe;*/
		/*background: linear-gradient(to right,#cce4fe,#fff);*/
		background: radial-gradient(#cce4fe 5%, #fff 80%);
		position: absolute;
		top: 50%;
		width: 100%;
		margin-top: -20px;
	}
	.bgRight {
		height: 6px;
		background-color: #cce4fe;
		background: linear-gradient(to left,#cce4fe,#fff);
		position: absolute;
		top: 50%;
		right: 0;
		width: 30%;
		margin-top: -20px;
	}
	.triangle-down {
		width: 0;
    height: 0;
    border-left: 38px solid transparent;
    border-right: 38px solid transparent;
    border-top: 69px solid #FFFFFF;
    position: absolute;
    left: 20%;
	}
	.yanse{
		color: #456bcd!important;
	}
	.yanBg {
		border-top: 3px solid #456bcd!important;
	}
#certify {
	position: relative;
	.zheLeft {
		width: 340px;
		height: 500px;
		background: #FFFFFF;
		opacity: 0.3;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}
	.zheRight {
		width: 267px;
		height: 500px;
		background: #FFFFFF;
		opacity: 0.3;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 10;
	}
}
.swiper-container {
    width: 1200px;
    height: 500px;
    margin: auto;
    padding: 0;
}
.swiper-button-prev {
	/*top: 215px;*/
	z-index: 11;
	/*left: 107px;*/
	border: none!important;
	outline:none!important;
	img {
		border: none!important;
		outline:none!important;
		border:0px!important;
	}
}
.swiper-slide img {
	width: 587px;
	height: 443px;

}
.swiper-slide-active img{
	border: solid 3px #191919;
}
.swiper-button-next {
	z-index: 11;
	border: none!important;
	outline:none!important;
	img {
		border: none!important;
		outline:none!important;
		border:0px!important;
	}
}
  .base{
    h1{
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 3px;
      color: #333333;
      text-align: center;
    }
    .introduce{
      width: 1200px;
      margin: 0 auto 98px;
      font-size: 20px;
      line-height: 36px;
      letter-spacing: 1.4px;
      color: #797979;
      margin-bottom: 80px;
    }
    header{
      width: 100%;
      height: 670px;
      background-image: linear-gradient(
				#2e3142,
				#2e3142),
			linear-gradient(
				#313131,
				#313131);
			background-blend-mode: normal,
				normal;
      /*background: #f3f7fa url("../../assets/base_banner.png") no-repeat top center / 100% auto;*/
      position: relative;
      .header-title {
      	color: #FFFFFF;
      	font-size: 60px;
      	letter-spacing: 5px;
      	line-height: 80px;
      	padding-top: 20px;
      	box-sizing: border-box;
      }
      ul{
        width: 1216px;
       	margin:35px auto 0;
        display: flex;
        justify-content: space-between;
        li{
          width:223px;
          height: 336px;
          background-color: #000000;
          a{
            display: block;
            width: 100%;
            height: 100%;
            background-color: #000000;
            opacity: 0.7;
            padding-top: 50px;
            text-align: center;
            box-sizing: border-box;
            transition: all .4s;
            &:hover{
              background-color: #277ec0;
              opacity: 0.9;
              /*padding-top: 71px;*/
              p{
                /*display: block;*/
                margin-top: 0;
                opacity: 1;
              }
            }
            i{
              font-size: 46px !important;
              color: #fff;
            }
            .hr{
              width: 18px;
              height: 2px;
              background-color: #ffffff;
              border-radius: 1px;
              margin: 22px auto 20px;
            }
            h3{
              font-size: 22px;
              letter-spacing: 2px;
              color: #ffffff;
              margin-bottom: 30px;
            }
            p{
              margin-top: 100%;
              font-size: 16px;
              opacity: 0;
              line-height: 28px;
              letter-spacing: 2px;
              color: #ffffff;
              padding-left: 23px;
              padding-right: 30px;
              text-align: left;
              display: block;
              transition: all .3s linear;

            }
          }
        }
      }
    }
    .offline{
      width: 100%;
      padding: 89px 0 61px;
      box-sizing: border-box;
      overflow: hidden;
      ul{
        display: flex;
        justify-content: space-between;
        width: 1200px;
        margin: 0 auto;
        li{
          flex: 0 0 33.333%;
          /*width: 186px;*/
          height: 284px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .icon{
            width: 186px;
            height: 164px;
          }
          a{
            display: block;
            width: 120px;
            height: 40px;
            background-color: #ffffff;
            border-radius: 10px;
            border: solid 1px #797979;
            box-sizing: border-box;
            font-size: 18px;
            line-height: 36px;
            letter-spacing: 2px;
            color: #797979;
            text-align: center;
            &:hover{
              border-color: #3388ff;
              color: #3388ff;
            }
          }
        }
      }
    }
    .order{
      padding: 87px 0 60px;
      ul{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        li{
          width: 280px;
          /*height: 344px;*/
          img{
            width: 280px;
            height: 321px;
            margin-bottom: 40px;
            object-fit: cover;
            object-position: top;
          }
          h3{
            font-size: 22px;
            letter-spacing: 2px;
            color: #333333;
            text-align: center;
            margin-bottom: 18px;
            span{
              font-size: 14px;
              letter-spacing: 1px;
              color: #3388ff;
            }
          }
          .comname{
            letter-spacing: 1px;
            color: #999999;
            text-align: center;
            margin-bottom: 12px;
          }
          p{
            line-height: 24px;
            letter-spacing: 1px;
            color: #999999;
          }
        }
        .seg{
          width: 1px;
          height: 120px;
          background-color: #cccccc;
          margin-top: 406px;
        }
      }
    }
    .form{
      width: 100%;
      height: 120px;
      background: url("../../assets/base_bg.png") no-repeat center / 100% 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .input{
        width: 240px;
        height: 48px;
        background-color: #ffffff;
        border-radius: 24px;
        border: solid 1px #fbfba7;
        overflow: hidden;
        font-size: 0;
        margin-right: 100px;
        display: flex;
        .label{
          display: inline-block;
          padding: 0 16px;
          background-color: #ffeb3f;
          height: 100%;
          line-height: 48px;
          font-size: 18px;
          letter-spacing: 2px;
          color: #34495e;
          box-sizing: border-box;
        }
        input{
          flex: auto;
          height: 51px;
          border: none;
          padding: 0 10px;
          box-sizing: border-box;
        }
      }
      button{
        width: 150px;
        height: 44px;
        background-color: #ff9416;
        border-radius: 22px;
        border: none;
        font-size: 22px;
        letter-spacing: 2px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
  .newsDiv {
    width: 176px;
    height: 176px;
    background: #456bcd;
    border-radius: 50%;
    transform: scale(1);
    transition: all 1s ease 0s;

  }
  .newsDiv img{
    transition: all .5s linear;

  }
  .newsDiv:hover {
    background: #5aaef1;
    cursor: pointer;
    img {
      transform: scale(1.3);
      transition: all 1s ease 0s;
    }
  }

</style>
