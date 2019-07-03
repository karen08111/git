<template>
  <div>
    <Header v-if="showMenu"></Header>
    <navMenu :navs='navs'
             :routeName='routeName'
             v-if="showProMenu && showMenu"></navMenu>
    <navMenu :routeName='routeName'
             v-if="!showProMenu && showMenu"></navMenu>
    <div style="width:1200px;margin:0 auto">
      <el-breadcrumb separator=">"
                     class="breadcrumbStyle">
        <el-breadcrumb-item class="breadcrumbItemStyle"
                            v-for="(item, index) in breadcrumbData"
                            :to="{ path: item.path?item.path:'' }"
                            :key="index">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="detailHeader">
    </div>
  </div>
</template>

<script>
/*
三级面包屑，需要传两个路由和label
*/
import { enterRoutes } from '../../router'
import Header from '@/components/header/Header'
export default {
  name: 'detailHeader',
  components: { Header },
  data () {
    return {
      navs: enterRoutes[0].children,
      showProMenu: false
    }
  },
  props: {
    breadcrumbData: {
      type: Array,
      required: false
    },
    showMenu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
  },
  created () {
    if (localStorage.getItem('proId')) {
      this.showProMenu = true
    }
    if (localStorage.getItem('fromRoute')) {
      this.routeName = localStorage.getItem('fromRoute')
    } else {
      this.routeName = '/company/comindex'
    }
  }
}
</script>

<style scoped lang="less">
</style>
