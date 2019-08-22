<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <common-star :size="36" :score="seller.serviceScore"></common-star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <common-star :size="36" :score="seller.foodScore"></common-star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <common-split></common-split>
      <rating-select
        :ratings="ratings"
        :select-type="selectType"
        :only-content="onlyContent"
        :desc="desc"
        @select-type="ratingType"
        @toggle-content="toggleContent"
      ></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li
            v-for="(rating, index) of ratings"
            v-show="needShow(rating.rateType, rating.text)"
            :key="index"
            class="rating-item border-1px"
          >
            <div class="avatar">
              <img :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <common-star :size="24" :score="rating.score"></common-star>
                <span v-show="rating.deliveryTime" class="delivery">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div v-show="rating.recommend && rating.recommend.length" class="recommend">
                <span class="icon-thumb_up"></span>
                <span
                  v-for="(item, index) of rating.recommend"
                  :key="index"
                  class="item"
                >
                  {{item}}
                </span>
              </div>
              <div class="time">
                {{formatTime(rating.rateTime)}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BScroll from 'better-scroll';
import { formatDate } from '../../common/js/util';
import CommonStar from '../CommonStar/CommonStar.vue';
import CommonSplit from '../CommonSplit/CommonSplit.vue';
import RatingSelect from '../RatingSelect/RatingSelect.vue';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: "AppRatings",
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    CommonStar,
    CommonSplit,
    RatingSelect
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  created() {
    this.getRatings()
  },
  methods: {
    getRatings() {
      axios.get('/api/ratings').then(res => {
        res = res.data
        if (res.errno === 0) {
          this.ratings = res.data
        }
      })
    },
    initScroll() {
      this.ratingsScroll = new BScroll(this.$refs.ratings, {click: true})
    },
    needShow(type, text) {
      if (this.onlyContent && !text) return false
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    ratingType(type) {
      this.selectType = type
      this.ratingsScroll.refresh()
    },
    toggleContent(onlyContent) {
      this.onlyContent = onlyContent
      this.ratingsScroll.refresh()
    },
    formatTime(tmp) {
      return formatDate(tmp)
    }
  },
  watch: {
    ratings() {
      if (!this.ratingsScroll) {
        this.initScroll()
      }
      this.ratingsScroll.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl";
  .ratings
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, .1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        
        .score
         margin-bottom: 6px
         font-size: 24px
         line-height: 28px
         color: rgb(255, 153, 0)
        .title
          margin-bottom: 6px
          font-size: 12px
          line-height: 12px
          color: rgb(7, 17, 27)
        .rank
          
          font-size: 10px
          line-height: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          
          .title
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 18px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            vertical-align: top
            margin: 0 12px
            @media only screen and (max-width: 320px)
             margin: 0 4px
          .score
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 18px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          .title
            font-size: 12px
            line-height: 18px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0 
        border-1px(rgba(7, 17, 27, .2))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img 
            width: 28px
            height: 28px
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            font-size: 10px
            line-height: 12px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              // vertical-align: top
              font-size: 10px
              line-height: 12px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            font-size: 12px
            line-height: 18px
            color: rgb(7, 17, 27)
          .recommend
            line-height: 16px
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, .2)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #ffffff
          .time
            position: absolute
            top: 0
            right: 0
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)

</style>