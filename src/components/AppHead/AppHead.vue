<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="seller-logo">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="discription">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="iconActive"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="background-logo">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <common-star :size="48" :score="seller.score"></common-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li
                class="support-item"
                v-for="(item, index) of seller.supports"
                :key="index"
              >
                <span class="icon" :class="iconItem(item.type)"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detali-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CommonStar from '../CommonStar/CommonStar.vue';
export default {
  name: "AppHead",
  components: {
    CommonStar
  },
  props: {
    seller: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  created() {
    this.classMap = ['decrease','discount','special','invoice','guarantee']
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    },
    iconItem(index) {
      return this.seller.supports ? this.classMap[index] : ''
    }
  },
  computed: {
    iconActive() {
      return this.seller.supports ? this.classMap[this.seller.supports[0].type] : ''
    },
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .header
    position: relative
    overflow: hidden
    color: #ffffff
    background: rgba(7, 17, 27, .5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      .avatar
        display: inline-block
        vertical-align: top
        img 
          width: 64px
          height: 64px
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .discription
          margin-bottom: 10px
          font-size: 12px
          line-height: 12px
        .support
          .icon
            display: inline-block
            vertical-align: middle
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            font-size: 10px
            line-height: 12px
      .support-count
        position: absolute 
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background-color: rgba(0, 0, 0, .2)
        text-align: center
        .count
          font-size: 10px
          vertical-align: top
        .icon-keyboard_arrow_right
          margin-left: 2px
          font-size: 14px
          line-height: 24px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      overflow: hidden
      white-space: nowrap 
      text-overflow: ellipsis 
      background-color: rgba(7, 17, 27, .2)
      .bulletin-title
        display: inline-block
        vertical-align: middle
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute 
        font-size: 10px
        right: 12px
        top: 11px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100% 
      z-index: -1
      filter: blur(10px)
      img 
        width: 100%
        height: 100% 
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 99
      width: 100% 
      height: 100% 
      overflow: auto 
      background-color: rgba(7, 17, 27, .8)
      backdrop-filter: blur(10px)
      &.fade-enter-active, &.fade-leave-active
         transition: all .5s
      &.fade-enter, &.fade-leave-to
        opacity: 0
        background-color: rgb(7, 17, 27)
      .detail-wrapper
        width: 100% 
        min-height: 100% 
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            font-size: 16px
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80% 
            margin: 28px auto 24px auto 
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, .2)
            .text
              padding: 0 12px
              font-size: 14px
              font-weight: 700
          .supports
            width: 80% 
            margin: 0 auto 
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                margin-right: 6px
                vertical-align: middle
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                font-size: 12px
                line-height: 16px
          .bulletin
            width: 80%
            margin: 0 auto 
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px


      .detali-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both

</style>