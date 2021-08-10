import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { rtdbPlugin as VueFire } from 'vuefire'
  Vue.use(VueFire)


new Vue({
  render: h => h(App),
}).$mount('#app')
