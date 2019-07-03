<template>
    <!--<div class="context">-->
        <div class="group" :style="fatherStyle">
            <span :style="fontStyle">{{titleName}}：</span>
            <el-select v-model="province" :placeholder="cityOne" :style="store">
                <el-option
                        v-for="item in provinces"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="city" :placeholder="cityTwo" :style="store">
                <el-option
                        v-for="item in citys"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="area" :placeholder="cityThree" :style="store">
                <el-option
                        v-for="item in areas"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                </el-option>
            </el-select>
        </div>
    <!--</div>-->
</template>

<script>
export default {
  name: 'City_linkage',
  props: {
    	provinces: {
    		type: Array
    	},
    	titleName: {
    		type: String
    	},
    	store: {
    		type: String
    	},
    	fontStyle: {
    		type: String
    	},
    	fatherStyle: {
    		type: String
    	},
    	cityOne: {
    		type: String,
    		default: '请输入省份'
    	},
    	cityTwo: {
    		type: String,
    		default: '请输入市'
    	},
    	cityThree: {
    		type: String,
    		default: '请输入区/县'
    	}

  },
  data () {
    return {
      //          provinces: [],
      citys: [],
      areas: [],
      province: null,
      city: null,
      area: null,
      cityObj: {}
    }
  },
  created () {
    //  	console.log(this.cityArray)
    //  	this.province=this.cityArray[0]
  },
  mounted () {

    //  	let index = this.provinces.findIndex((value)=>{
    //  		return value.id==this.cityArray[0]
    //  	})
    //  	this.province = this.provinces[index].id
  },
  methods: {

  },
  watch: {
    	province (val) {
      //  		this.$emit("pro",this.province)
    		// 发送请求市级
    		this.cityArray = []
    		this.citys = []
      this.areas = []
      this.city = ''
      this.area = ''
      this.cityObj.provice = val
    		this.$http.get(this.$store.state.site + '/common/getarea', { params: { id: val } }).then(res => {
        if (res.data.code == 200) {
          this.citys = res.data.data
          //                  console.log(this.citys)
          this.$emit('pro', val)
        }
      }).catch(res => {
        //              console.log(res)
      })
    	},
    	city (val) {
    		this.areas = []
      this.area = ''
      //  		this.$emit("ci",this.city)
      this.cityObj.city = val
      this.$emit('pro', this.cityObj)
    		this.$http.get(this.$store.state.site + '/common/getarea', { params: { id: val } }).then(res => {
        if (res.data.code == 200) {
          this.areas = res.data.data
          // 查找出该id的对应名字
          //                  console.log(this.citys,'1111');
          //                  let index = this.citys.findIndex((value,index)=>{
          //						return value.id===val
          //                  })
          //                  console.log(this.citys[index].title);
        }
      }).catch(res => {
        console.log(res)
      })
    	},
    	area (val) {
    		this.cityObj.areas = val
    		this.$emit('pro', this.cityObj)
      //			console.log(this.province,this.city,this.area)
    	}
  }
}
</script>

<style scoped lang="less">
    .width{
    	width: 27%!important;
    }
	.group span{
        display: inline-block;
        width: 90px;
        line-height: 34px;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 1px;
        color: #333333;
	}
</style>
