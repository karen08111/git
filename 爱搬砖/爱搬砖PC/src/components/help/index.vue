<template>
    <div class="app">
        <Header :navs="navs"></Header>
       <!-- <div class="container">
            <div class="nav">
                &lt;!&ndash; background-color="#3388ff"
                 text-color="#fff"
                 active-text-color="#ffd04b"&ndash;&gt;
                <el-menu
                        :default-active="index"
                        class="el-menu-vertical-demo"
                        @select="handleSelect">
                    <el-menu-item v-for="i in links" :index="i.id">{{i.value}}</el-menu-item>
                </el-menu>
            </div>
            <div class="context">
                <h3>{{context[index-1].h3}}</h3>
                <p v-for="i in context[index-1].p">{{i}}</p>
            </div>
        </div>-->
        <div class="context" v-for="i in context">
            <h3>{{i.h3}}</h3>
            <p v-for="j in i.p">{{j}}</p>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      navs: this.$store.state.navs,
      index: '1',
      links: [{
        id: '1',
        value: '如何注册'
      }, {
        id: '2',
        value: '如何进行身份认证'
      }, {
        id: '3',
        value: '如何发布信息'
      }, {
        id: '4',
        value: '如何查看信息'
      }, {
        id: '5',
        value: '如何联系发布信息者'
      }, {
        id: '6',
        value: '如何入驻基地'
      }],
      context: [
        {
          h3: '如何注册？',
          p: ['第一步：点击网页右上角“注册”，弹出“注册”弹框', '第二步：输入手机号，正确进行图像验证，点击获取手机验证码，输入正确验证码，点击注册，即可完成注册']
        }, {
          h3: '如何进行身份认证？',
          p: ['第一步：注册完成后，点击网页右上角“未认证”，进入认证环节', '第二步：选择你要认证的身份，点击“开始认证”，分别完成“初级认证、中级认证、资质认证”，点击“提交审核”', '第三步：后台审核完成，收到审核通过信息']
        }, {
          h3: '如何发布信息？',
          p: ['在“信息管理”中找到“发布信息”并点击，选择需要发布的信息类别（团队需要选择），填写完整信息，点击发布']
        }, {
          h3: '如何查看信息？',
          p: ['在标题栏点击所需查看的信息类别，在筛选栏选择限定条件，即可查询所需信息，点击信息进入信息详情页面。']
        }, {
          h3: '如何联系发布信息者？',
          p: ['进入信息详情页面，点击联系，即可获取到发布者联系方式']
        }, {
          h3: '如何入驻基地？',
          p: ['点击标题栏上“入驻基地”，进入入驻基地页面，填写完整信息，点击“立即入驻”，等待客服联系。']
        }
      ]
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.index = keyPath[0]
    }
  },
  created () {
    document.title = '帮助中心'
  }
}
</script>

<style scoped lang="less">
    .app{
        .container{
            display: flex;
        }
        .nav{
            width: 210px;
            margin-right: 10px;
        }
        .context{
            width: 1000px;
            margin: 0 auto;
            padding: 20px;
            h3{
                font-size: 16px;
                font-weight: bold;
                letter-spacing: 2px;
                line-height: 2;
            }
            p{
                line-height: 2;
            }
        }
    }
</style>
