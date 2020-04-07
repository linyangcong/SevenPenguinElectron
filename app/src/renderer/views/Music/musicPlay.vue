<template>
  <div class="musicPlay">
    <div class="musicPlay_top">
      <div class="musicPlay_topLeft">
        <img id='playBar' src="../../../img/playBar.png" />
        <div class="playCircle">
          <img src="http://47.115.124.190/WebView/discovery/d14.jpg" id='circleImg' />
        </div>
        <div class="playCircle_bottom">
          <div>喜欢</div>
          <div>下载</div>
          <div>分享</div>
          <div>收藏</div>
        </div>
        <div class="playing"><span>播放</span></div>
      </div>
      <div class="musicPlay_topRight">
        <div>音乐名</div>
        <div>
          <div>专辑</div>
          <div>歌手</div>
          <div>来源</div>
        </div>
        <div>
          <div  class="lrcItem" v-for="(value,key) in lyrics" :key="key">
            <div >{{value.lrc}}</div>
            <div v-show="showTime">{{value.time}}</div>
          </div>
        </div>
      </div>
    </div>
    <aplayer
      :autoplay='true'
      :music="musicDetail"
      />
    <div class="musicPlay_bottom">
      评论区
    </div>
  </div>
</template>

<script>

import Axios from 'axios'
import { MusicServer } from '../../config/config'
export default {
name:'musicPlay',
data(){
    return{
      lyrics:[],
      showTime:false,
      musicObject:'',
      musicDetail:{
        src:JSON.parse(sessionStorage.getItem('musicDetail')).src,
        title:'message',
        artist:'林养从',
        pic:'http://47.115.124.190/WebView/User/u3.jpg'
      }
    }
},
// components:{
//   'vue-aplay':VueAplay
// },
props:['playing'],
watch:{
  playing(newVal,oldVal){
    console.log(newVal,oldVal)
    if(newVal){
      let playBar=document.getElementById('playBar')
      playBar.style='-webkit-animation: rotation1 1s linear 1 ; -webkit-animation-fill-mode:forwards;'
    }
    else{
      playBar.style='-webkit-animation: rotation2 1s linear 1 ; -webkit-animation-fill-mode:forwards;'
    }
  }
},
methods:{
loadLyrics(){
  this.lyrics=this.getLyrics().split('\n')
},
getLyrics(){
  return `管群华\n离开温暖的家\n告别亲爱的她\n 来不及同亲人吃一顿团圆饭\n匆匆启程去与病毒奋勇拼杀\n临危不惧生死不怕\n尽力救治病中的他\n离开幸福的家\n告别亲爱的他\n来不及同亲友说一句拜年的话\n风雨兼程去同毒魔奋力搏杀\n与死神赛跑担当天职\n抢救生命绽放那芳华\n啊，白衣战士你真美\n亿万人民将你夸\n你是新时代最可敬的人\n天佑你啊，盼你平安回家\n[责编:夏博]\n[来源:华声在线]\n`
},
getMusicObject(){
  let music=JSON.parse(sessionStorage.getItem('musicDetail'))
  this.musicDetail={
    ...this.musicDetail,
    title:music.name,
    artist:music.artists[0].name,
    pic:music.artists[0].img1v1Url,
  }
  // console.log(music.id)
Axios.get(MusicServer+'lyric?id='+music.id).then(res=>{
  // console.log(res)
  if(res.data.code==200){
    this.lyrics=[]
    let lrcs=res.data.lrc.lyric.split('\n')
    lrcs.map(item=>{
      if(/\[\d{2}:\d{2}.\d{3}\]/.test(item)){
        let time=item.match(/\d{2}:\d{2}.\d{3}/)[0]
        let lrc=item.split(/\[\d{2}:\d{2}.\d{3}\]/)[1]
        this.lyrics.push({time,lrc})
      }
      else{
        // return ;
      }
      
    })
  }
})
}
},
mounted(){
  if(this.playing!==undefined){
    this.loadLyrics()
  }else{
    this.getMusicObject()
  }

}
}
</script>

<style scoped>
#circleImg{
  /* -webkit-transform: rotate(360deg); */
  -webkit-animation: rotation0 10s linear infinite;
}
@-webkit-keyframes rotation0{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
  }
.musicPlay{
  background: rgb(230, 228, 228);
  display: flex;
  flex-direction: column;
}
.musicPlay_top{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  /* height: 1rem;; */
}
.musicPlay_topLeft{
  width: 50%;
  /* margin-top: 1rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.musicPlay_topRight{
  margin-top: 2rem;
  width: 50%;
  color: #333;
  max-height: 26rem;
  overflow-y: scroll;
}
.musicPlay_topRight::-webkit-scrollbar{
  display: none;
}
#playBar{
  /* top: 1.5rem; */
  /* left: 25%; */
  /* position: absolute; */
  margin-left: 25%;
  z-index: 500;
  width: 10rem;
  height:7rem;
  -webkit-transform-origin: left top;
  /* -webkit-animation: rotation1 1s linear 1; */
  /* -webkit-animation-fill-mode : forwards; */
  
  /* -webkit-animation-iteration-count: 1;  */
  /* -webkit-transform: rotate(10deg,30deg); */
}

@-webkit-keyframes rotation2{
  from {-webkit-transform: rotate(25deg);}
  to {-webkit-transform: rotate(0deg);}
}
@-webkit-keyframes rotation1{
  /* 0%{
    -webkit-transform: rotate(0deg);
  }
  100%{
    -webkit-transform: rotate(25deg)
  } */
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(25deg);}
  }
.playCircle{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: black;
  border-radius: 10rem;
  width: 20rem;
  height: 20rem;
}
.playCircle img{
  width: 14rem;
  height: 14rem;
  border-radius: 7rem;
}
.playCircle_bottom{
  margin: 2rem 4rem ;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between;
  align-items: center; */
}
.playCircle_bottom>:nth-child(n){
   background: rgb(243, 240, 240);
   padding: 0.3rem 0.6rem;
   margin: 0rem 0.2rem;
   font-size: 0.8rem;
   color: #666;
   border: 1px solid rgb(204, 200, 200);
   cursor: default;
   white-space: nowrap;
}
.playing{
  background: rgb(197, 88, 80);
  width: 80%;
  text-align: center;
  padding: 0.5rem 0rem;
  color: white;
  cursor: default;
}
.musicPlay_topRight>:nth-child(1){
  font-size: 1.5rem;
  /* font-weight: bold; */
  color: #333;
  line-height: 2rem;
}
.musicPlay_topRight>:nth-child(2){
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  line-height: 2rem;
}
.musicPlay_topRight>:nth-child(2)>:nth-child(n){
  margin-right: 0.5rem;
}
.musicPlay_topRight>:nth-child(3)>:nth-child(n){
  line-height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: default;
}
.lrcItem:hover{
 background: #666;
  color: white;
}

.musicPlay_bottom{
  margin-top: 2rem;
  border-top: 1px solid rgb(207, 204, 204);
  background: #fff;
}
</style>