<template>
  <div class="select-rating">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{active: selfType === 2}" @click="select(2)">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{active: selfType === 0}" @click="select(0)">
        {{desc.positive}}
        <span class="count">{{positive.length}}</span>
      </span>
      <span class="block negative" :class="{active: selfType === 1}" @click="select(1)">
        {{desc.negative}}
        <span class="count">{{negative.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{on: selfContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  name: "RatingSelect",
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data() {
    return {
      selfType: this.selectType,
      selfContent: this.onlyContent
    }
  },
  methods: {
    select(type) {
      this.selfType = type
      this.$emit('select-type', type)
    },
    toggleContent() {
      this.selfContent = !this.selfContent
      this.$emit('toggle-content', this.selfContent)
    }
  },
  computed: {
    positive() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE
      })
    },
    negative() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl";
  .select-rating
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, .1))
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        border-radius: 1px
        font-size: 12px
        line-height: 16px
        color: rgb(77, 85, 93)
        &.active 
          color: #ffffff
        .count 
          font-size: 8px
          margin-left: 2px

        &.positive
          background: rgba(0, 160, 220, .2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, .2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, .1)
      color: rgb(147, 153, 159)
      &.on 
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        margin-right: 4px
        font-size: 12px
      .text
        font-size: 12px
        
</style>