<template>
  <div class="app">
    <app-head :seller="seller"></app-head>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/" exact>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import axios from 'axios';
import AppHead from './components/AppHead/AppHead.vue';

export default {
  name: "app",
  components: {
    AppHead
  },
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.getSellerInfo()
  },
  methods: {
    getSellerInfo() {
      axios.get('/api/seller').then(res => {
        res = res.data
        if (res.errno === 0) {
          this.seller = res.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "./common/stylus//mixin.styl";
  .app
    .tab
      display: flex
      width: 100% 
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, .1))
      .tab-item
        flex: 1
        text-align: center
        & > a 
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.router-link-active
            color: rgb(240, 20, 20)
</style>
