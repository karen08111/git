<template>
  <div class="app">
    <h2>发布招标公告</h2>
    <proForm :form="form" :url="url"></proForm>
  </div>
</template>

<script>
import proForm from '../components/proForm'
import getFormEdit from '../mixin/getFormEdit'
export default {
  name: 'zhaoForm',
  components: { proForm },
  mixins: [getFormEdit],
  data () {
    return {
      form: {
        type: 2,
        title: '',
        content: '',
        enclosure: []
      }
    }
  }
}
</script>

<style scoped lang="less">
  .app{
    padding-bottom: 52px;
    h2{
      font-size: 20px;
      line-height: 90px;
      color: #434348;
    }
  }
</style>
