<template>
    <div class="IndexPage">
        <div class="title">发现音乐</div>
        <div class="barMain">
            <div class="tabBar">
                <span :class="activeTab==key?'selected':''" @click="selectBar(key)" v-for="(value,key) in tabBar" :key="key">
                    {{value.label}}
                </span>
            </div>
            <!-- 走马框 -->
            <component :is="activePanel" ></component>
        </div>

  </div>
</template>

<script>
import PersonIndex from './Personal/index'
export default {
name:'indexPage',
data(){
    return{
        activeTab:'0',
        activePanel:'personal-index',
        tabBar:[
                {label:'个性推荐'},
                {label:'歌单'},
                {label:'主播电台'},
                {label:'最新音乐'},
                {label:'歌手'}
                ]
    }
},
components:{
    'personal-index':PersonIndex
},
methods:{
    selectBar(key){
        this.activeTab=key
    }
}
}
</script>

<style>
.IndexPage{
    padding:1rem 2rem;
}
.title{
    padding: 0.5rem;
    color: #888;
    /* margin-left: 1rem; */
}
.tabBar{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgb(236, 234, 234);
}
.tabBar span{
    padding: 0.5rem 0.5rem;
    /* margin-right: 1rem; */
    /* margin-left: 1rem; */
}
.tabBar span:hover{
    cursor: default;
}
.selected{
    border-bottom: 2px solid red;
    color: red;
}


</style>