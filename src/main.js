// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import './css/style.css'
import './css/form-elements.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

/* To Pre append the server url */
Vue.http.interceptors.push(function (request, next) {
  request.url = 'http://localhost:3000/' + request.url
  next()
})
