import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import styles from './css/application.sass'
import index from './pages/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes.routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

const App = new Vue({
  router,
  name: 'App',
  render: h => h(index),
  data: function() {
    return {}
  },
  methods: {
    getCategory: (category) => {
      let response
      switch (category.toLowerCase()) {
        case 'phone': {
          response = 'Смартфоны'
          break;
        }

        case 'tablet': {
          response = 'Планшеты'
          break;
        }

        default: { 
          response = category
          break;              
        }
      }
      return response
    }
  }
}).$mount('#app');
