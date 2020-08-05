import Vue from 'vue'
import VueFirestore from 'vue-firestore';
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueFirestore, {key: 'id'}); 

new Vue({
  render: h => h(App),
}).$mount('#app')
