import Vue from 'vue'
import VueFirestore from 'vue-firestore'
import Vuex from 'vuex'
import router from '@/router'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueFirestore, {key: 'id'}); 


const store = new Vuex.Store({
  state: {

  }
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
