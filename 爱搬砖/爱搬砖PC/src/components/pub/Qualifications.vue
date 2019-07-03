<template>
  <div class="item">
    <span style="width: 104px; display: inline-block;">资质证书：</span>
    <div class="certificate" v-for="i in list">

      <div class="group"><span>证书名称：</span><input type="text" v-model="i.name" readonly></div>
      <div class="group"><span style="vertical-align: top;">证书图片：</span>
        <div class="beset"><img :src="$store.state.site+i.img" height="128" :onerror="$store.state.defaultImg"></div>
      </div>

    </div>
    <button type="button" class="add" v-show="!addshow" @click="addshow = true"><i class="el-icon-plus"></i>添加资质证书
    </button>
    <div class="addbox" v-show="addshow">
      <div class="group"><span>证书名称：</span><input type="text" placeholder="请正确输入证书名称" v-model="name"></div>
      <div class="group">
        <span style="vertical-align: top;">证书图片：</span>
        <div class="beset">
          <el-upload
              ref="cerup"
              class="upload"
              :action="this.$store.state.site+'/member/upload/photos'"
              :with-credentials="true"
              :headers="upToken"
              list-type="picture-card"
              accept="image/jpeg, image.png"
              :limit="1"
              :on-success="picFnRes2"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
            <i :id="el" class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog>
          <button type="button" class="upbtn" @click="addcer" v-show="btnshow">点击上传</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import upToken from '@/utils/upToken'

export default {
  name: 'Qualifications',
  data () {
    return {
      upToken: upToken,
      dialogImageUrl: '',
      dialogVisible: false,
      addshow: false,
      btnshow: false,
      name: this.cername,
      img: this.cerimg,
      id: this.cerid,
      list: this.cerlist,
      seniority: this.senioritys,
      el: this.elname
    }
  },
  methods: {
    addcer () {
      if (this.name == '') {
        this.$message.error('请输入证书名称')
        return
      }
      document.getElementById(this.el).parentNode.style.display = 'block'
      this.addshow = false
      this.$refs.cerup.clearFiles()
      let senioritysLi = new FormData()
      senioritysLi.append('seniority_name', this.name)
      senioritysLi.append('img_path', this.img)
      senioritysLi.append('_method', 'put')
      // 资质证书
      this.$http.post(this.$store.state.site + '/member/seniority', senioritysLi, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.code == 200) {
          this.cerlist.push({ id: res.data.data.id, name: this.name, img: this.img })

          this.senioritys.push(res.data.data.id)

          this.id = ''
          this.name = ''
          this.img = ''
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(error => {
      })
    },
    handleRemove (file, fileList) {
      this.btnshow = false
      document.getElementById(this.el).parentNode.style.display = 'block'
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    picFnRes2 (response, file, fileList) {
      if (response.code == 200) {
        document.getElementById(this.el).parentNode.style.display = 'none'
        this.btnshow = true
        this.id = response.data.id
        this.img = response.data.path
        // this.Technical.fileList2 = fileList;
        if (fileList.length == 9) {
          document.getElementsByClassName('el-upload--picture-card')[1].style.display = 'none'
        }
      } else {
        this.$message.error(response.msg)
      }
    }
  },
  props: ['cername', 'cerimg', 'cerid', 'cerlist', 'senioritys', 'elname']
}
</script>

<style scoped lang="less">
  .item {
    width: 100%;
    margin-bottom: 30px;
    .certificate {
      margin-bottom: 42px;
    }
    .group {
      text-align: center;
      &:not(:last-of-type) {
        margin-bottom: 20px;
      }
      span {
        display: inline-block;
        width: 150px;
        margin-right: 30px;
        text-align: right;
        font-size: 16px;
        letter-spacing: 2px;
      }
      input {
        width: 250px;
        height: 40px;
        background-color: #ffffff;
        border-radius: 10px;
        border: solid 1px #999999;
        padding-left: 20px;
        box-sizing: border-box;
        font-size: 13px;
        letter-spacing: 1px;
        &::-webkit-input-placeholder {
          color: #999999;
        }
      }
      .upload {
        display: inline-block;
        margin-right: 20px;
      }
      .beset {
        display: inline-block;
        width: 250px;
        text-align: left;
        .upbtn {
          display: block;
          width: 139px;
          height: 50px;
          background-image: linear-gradient(0deg, #ededed 0%, #fafafa 51%, #fbfbfb 100%),
          linear-gradient(#2de5a4, #2de5a4);
          background-blend-mode: normal, normal;
          box-shadow: inset 0px 3px 0px 0px #ffffff;
          border: solid 1px #bfbfbf;
          font-family: FZLTXHK--GBK1-0;
          font-size: 20px;
          letter-spacing: 1px;
          color: #333333;
          margin-top: 29px;
          cursor: pointer;
        }
      }
    }
    .btn {
      display: block;
      margin: 50px auto 0;
      width: 160px;
      height: 40px;
      background-color: #3388ff;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      letter-spacing: 2px;
      color: #ffffff;
      cursor: pointer;
    }
    .add {
      display: block;
      width: 190px;
      height: 50px;
      background-color: #ffffff;
      margin: 0 auto;
      border-radius: 10px;
      border: solid 1px #999999;
      font-size: 16px;
      letter-spacing: 2px;
      color: #666666;
      cursor: pointer;
      i {
        font-size: 20px !important;
        vertical-align: middle;
        margin-right: 6px;
      }
    }
  }
</style>
