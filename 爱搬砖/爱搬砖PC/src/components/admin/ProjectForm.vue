<template>
  <el-form ref="ProjectForm" :model="form" :rules="rules" label-width="120px" class="ProjectForm">
    <header>编辑招聘信息</header>
    <headline h4="项目信息" span="" style="margin-bottom: 37px;"></headline>
    <el-form-item label="项目标题：" prop="title">
      <el-input v-model="form.title" placeholder="请输入项目标题"></el-input>
    </el-form-item>
    <el-form-item label="项目分类：" prop="project_type">
      <el-select v-model="form.project_type" placeholder="请选择">
        <el-option
            v-for="item in project_types"
            :key="item.id"
            :label="item.title"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <city :prov.sync="form.province" :city.sync="form.region" label="项目地址："></city>
    <el-form-item label="项目状态：" prop="prj_status">
      <el-select v-model="form.prj_status" placeholder="请选择">
        <el-option
            v-for="item in statuss"
            :key="item.id"
            :label="item.title"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系方式：">
      <el-input v-model="form.mobile" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="总 投 资：">
      <el-input v-model="form.invest" placeholder=""></el-input>
      <div class="unit">万元</div>
    </el-form-item>
    <el-form-item label="立项文号：">
      <el-input v-model="form.approval_num" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="立项级别：">
      <el-select v-model="form.approval_level_num" placeholder="请选择">
        <el-option
            v-for="item in levels"
            :key="item.id"
            :label="item.title"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="建设规模：">
      <el-select v-model="form.prj_size" placeholder="请选择">
        <el-option
            v-for="item in sizes"
            :key="item.id"
            :label="item.title"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="工程用途：">
      <el-select v-model="form.function_num" placeholder="请选择">
        <el-option
            v-for="item in uses"
            :key="item.id"
            :label="item.title"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="总面积：">
      <el-input v-model="form.building_area" placeholder=""></el-input>
      <div class="unit">平方米</div>
    </el-form-item>
    <el-form-item label="总长度：">
      <el-input v-model="form.building_length" placeholder=""></el-input>
      <div class="unit">米</div>
    </el-form-item>
    <el-form-item label="项目地址：" prop="address">
      <el-input v-model="form.address" placeholder="例：浙江省杭州市滨江区西科科技园1-11" style="width: 790px"></el-input>
      <Map_temp el="ProjectFormMap" :width="789" :height="350" :mapxy.sync="form.mapIndex" :city="cityName" :area.sync="form.address" :isLoca="true"></Map_temp>
    </el-form-item>
    <el-form-item label="项目介绍：" prop="content">
      <el-input type="textarea" v-model="form.content" placeholder=""></el-input>
    </el-form-item>
    <headline h4="项目施工许可证" span="" style="margin-bottom: 37px;"></headline>
    <el-form-item label="工程名称：" prop="prj_name">
      <el-input v-model="form.prj_name" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="施工许可证编号：" prop="builder_licenseNum" class="licence">
      <el-input v-model="form.builder_licenseNum" placeholder=""></el-input>
    </el-form-item>
    <headline h4="总承包单位信息" span="" style="margin-bottom: 37px;"></headline>
    <el-form-item label="总承包单位：" prop="contractor_corp_name">
      <el-input v-model="form.contractor_corp_name" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="总承包单位统一社会信用代码：" prop="contractor_corp_code" class="contractor_corp_name">
      <el-input v-model="form.contractor_corp_code" placeholder=""></el-input>
    </el-form-item>
    <div class="btns">
      <el-button type="primary" @click="submit">发 布</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
    </div>
  </el-form>
</template>

