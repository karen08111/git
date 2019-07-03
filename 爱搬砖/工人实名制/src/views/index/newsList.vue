<template>
  <div class="newsList">
    <el-tabs v-model="index" :stretch="true">
      <el-tab-pane label="政策信息" name="1">
        <ul>
          <li v-for="item in l1" :key="item.id">
            <router-link :to="`/newsDetails/${item.id}`">
              <h3>{{item.title}}</h3>
              <p>{{item.content}}</p>
            </router-link>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="行业动态" name="2">
        <ul>
          <li v-for="item in l2" :key="item.id">
            <router-link :to="`/newsDetails/${item.id}`">
              <h3>{{item.title}}</h3>
              <p>{{item.content}}</p>
            </router-link>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'newsList',
  data () {
    return {
      index: this.$route.params.index === 2 ? '2' : '1',
      l1: [
        { id: 1, title: 'dasda', content: 'dasddasdasdas' }
      ],
      l2: [
        { id: 2, title: 'dasfasdasdda', content: 'dasddasdasdas' }
      ]
    }
  }
}
</script>

<style scoped lang="less">
  .newsList {
    width: 1200px;
    margin: 0 auto;
    ul {
      li {
        width: 1200px;
        height: 180px;
        background-color: #fafafd;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 0 30px;
        transition: all .4s;
        margin-bottom: 20px;
        position: relative;
        &:last-of-type {
          margin-bottom: 0;
        }
        a{
          display: block;
          width: 100%;
          height: 100%;
        }
        h3 {
          font-size: 18px;
          font-weight: bold;
          padding: 20px 0;
          color: #0f0f0f;
        }
        p {
          line-height: 1.5;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
          color: #0f0f0f;
        }
      }
    }
  }
</style>
