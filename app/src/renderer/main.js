import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import VueAplay from 'vue-aplayer'
Vue.component('aplayer', VueAplay);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // components: { App },
	el:'#app',
  router,
  store,
  // template: '<App/>',
	render: h => h(App)
});

router.beforeEach((fromRouter,toRouter,next)=>{
  // console.log(fromRouter,toRouter)
  next()
})