/**
 * Created by ysf on 2017/8/4.
 */

import Main from '../views/main.vue'
import search from '../views/Music/searchMusic.vue'
import discovery from '../views/discovery'
import musicPlay from '../views/Music/musicPlay'
let routes = [
    {
        path: '/',
        // component: Main
        name:'/',
        redirect:'/Main'
    },
    {
        path:'/Main',
        name:'/Main',
        component:Main
    },
    {
        path:'/search',
        name:'/search',
        component:search
    },
    {
        path:'/discovery',
        name:'/discovery',
        component:discovery
    },
    {
        path:'/musicPlay',
        name:'/musicPlay',
        component:musicPlay
    }
    ]

export default routes;