<template>
  <div id="app"
       v-cloak>
    <router-view style="min-height:780px; " />
    <Footer style="margin-top:24px"></Footer>
  </div>
</template>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: "微软雅黑";
  font-weight: normal;
  line-height: 1;
}
a {
  text-decoration: none;
}
#app {
  min-width: 1200px;
  background-color: #f2f7fb;
}
/*#app{
    :global{
      .el-select{
        width: 100%
      }
    }
  }*/
ol,
ul,
li {
  list-style: none;
}
html,
body {
  width: 100%;
  height: 100%;
  background-color: #f2f7fb;
}
img {
  border: none;
}
[v-cloak] {
  display: none !important;
}
#app {
  min-width: 1200px;
}
.showDetail p {
  line-height: 50px;
  font-size: 16px;
}
// 搜索区域样式
.searchFormStyle {
  background-color: #fff;
  margin-top: 20px;
  margin-bottom: 40px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  .el-button {
    width: 80px;
    height: 32px;
    margin-top: 4px;
  }
  .secondColStyle {
    margin-left: 34px;
    width: 320px;
  }
  .thirdColStyle {
    margin-left: 90px;
    width: 320px;
  }
}
.add {
  text-align: right;
  margin-bottom: 20px;
  button {
    height: 32px;
  }
}
.notIsRequired {
  text-indent: 10px;
}
.breadcrumbStyle {
  margin-top: 20px;
}
.breadcrumbItemStyle {
  .el-breadcrumb__inner {
    color: #008af1 !important;
  }
  .el-breadcrumb__separator {
    color: #008af1 !important;
  }
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #dfedf8 !important;
}
// 详情页样式
.detail-page-style {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-row {
    border: 1px solid #dddddd;
    border-bottom: 0;
  }
  .el-col {
    padding: 0 !important;
  }
  .el-form-item__label {
    padding-left: 20px;
    line-height: 54px;
    background-color: #ececec;
  }
  .el-form-item__content {
    line-height: 54px;
    padding-left: 20px;
  }
  .bottomBtn {
    text-align: center;
    margin-top: 50px;
    button {
      width: 98px;
      height: 36px;
      margin: 0 36px;
    }
  }
}
.bottomBtn {
  text-align: center;
  margin-top: 50px;
  button {
    width: 98px;
    height: 36px;
    margin: 0 36px;
  }
}
// select框宽度占满
.selectFullWidth {
  .el-select {
    width: 100%;
  }
}
// 导出
.exportExcel {
  text-align: right;
  margin-bottom: 20px;
}
.el-tag {
  margin-right: 20px;
}
.el-icon-arrow-down:before {
  content: "\E6DF" !important;
}
.el-submenu__title {
  font-size: 16px !important;
}
.el-menu-item {
  font-size: 16px !important;
}
</style>
