<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toggleList">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight: totalCount}">
            <i class="icon-shopping_cart" :class="{highlight: totalCount}"></i>
          </div>
          <div class="num" v-show="totalCount">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight: totalPrice}">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click="toPay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="emptyAll">清空</span>
        </div>
        <div class="list-content" ref="listcontent">
          <ul>
            <li
              class="food-item border-1px"
              v-for="(food, index) of selectFoods"
              :key="index"
            >
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>¥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <common-button :food="food"></common-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import CommonButton from '../CommonButton/CommonButton.vue';
export default {
  name: "ShopCart",
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  components: {
    CommonButton
  },
  data() {
    return {
      listShow: false
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) return
      this.listShow = !this.listShow
      
    },
    initScroll() {
      this.listScroll = new BScroll(this.$refs.listcontent, {click: true})
    },
    emptyAll() {
      this.selectFoods.forEach(food => {
        food.count = 0
      })
      this.listShow = false
    },
    toPay() {
      if (this.totalPrice < this.minPrice) return
      // 跳转支付详情页
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach(food => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      }
      if ( this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差¥${diff}元起送`
      }
      return "去结算"
    },
    payClass() {
      return this.totalPrice < this.minPrice ? 'no-enough' : 'enough'
    }
  },
  watch: {
    selectFoods() {
      if (!this.selectFoods.length) {
        this.listShow = false
      }
      if (!this.listScroll) {
        this.initScroll()
      }
      this.listScroll.refresh()
    }
  }
   
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl";
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100% 
    height: 48px
    .content
      display: flex
      background: #141d27
      color: rgba(255, 255 255, .4)
      .content-left
        flex: 1
        .logo-wrapper, .price, .desc
          display: inline-block
        .logo-wrapper
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50% 
          background: #141d27
          .logo
            width: 100% 
            height: 100% 
            border-radius: 50% 
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a
              &.highlight
                color: #ffffff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
        .price
          line-height: 24px
          margin-top: 12px
          padding-right: 12px
          box-sizing: border-box 
          border-right: 1px solid rgba(255, 255 255, .1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #ffffff        
        .desc
          line-height: 24px
          margin-left: 12px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #ffffff
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fade-enter-active, &.fade-leave-active
        transition: all .5s
      &.fade-enter, &.fade-leave-to
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        .title
          float: left 
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right 
          font-size: 12px
          color: rgb(7, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #ffffff
        .food-item
          position: relative
          padding: 12px 0
          box-sizing: border-box 
          border-1px(rgba(7, 17, 27, .1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

</style>