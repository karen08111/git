<template>
  <van-uploader :after-read="onRead">
    <div class="addimg">
      <i class="iconfont icon-jia"></i>
    </div>
  </van-uploader>
</template>

<script>
  export default {
    name: "upload",
    props: {
      url: {
        type: String,
        required: true
      },
      str: {
        type: String,
        default: 'path'
      },
      path: String
    },
    methods: {
      onRead(file) {
        const formData = new FormData()
        formData.append('file',file.file)
        this.$http.post(this.url,formData).then(res => {
          if(res.code === 200){
            this.$emit('upSuccess',res.data[this.str])
            this.$emit('update:path',res.data[this.str])
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .addimg{
    width: 1.5rem;
    height: 1.5rem;
    background-color: #ffffff;
    border: 1PX dashed #333333;
    border-radius: 0.06rem;
    position: relative;
    i{
      font-size: 0.4rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>