<template lang="pug">
  .block(:class = "{ 'loading': !response }")
    .block-loader
      .block-loader-dot
      .block-loader-dots
        span
        span
        span

    .block-back(@click = "$router.go(-1)")

    .product(v-if = "response")
      .product-title {{ response.name }}
      .product-info
        .product-info-item
          .product-info-item-left
            span {{ $root.getCategory(response.category) }}

          .product-info-item-right
            span {{ response.brand }}
</template>

<script>
import FakeApi from './../api/fake.js'

export default {
  name: 'CulinaryOn',
  props: {
    id: {
      type: String,
      default: 0
    }
  },
  data () {
    return {
      response: null
    }
  },
  activated () {
    this.response = null
    setTimeout(() => {
      FakeApi.products.forEach((product, i) => {
        if (product.id == this.id) {
          this.response = product
        }
      })
    }, 500)
  }
}
</script>

<style scoped lang="sass">

.product
  &-title
    background: #2d2d2d
    font-size: 19px
    color: #fff
    padding: 20px
    text-align: center
    border-radius: 5px 5px 0 0

  &-info
    padding: 20px 20px 10px

    &-item
      display: flex
      align-items: flex-start
      justify-content: space-between
      position: relative
      margin-bottom: 10px

      &::before
        content: ''
        height: 1px
        border-bottom: 1px dotted rgba(0, 0, 0, 1)
        position: absolute
        bottom: 5px
        left: 0
        right: 0
        z-index: 1

      &-left,
      &-right
        span
          background: #fff
          position: relative
          z-index: 2

      &-left
        span
          padding-right: 10px

      &-right
        span
          padding-left: 10px
          color: #000

</style>
