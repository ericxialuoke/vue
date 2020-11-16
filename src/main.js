import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import store from './store'


axios.defaults.baseURL = 'http://localhost:8443/api'
Vue.prototype.$axios=axios

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
      if (to.meta.requireAuth) {
        if (store.state.user.username) {
          next()
        } else {
          next({
            path: 'login',
            query: {redirect: to.fullPath}
          })
        }
      } else {
        next()
      }
    }
)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
