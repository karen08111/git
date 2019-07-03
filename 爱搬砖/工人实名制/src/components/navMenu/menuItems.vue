<template>
  <transition class="menuItems"
              v-if="!item.meta.hidden">
    <el-submenu v-if="item.children && item.children.length"
                :index="item.path">
      <template slot="title">{{item.meta.title}}</template>
      <transition v-for="desc in item.children.filter(val => !val.meta.hidden)"
                  :key="desc.path">
        <el-menu-item :index="desc.path">{{desc.meta.title}}</el-menu-item>
        <menu-items v-if="desc.children && desc.children.length"
                    style="font-size:16px;"
                    :item="desc"></menu-items>
      </transition>
    </el-submenu>
    <el-menu-item v-else
                  :index="item.path">{{item.meta.title}}</el-menu-item>
  </transition>
</template>

<script>
export default {
  name: 'menuItems',
  props: {
    item: Object
  }
}
</script>

<style scoped lang="less">
</style>
