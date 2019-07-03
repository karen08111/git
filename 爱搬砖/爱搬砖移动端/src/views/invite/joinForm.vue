<template>
  <div class="joinForm">
    <inHeader></inHeader>
    <div class="join">
      <div class="line"></div>
      <p>
        <i></i>
        加入{{inviterName}}的工友团
        <i></i>
      </p>
      <div class="line"></div>
    </div>
    <div class="form">
      <h6>填写基本信息</h6>
      <input type="text" v-model="form.name" placeholder="请输真实姓名">
      <input type="text" v-model="sexTxt" placeholder="请选择性别" readonly @click="sexShow = true">
      <input type="text" v-model="form.birth" placeholder="请输真实年龄">
      <input type="text" v-model="workTxt" placeholder="请选择擅长工种" readonly @click="workShow = true">
      <input type="text" v-model="cityTxt" placeholder="请选择期望的工作区域" readonly @click="cityShow = true">
      <div class="id-card">
        <h5>请上传身份证图片<span>（要求：大小要求5M以内，清晰无遮挡）</span></h5>
        <div class="befor">
          <van-uploader :after-read="onRead1">
            <img v-if="form.img_head" :src="baseURL + form.img_head" alt="" class="uploaded">
            <div v-else class="addimg">
              <img src="../../assets/invite/upload.png" alt="" class="up-icon">
              <p>上传正面</p>
            </div>
          </van-uploader>
        </div>
        <div class="after">
          <van-uploader :after-read="onRead2">
            <img v-if="form.img_tail" :src="baseURL + form.img_tail" alt="" class="uploaded">
            <div v-else class="addimg">
              <img src="../../assets/invite/upload.png" alt="" class="up-icon">
              <p>上传正面</p>
            </div>
          </van-uploader>
        </div>
        <div class="btn" @click="submit">我要加入</div>
      </div>
    </div>
    <img src="../../assets/invite/footer.png" alt="" class="footer_img">
    <!--选择器们-->
    <div class="select">
      <van-picker
          v-show="sexShow"
          show-toolbar
          value-key="txt"
          :columns="sexs"
          @cancel="sexShow = false"
          @confirm="onConfirm1"/>
      <van-picker
          v-show="workShow"
          show-toolbar
          :columns="works"
          value-key="work_name"
          @cancel="workShow = false"
          @confirm="onConfirm2"
          @change="workChange" />
      <van-picker
          v-show="cityShow"
          show-toolbar
          :columns="citys"
          value-key="title"
          @cancel="cityShow = false"
          @confirm="onConfirm3"
          @change="cityChange" />
    </div>
  </div>
</template>

<script>
  import { Picker , Toast } from 'vant';
  import { baseURL } from '@/axios'

  export default {
    name: "joinForm",
    data() {
      return {
        baseURL: baseURL,
        form: {
          name: '',
          sex: '',
          birth: '',
          work_type: '',
          region: '',
          img_head: '',
          img_tail: '',
        },
        sexShow: false,
        sexs: [{id: 1, txt: '男'}, {id: 0, txt: '女'}],
        sexTxt: '',
        workShow: false,
        works: [],
        defWorks: [],
        workTxt: '',
        cityShow: false,
        citys: [],
        cityTxt: '',
        url: '/member/auth/upload'
      }
    },
    computed: {
      in_code (){
        return this.$store.state.inter_code
      },
      inviterName (){
        return this.$store.state.inter_name
      }
    },
    methods: {
      submit (){
        let obj = {...this.form}
        obj['code'] = this.in_code
        this.$http.post('/member/beInvited/save',obj).then(res => {
          if(res.code == 200){
            this.$store.commit('setInrerName', res.data.nick)
            this.$router.push({name: 'assistance', params: {count: 'first'}})
          }
        })
      },
      onConfirm1 (value, index){
        this.form.sex = value.id
        this.sexTxt = value.txt
        this.sexShow = false
      },
      workChange (picker, values){
        const val = picker.getValues()
        picker.setColumnValues(1, this.defWorks.find(value => value.work_name == val[0]).children);
      },
      onConfirm2 (value, index){
        this.form.work_type = value[1].id
        this.workTxt = value[1].work_name
        this.workShow = false
      },
      cityChange (picker, values){
        const val = picker.getValues()
        this.getCity(val[0].id).then(res => {
          picker.setColumnValues(1, res)
        })
      },
      onConfirm3 (value, index){
        this.form.region = value[1].id
        this.cityTxt = value.map(value => value.title).join('-')
        this.cityShow = false
      },
      async getCity(id){
        return await this.$http.get('/common/getarea',{params: {id: id}}).then(res => {
          if(res.code == 200){
            return res.data
          }
        })
      },
      onRead1(file) {
        const formData = new FormData()
        formData.append('file',file.file)
        this.$http.post(this.url,formData).then(res => {
          if(res.code === 200){
            this.form.img_head = res.data.path
          }else{
            Toast.fail(res.msg)
          }
        })
      },
      onRead2(file) {
        const formData = new FormData()
        formData.append('file',file.file)
        this.$http.post(this.url,formData).then(res => {
          if(res.code === 200){
            this.form.img_tail = res.data.path
          }else{
            Toast.fail(res.msg)
          }
        })
      }
    },
    created (){
      this.$http.get('/common/getworks').then(res => {
        if(res.code == 200){
          const data = res.data
          this.defWorks = data
          let arr = []
          arr.push({values: data.map(value => value.work_name)})
          arr.push({values: data[0].children})
          this.works = arr
        }
      })


      this.getCity().then(data => {
        let arr = []
        arr.push({values: data})
        this.getCity(data[0].id).then(res => {
          arr.push({values: res})
        })
        this.citys = arr
      })
    }
  }