<script>
import city from './components/form/city'
export default {
  name: 'ProjectForm',
  components: { city },
  data () {
    return {
      isEdit: !!this.$route.params.id,
      form: {
        title: '',
        project_type: '',
        province: '',
        region: '',
        prj_status: '',
        mobile: '',
        invest: '',
        approval_num: '',
        approval_level_num: '',
        prj_size: '',
        function_num: '',
        building_area: '',
        building_length: '',
        mapIndex: '',
        address: '',
        content: '',
        prj_name: '',
        builder_licenseNum: '',
        contractor_corp_name: '',
        contractor_corp_code: '',
        _method: ''
      },
      rules: {
        title: [{ required: true, message: '请输入项目标题', trigger: 'blur' }],
        project_type: [{ required: true, message: '请选择项目分类', trigger: 'blur' }],
        region: [{ required: true, message: '请选择项目地址', trigger: 'blur' }],
        prj_status: [{ required: true, message: '请选择项目状态', trigger: 'blur' }],
        address: [{ required: true, message: '请输入项目地址', trigger: 'blur' }],
        prj_name: [{ required: true, message: '请输入项目编码', trigger: 'blur' }],
        builder_licenseNum: [{ required: true, message: '请输入施工许可证编号', trigger: 'blur' }],
        contractor_corp_name: [{ required: true, message: '请输入总承包单位', trigger: 'blur' }],
        contractor_corp_code: [{ required: true, message: '请输入总承包单位统一社会信用代码', trigger: 'blur' }]
      },
      project_types: [],
      uses: [],
      statuss: [],
      levels: [],
      sizes: []
    }
  },
  computed: {
    cityName () {
      let reg = /.+?(省|市)/g
      let str = this.form.address.match(reg)
      if (str) { return str[str.length - 1] }
    },
    _method () {
      if (this.isEdit) {
        this.form._method = 'patch'
      } else {
        this.form._method = 'put'
      }
    },
    isupdate () {
      if (this.isEdit) return '/update'
      else return ''
    }
  },
  methods: {
    submit () {
      this.$http.post(`/member/project${this.isupdate}`, this.form).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.msg)
          this.$router.go(-1)
        }
      })
    },
    request () {
      this.$http.get(`/member/project/${this.$route.params.id}/edit`).then(res => {
        if (res.data.code == 200) {
          const detail = res.data.data.detail
          this.form['id'] = detail.id
          this.form.title = detail.title
          this.form.project_type = detail.project_type.id
          this.form.province = detail.province
          if (detail.region.length > 0) { this.form.province = detail.region[0].id }
          if (detail.region.length > 1) { this.form.region = detail.region[1].id }
          this.form.prj_status = detail.prj_status.id
          this.form.mobile = detail.mobile
          this.form.invest = detail.invest
          this.form.approval_num = detail.approval_num
          this.form.approval_level_num = detail.approval_level_num.id
          this.form.prj_size = detail.prj_size.id
          this.form.function_num = detail.function_num.id
          this.form.building_area = detail.building_area
          this.form.building_length = detail.building_length
          this.form.mapIndex = detail.lat + detail.lng
          this.form.address = detail.address
          this.form.content = detail.content
          this.form.prj_name = detail.prj_name
          this.form.builder_licenseNum = detail.builder_licenseNum
          this.form.contractor_corp_name = detail.contractor_corp_name
          this.form.contractor_corp_code = detail.contractor_corp_code
        }
      })
    }
  },
  created () {
    /* 项目分类 */
    this.$http.get('/common/project').then(res => {
      this.project_types = res.data.data
    })
    /* 项目状态 */
    this.$http.get('/common/projStatus').then(res => {
      this.statuss = res.data.data
    })
    /* 立项级别 */
    this.$http.get('/common/createProjl').then(res => {
      this.levels = res.data.data
    })
    /* 建设规模 */
    this.$http.get('/common/scaleOfConstruction').then(res => {
      this.sizes = res.data.data
    })
    /* 工程用途 */
    this.$http.get('/common/projUse').then(res => {
      if (res.data.code == 200) {
        this.uses = res.data.data
      }
    })

    if (this.$route.params.id) {
      this.request()
    }
  }
}
</script>

<style lang="less">
  .ProjectForm{
    width: 980px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px
    rgba(0, 0, 0, 0.1);
    padding: 0 40px 20px;
    box-sizing: border-box;
    header{
      width: 960px;
      height: 50px;
      background-color: #ffffff;
      box-shadow: 0px 2px 4px 0px
      rgba(0, 0, 0, 0.1);
      font-size: 16px;
      font-weight: bold;
      line-height: 50px;
      letter-spacing: 2px;
      color: #000003;
      position: relative;
      left: -40px;
      padding-left: 40px;
      box-sizing: border-box;
      margin-bottom: 57px;
    }
    .el-input{
      width: 246px;
    }
    .el-form-item{
      position: relative;
      .unit{
        letter-spacing: 1px;
        color: #cccccc;
        line-height: 40px;
        position: absolute;
        top: 0;
        right: 550px;
      }
      textarea{
        width: 790px;
        height: 230px;
      }
    }
    .licence{
      .el-form-item__label{
        width: 163px !important;
      }
    }
    .contractor_corp_name{
      .el-form-item__label{
        width: 233px !important;
      }
    }
    .btns{
      text-align: center;
      .el-button+.el-button{
        margin-left: 40px;
      }
    }
  }
</style>
