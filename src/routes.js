import Index from './pages/index.vue'
import Product from './pages/product.vue'

function beforeEnter (to, from, next) {
  next()
}

const routes = [
  { path: '*', component: Index, beforeEnter: beforeEnter },
  { path: '/product/:id', name: 'product', component: Product, props: true, beforeEnter: beforeEnter }
]

export default  {
  routes
}
