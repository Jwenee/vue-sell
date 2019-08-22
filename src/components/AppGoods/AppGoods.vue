<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuwrapper">
      <ul>
        <li
          v-for="(item, index) of goods"
          :key="index"
          class="menu-item"
          :class="{'current': currentIndex === index}"
          @click="selectMenu(index)"
        >
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodswrapper">
      <ul>
        <li 
          v-for="(item, index) of goods"
          :key="index"
          class="food-list food-list-hook"
        >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li
              v-for="(food, index) of item.foods"
              :key="index"
              class="food-item border-1px"
              @click="sellectFood(food)"
            >
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <common-button :food="food"></common-button>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart 
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      :select-foods="selectFoods"
    ></shop-cart>
    <food-detail :food="selectedFood" ref="fooddetail"></food-detail>
  </div>
</template>

<script>
import axios from 'axios';
import BScroll from 'better-scroll';
import ShopCart from '../ShopCart/ShopCart.vue';
import CommonButton from '../CommonButton/CommonButton.vue';
import FoodDetail from '../FoodDetail/FoodDetail.vue';
export default {
  name: "AppGoods",
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    ShopCart,
    CommonButton,
    FoodDetail
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  created() {
    this.classMap = ['decrease','discount','special','invoice','guarantee']
    this.getGoodsInfo()
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    getGoodsInfo() {
      axios.get('/api/goods').then(res => {
        res = res.data
        if (res.errno === 0) {
          this.goods = res.data  
          this.$nextTick(() => {
            this.calculateHeight()
          })        
        }
      })
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuwrapper, {click: true})
      this.foodsScroll = new BScroll(this.$refs.foodswrapper, {click: true, probeType: 3})
      this.foodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calculateHeight() {
      let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
      let len = foodList.length
      let startHeight = 0
      this.listHeight.push(startHeight)
      for (let i = 0; i < len; i ++) {
        let listItem = foodList[i]
        startHeight += listItem.clientHeight
        this.listHeight.push(startHeight)
      }
    },
    selectMenu(index) {
      let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el)
    },
    sellectFood(food) {
      this.selectedFood = food
      this.$refs.fooddetail.show()
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i ++) {
        let startHeight = this.listHeight[i]
        let endHeitht = this.listHeight[i + 1]
        if (!endHeitht || (this.scrollY >= startHeight && this.scrollY < endHeitht)) {
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = []
      this.goods.forEach(goodsItem => {
        goodsItem.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl";
  .goods
    display: flex
    position: absolute 
    top: 174px
    bottom: 46px
    width: 100% 
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
      // 多行垂直居中
        display: table
        padding: 0 12px
        height: 54px
        width: 56px
        line-height: 14px
        &.current
          position: relative
          margin-top: -1px
          z-index: 10
          background: #ffffff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: middle
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          font-size: 12px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, .1))
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
          img 
            width: 57px
            height: 57px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            font-size: 14px
            height: 14px
            line-height: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through 
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute 
            right: 0
            bottom: 0

</style>