<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div 
      class="cart-decrease icon-remove_circle_outline" 
      v-show="food.count"
      @click.stop="decreaseCart"
    ></div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script>
export default {
  name: "CommonButton",
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart() {
      this.food.count ? this.food.count ++ : this.$set(this.food, 'count', 1)
    },
    decreaseCart() {
      if (this.food.count > 0) {
        this.food.count --
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartcontrol
    .fade-enter-active, .fade-leave-active 
      transition: opacity,transform .5s;
      opacity: 1
      transform: translate3d(0, 0, 0)
    .fade-enter, .fade-leave-to
      opacity: 0;
      transform: translate3d(24px, 0, 0)
    .cart-decrease, .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-count
      display: inline-block
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      vertical-align: top
      color: rgb(147, 153, 159)

</style>