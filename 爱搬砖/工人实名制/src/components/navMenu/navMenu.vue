<template>
  <div class="mainMenu"
       :style="{backgroundColor: bgcolor}">
    <el-menu v-if="navItems && navItems.length"
             :default-active="activeName"
             class="el-menu-demo navMenu"
             :mode="mode"
             :router="isRouter"
             :background-color="bgcolor"
             :text-color="textColor"
             @select="selectEvent"
             :active-text-color="activeTextColor">
      <menu-items v-for="item in navItems"
                  :index='item.name'
                  :item="item"
                  :key="item.name"></menu-items>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'navMenu',
  data () {
    return {
      activeName: '',
      bgcolor: '#333',
      activeTextColor: '#ffd04b',
      textColor: '#fff'
    }
  },
  props: {
    mode: {
      type: String,
      default: 'horizontal' // vertical
    },
    navs: Array,
    isRouter: {
      type: Boolean,
      default: true
    },
    routeName: {
      type: String
    }
  },
  components: {
    'menuItems': _ => import('./menuItems')
  },
  computed: {
    ...mapGetters(['navRoutes']),
    navItems () {
      let routes
      if (this.navs) {
        routes = this.navs
      } else {
        routes = this.navRoutes
      }
      return routes
    }
  },
  created () {
    if (localStorage.getItem('proId')) {
      this.bgcolor = '#0083b0'
      this.activeTextColor = '#00b4db'
      this.textColor = '#ffffff'
    }
  },
  mounted () {
    if (this.routeName) {
      this.activeName = this.routeName
    } else {
      this.activeName = this.$route.name
    }
  },
  updated () {
    if (this.routeName) {
      this.activeName = this.routeName
    } else {
      this.activeName = this.$route.name
    }
  },
  methods: {
    selectEvent (ind, indPath) {
      localStorage.setItem('fromRoute', ind)
    }
  }
}
</script>

<style scoped lang="less">
.mainMenu {
  width: 100%;
  background: #333;
}
.navMenu {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  border: 0;
  justify-content: space-between;
  li {
    margin: auto;
    font-size: 16px;
  }
  li:nth-of-type(1) {
    margin-left: 0;
  }
  li:nth-last-of-type(1) {
    margin-right: 0;
  }
}
</style>

<style>
.el-icon-arrow-down:before {
  content: "\E603";
  color: rgb(221, 221, 221);
}
.el-submenu {
  font-size: 16px !important;
}
.navMenu {
  font-size: 16px !important;
}
</style>