</script>

<style scoped lang="less">
  .joinForm{
    .join{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.31rem 0;
      p{
        width: 3.54rem;
        height: 0.78rem;
        background-image: linear-gradient(92deg,
        #fae08a 0%,
        #ffc45a 100%),
        linear-gradient(
            #ffffff,
            #ffffff);
        box-shadow: 0rem 0.02rem 0.11rem 0rem
        rgba(187, 72, 2, 0.75);
        border-radius: 0.12rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.09rem;
        i{
          display: inline-block;
          width: 0.12rem;
          height: 0.12rem;
          background: url("../../assets/invite/push.png") no-repeat center / 100%;
          margin: 0 0.12rem;
        }
      }
      .line{
        height: 0.01rem;
        border: solid 0.01rem #ffffff;
        flex: 1 1 auto;
      }
    }
    .form{
      width: 6.51rem;
      background-color: #ffffff;
      border-radius: 0.21rem;
      padding-bottom: 0.78rem;
      padding-left: 0.3rem;
      padding-right: 0.34rem;
      box-sizing: border-box;
      margin: 0 auto 0.85rem;
      h6{
        font-family: PingFang-SC-Bold;
        font-size: 0.25rem;
        line-height: 0.81rem;
        letter-spacing: 0.01rem;
        color: #e12836;
        text-align: center;
      }
      input{
        display: block;
        width: 100%;
        height: 0.88rem;
        background-color: #eeeeee;
        border-radius: 0.1rem;
        text-indent: 0.16rem;
        font-size: 0.28rem;
        letter-spacing: 0.01rem;
        margin-bottom: 0.3rem;
        &::-webkit-input-placeholder{
          color: #b3b3b3;
        }
      }
      .btn{
        width: 100%;
        height: 0.88rem;
        line-height: 0.88rem;
        background-color: #f34250;
        border-radius: 0.1rem;
        font-size: 0.35rem;
        letter-spacing: 0.01rem;
        color: #fefefe;
        text-align: center;
        margin-top: 0.65rem;
      }
      .id-card{
        width: 5.85rem;
        height: 11.52rem;
        background-color: #eeeeee;
        border-radius: 0.1rem;
        overflow: hidden;
        padding: 0.24rem 0.23rem;
        box-sizing: border-box;
        h5{
          font-family: MicrosoftYaHei;
          font-size: 0.28rem;
          letter-spacing: 0.01rem;
          color: #b3b3b3;
          span{
            font-family: MicrosoftYaHei;
            font-size: 0.18rem;
            line-height: 0.14rem;
            color: #f34250;
          }
        }
        .befor, .after{
          display: flex;
          justify-content: center;
        }
        .uploaded{
          width: 3.55rem;
          height: 3.55rem;
          object-fit: contain;
          border-radius: 0.15rem;
          border: solid 0.02rem #bfbfbf;
          margin: 0.8rem auto 0;
        }
        .addimg{
          width: 3.55rem;
          height: 3.55rem;
          background-color: #e5e5e5;
          border-radius: 0.15rem;
          border: solid 0.02rem #bfbfbf;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          margin: 0.8rem auto 0;
          .up-icon{
            width: 1.64rem;
            height: 1.29rem;
          }
          p{
            font-family: MicrosoftYaHei;
            font-size: 0.5rem;
            letter-spacing: 0.01rem;
            color: #6f6f6f;
          }
        }
      }
    }
    .footer_img{
      width: 100%;
    }
    .select{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>