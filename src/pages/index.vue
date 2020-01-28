<template lang="pug">
  keep-alive
    
    .block(:class = "{ 'loading': !response }")
      .block-loader
        .block-loader-dot
        .block-loader-dots
          span
          span
          span

      Products(:data = "response")

    router-view
</template>

<script>
import FakeApi from './../api/fake.js'
import Products from './../components/products.vue'

export default {
  name: 'CulinaryOn',
  components: {
    Products
  },
  data () {
    return {
      response: null
    }
  },
  created () {
    setTimeout(() => {
      this.response = FakeApi.products
    }, 500)
  }
}
</script>
