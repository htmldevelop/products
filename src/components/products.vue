<template lang="pug">
  div(v-if = "data")
    .filter
      .filter-select(:class = "{ 'disabled': getFilterCategories.length <= 0 }")
        multiselect(
          v-model = "filter.select.categories"
          :options = "getFilterCategories"
          :multiple = "true"
          :close-on-select = "false"
          :show-labels = "false"
          :searchable = "false"
          placeholder = "Выберите категорию")

      .filter-select(:class = "{ 'disabled': getFilterCategories.length <= 0 }")
        multiselect(
          v-model = "filter.select.brands"
          :options = "getFilterBrands"
          :multiple = "true"
          :close-on-select = "false"
          :show-labels = "false"
          :searchable = "false"
          placeholder = "Выберите бренд")

    .products
      .products-item(v-for = "product in products")
        router-link.products-item-name(:to = "'/product/' + product.id") {{ product.name }}
        .products-item-info
          .products-item-info-category {{ $root.getCategory(product.category) }}
          .products-item-info-brand {{ product.brand }}

      .products-error(v-if = "data && products.length <= 0")
        .products-error-title Ничего не&nbsp;найдено :-(
        .products-error-text К&nbsp;сожалению, система не&nbsp;нашла вариантов, подходящих под выбранные требования.
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'CulinaryOn',
  props: [ 'data' ],
  components: {
    Multiselect
  },
  data () {
    return {
      filter: {
        select: {
          categories: [],
          brands: []
        }
      }
    }
  },
  computed: {
    getFilterCategories: function () {
      let list = []
      if (this.data) {
        this.data.forEach((product, i) => {
          if (list.indexOf(this.$root.getCategory(product.category)) === -1) {
            list.push(this.$root.getCategory(product.category))
          }
        })
      }
      return list
    },
    getFilterBrands: function () {
      let list = []
      if (this.data) {
        this.data.forEach((product, i) => {
          if (list.indexOf(this.$root.getCategory(product.brand)) === -1) {
            list.push(this.$root.getCategory(product.brand))
          }
        })
      }
      return list
    },
    products: function () {
      let list = []
      if (this.data) {
        if (this.filter.select.categories.length <= 0 && this.filter.select.brands.length <= 0) {
          list = this.data
        } else {
          this.data.forEach((product, i) => {
            if (this.filter.select.categories.length > 0 && this.filter.select.brands.length <= 0) {
              if (this.filter.select.categories.indexOf(this.$root.getCategory(product.category)) !== -1) {
                list.push(product)
              }
            } else if (this.filter.select.categories.length <= 0 && this.filter.select.brands.length > 0) {
              if (this.filter.select.brands.indexOf(product.brand) !== -1) {
                list.push(product)
              }
            } else if (this.filter.select.categories.length > 0 && this.filter.select.brands.length > 0) {
              if (this.filter.select.categories.indexOf(this.$root.getCategory(product.category)) !== -1 && this.filter.select.brands.indexOf(product.brand) !== -1) {
                list.push(product)
              }
            }
          })
        }
      }
      return list
    }
  }
}
</script>

<style scoped lang="sass">

.filter
  display: flex
  align-items: stretch
  justify-content: space-between
  flex-wrap: wrap
  background: #92a4b4
  padding: 20px
  margin-bottom: 20px
  color: #1e375a
  border-radius: 5px 5px 0 0

  &-select
    flex: none
    width: calc(100% / 2 - 10px)

    @media only screen and (max-width: 767px)
      width: 100%
      margin-bottom: 10px

      &:last-child
        margin-bottom: 0

    &.disabled
      opacity: .5
      pointer-events: none

.products
  display: flex
  align-items: stretch
  justify-content: flex-start
  flex-wrap: wrap
  padding: 0 5px 5px 20px

  &-error
    padding: 20px 15px 35px 0
    text-align: center
    color: #000
    margin: 0 auto
    max-width: 50%

    &-title
      font-size: 19px
      margin-bottom: 10px

  &-item
    flex: none
    width: calc(100% / 4 - 15px)
    border: 1px solid #ccc
    border-radius: 5px
    padding: 15px
    margin: 0 15px 15px 0

    @media only screen and (max-width: 992px)
      width: calc(100% / 2 - 15px)

    @media only screen and (max-width: 767px)
      width: calc(100% - 15px)

    &-name
      display: inline-block
      font-size: 19px
      text-decoration: none
      line-height: 1.2
      margin-bottom: 5px
      color: #2364d2
      transition: color .3s

      &:hover
        color: #ed5267

    &-info
      display: flex
      white-space: nowrap
      color: #000

      &-category
        color: rgba(30, 55, 90, .7)

        &::after
          content: '→'
          padding: 0 5px

</style>
