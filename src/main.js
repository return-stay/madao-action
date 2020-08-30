import Vue from 'vue'
import App from './App.vue'
import './assets/js/rem.js'
// import utils from './assets/js/utils.js'
import './assets/css/reset.styl'
import router from './router'
import http from '@/api/ajax'
// import VConsole from 'vconsole'
Vue.prototype.$http = http
import Vant from 'vant'
// import { Lazyload } from 'vant'
// new VConsole()
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
// import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
// Vue.use(utils)
// Vue.use(Lazyload)
// import 'vant/lib/index.css';
// import { Progress } from 'vant'
// import Button from 'vant/lib/button'
// import 'vant/lib/button/style'
// Vue.use(Progress)
// Vue.use(Button)
// import Vant from 'vant'
// import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
