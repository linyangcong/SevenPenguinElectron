import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
 import ElementUI from 'element-ui'
 // import 'element-ui/lib/theme-chalk/index.css'
	 
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI);
Vue.use(Router)
// Vue.use(ElementUI)

export default new Router({
    routes
})
