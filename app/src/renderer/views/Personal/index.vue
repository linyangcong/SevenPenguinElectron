<template>
  <div>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(item,key) in Carousel" :key="key">
                <div>
                    <img :src="item.url" alt="图片丢失"/>
                </div>
            </el-carousel-item>
        </el-carousel>

        <div class="Module">
            <div class="selectModule" v-for="(value,key) in ModuleList" :key="key">
                <img :src="value.imgUrl" alt="无图片" />
                <div>
                    <div>{{value.title}}</div>
                    <div class="decoration">{{value.decoration}}</div>
                </div>
            </div>
        </div>
        
        <div>
            <div>{{ModuleList1.title}}</div>
            <div class="ModuleList1" v-for="(v,k) in ModuleList1.list" :key="k">
                <div class="ModuleList1Item" v-for="(value,key) in v" :key="key">
                    <div>
                        <img :src="value.imgUrl" alt="暂无图片">
                        <span>{{value.listening}}</span>
                    </div>
                    <div class="text">{{value.label}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name:'PersonIndex',
data(){
    return{
        Carousel:[
            {url:'http://47.115.124.190/WebView/discovery/走马灯/z1.jpg',name:''},
            {url:'http://47.115.124.190/WebView/discovery/走马灯/z2.jpg',name:''},
            {url:'http://47.115.124.190/WebView/discovery/走马灯/z3.jpg',name:''},
            {url:'http://47.115.124.190/WebView/discovery/走马灯/z4.jpg',name:''},
            {url:'http://47.115.124.190/WebView/discovery/走马灯/z5.jpg',name:''},
            {url:'http://47.115.124.190/WebView/discovery/走马灯/z6.jpg',name:''},
        ],
        ModuleList:[
            {imgUrl:'http://47.115.124.190/WebView/User/u1.jpg',title:'私人FM',decoration:'享受你的音乐专属推荐'},
            {imgUrl:'http://47.115.124.190/WebView/User/u2.jpg',title:'每日歌曲推荐',decoration:'根据您的口味生成'},
            {imgUrl:'http://47.115.124.190/WebView/User/u3.jpg',title:'排行榜',decoration:'最热音乐榜'},
        ],
        ModuleList1:{
            title:'推荐歌单',
            list:[
                [
                {imgUrl:'http://47.115.124.190/WebView/discovery/d2.jpg',label:'[华语速爆新歌]最新话语...',listening:'5555'},
                {imgUrl:'http://47.115.124.190/WebView/discovery/d3.jpg',label:'[华语速爆新歌]最新话语...',listening:'5555'},
                {imgUrl:'http://47.115.124.190/WebView/discovery/d4.jpg',label:'[华语速爆新歌]最新话语...',listening:'5555'},
                {imgUrl:'http://47.115.124.190/WebView/discovery/d5.jpg',label:'[华语速爆新歌]最新话语...',listening:'5555'},
                ],
                [
                {imgUrl:'http://47.115.124.190/WebView/discovery/d6.jpg',label:'[华语速爆新歌]最新话语...',listening:'5555'},
                {imgUrl:'http://47.115.124.190/WebView/discovery/d7.jpg',label:'[华语速爆新歌]最新话语...',listening:'5555'},
                {imgUrl:'http://47.115.124.190/WebView/discovery/d8.jpg',label:'[华语速爆新歌]最新话语...',listening:'5555'},
                {imgUrl:'http://47.115.124.190/WebView/discovery/d9.jpg',label:'[华语速爆新歌]最新话语...',listening:'5555'},
                ]
            ]
        }
    }
}
}
</script>

<style>
.Module{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

}
.Module>:nth-child(2){
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
}
.selectModule{
    width: 33%;
    height:4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.selectModule img{
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
}
.selectModule div{
    margin-left: 0.3rem;
}
.selectModule .decoration{
    font-size: 0.8rem;
    color: #aaa;
}
.ModuleList1{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.ModuleList1Item{
    width: 20%;
    padding: 1rem 0rem;
    overflow: hidden;
}
.ModuleList1Item img{
    width: 12rem;
    height: 8rem;
}
.ModuleList1Item .text{
    /* overflow: hidden; */
    /* line-height: 1rem; */
    /* overflow-wrap: initial; */
    /* width: 100%; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}


 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>