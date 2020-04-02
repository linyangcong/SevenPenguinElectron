<template>
  <div class="contain">
      <div class="left">
          <div class="showItem">三</div>
          <div class="leftScroll">
            <div  class="leftItem" >
                <!-- <div>本地音乐</div> -->
                <div @click="goRouter(value.routeName)" class="leftItemMain"  v-for="(value,key) in menuItem[0]" :key="'a'+key">{{value.name}}</div>
            </div>
            <div class="leftItem" >
                <span class="leftItemTitle">我的音乐</span>
                <span class="leftItemMain" v-for="(value,key) in menuItem[1]" :key="'b'+key">{{value.name}}</span>
            </div>
            <div class="leftItem" >
                <span class="leftItemTitle">创建歌单</span>
                <span class="leftItemMain" v-for="(value,key) in menuItem[2]" :key="'c'+key">{{value.name}}</span>
            </div>
          </div>
          <div class="leftBottom">
              <img src="http://47.115.124.190/WebView/User/u4.jpg" alt="暂未上传图片"/>
              <div class="userName">林养从</div>
              <i class="el-icon-message" />
              <i class="el-icon-setting" />
          </div>
      </div>
      <div class="main">
          <component :is="MainPage"></component>
      </div>
      <div class="playMain" >
          <div class="playMain1">
              <img  id="playMusicIcon" src="http://47.115.124.190/WebView/discovery/d14.jpg" />
              <img src="../../img/left.png"/>
              <img src="../../img/play.png"/>
              <img src="../../img/right.png"/>
          </div>
          <div class="playMain2">
              <div>aaaaaaaa</div>
              <el-progress :percentage="percent" ></el-progress>
          </div>
          <div class="playMain3" >
              <img src="../../img/unlove.png" />
              <img v-show="opensound" src="../../img/NOSOUND.png" />
              <img v-show="!opensound" src="../../img/SOUND.png" />
              <div>三</div>
          </div>
      </div>
  </div>
</template>

<script>
import IndexPage from './index'
export default {
  name: "MainPage",
  components:{
      'index-page':IndexPage
  },
  data() {
    return {
        percent:1,
        MainPage:'index-page',
        opensound:true,
        menuItem:[
            [
                {name:'搜索',icon:'',routeName:'/search',new:false},
                {name:'发现音乐',icon:'',routeName:'/discovery',new:false},
                {name:'MV',icon:'',routeName:'',new:false},
                {name:'朋友',icon:'',routeName:'',new:true},
            ],
            [
                {name:'本地音乐',icon:'',routeName:'',new:false},
                {name:'下载管理',icon:'',routeName:'',new:false},
                {name:'最近播放',icon:'',routeName:'',new:false},
                {name:'我的音乐云盘',icon:'',routeName:'',new:false},
            ],
            [
                {name:'我喜欢的音乐',icon:'',routeName:'',new:false},
                {name:'我可能喜欢的歌单',icon:'',routeName:'',new:false},
            ]
        ]
    };
  },
  methods: {
      goRouter(routeName){
          if(routeName!==''&&routeName!==null&&routeName!==undefined){
              this.$router.push(routeName)
          }
          else{
              this.$message({
                  message:'该功能暂未开通',
                  type:'info'
              })
          }
      }

  },
  mounted() {
this.timer=setInterval(()=>{
          this.percent++
        //   console.log(this.percent)
          if(this.percent==100){
              clearInterval(this.timer)
          }
      },1000)
  }
};
</script>

<style scoped>
.contain{
    height: 88%;
    display: flex;
    flex-direction: row;
}
.left{
width: 20%;
height: 94%;
background: rgb(252, 242, 242);
color: #333;
font-weight:500;
font-size: 1rem;
display: flex;
flex-direction: column;
justify-content: space-between;
}

.leftScroll{
    height: 80%;
    overflow-y: scroll; 
}
.leftScroll::-webkit-scrollbar{
    display: none;
}
.showItem{
    padding: 0.8rem;
}
.showItem:hover{
    cursor: pointer;
}
.leftItem .leftItemMain{
     display: block;
     padding: 0.8rem;
}
.leftItem .leftItemMain:hover{
    cursor: pointer;
    background: rgb(233, 223, 223);
}
.leftItem .leftItemMain:visited{
    background: rgb(233, 223, 223);
}
.leftItemTitle{
    color: #aaa;
    /* margin-top: 0.5rem;
    margin-bottom: 0.5rem; */
}
.leftItemTitle:hover{
    cursor: default;;
}
.leftBottom{
    width: 100%;
    height: 4rem;
    border-top: 1px solid rgb(233, 231, 231);
    /* margin-bottom: 0px; */
    background: rgb(236, 217, 217);
    bottom: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

}
.leftBottom img{
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
}
.main{
    width: 80%;
    height: 94%;
    overflow-y: scroll;
    /* background: rgb(11, 165, 236); */
}
.main::-webkit-scrollbar{
    display: none;
}
.playMain{
    position: absolute;
    bottom: 0px;
    height: 4rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* background: red; */
    border-top: 1px solid rgb(233, 231, 231);
}
.playMain1{
    display: flex;
    flex-direction: row;
    align-items: center;
    width:30%;
}
.playMain1 img{
    width: 2rem;
    height: 2rem;
}
.playMain1>:nth-child(n){
    margin-left: 1rem;
}
.playMain1>:nth-child(2){
    margin-left: 2rem !important;
}
.playMain1>:nth-child(3){
    width: 2.5rem;
    height: 2.5rem;
}
.playMain2{
    width: 50%;
    /* width: 20rem; */
    /* min-width: 30rem; */
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* text-overflow: ; */
}
.playMain2 div{
    color: #888;
    font-size: 12px;
}
.playMain3{
    width: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.playMain3>:nth-child(n){
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
}
.playMain3>:first-child{
    width: 1.2rem ;
    height: 1.2rem;
}
.playMain3>:last-child{
    vertical-align: middle;
}
#playMusicIcon{
width: 3rem;
    height: 3rem;
    border-radius: 2.2rem;
}
.userName{
    width: 20%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>