<template>
  <div class="searchMusic">
    <el-autocomplete
    style="width:100%"
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="搜索音乐、歌手、歌词、用户"
    @select="handleSelect"
    icon="search"
  >
  </el-autocomplete>
  
  <div class="TJSong" v-show="searchMusicCount==0||searchMusicCount==''">
    <div>推荐歌单</div>
    <div class="TJDIV">
      <span @click="handleSelect(value)" v-for="(value,key) in TJMusic" :key="key">
        {{value.name}}
      </span>
    </div>
  </div>

  <div v-show="searchMusicCount>0" class="MusicListTitle">歌单({{searchMusicCount}}首)</div>
  <div v-show="searchMusicCount>0" class="MusicListContent">
    <div class="searchMusicTitle">
      <div>现场</div>
      <div >歌名</div>
      <div >艺人</div>
      <div >专辑</div>
      <div >时长</div>
    </div>
    <div class="searchMusicContent" v-for="(value,key) in searchMusicList" :key="key">
      <div><img :src="value.album.artist.img1v1Url" alt="暂无图片" /></div>
      <div @click="goMusicPlay(value)">{{value.name}}</div>
      <div>{{value.artists[0].name}}</div>
      <div>{{value.album.name}}</div>
      <div>{{value.duration|getDuration}}</div>
    </div>
  </div>
  </div>
</template>

<script>
import Axios from 'axios'
import {MusicServer} from '../../config/config'
export default {
name:'hello',
data() {
      return {
        restaurants: [],
        TJMusic:[],
        searchMusicList:[],
        searchMusicCount:'',
        state: '',
        timeout:  null
      };
    },
    filters:{
      getDuration(duration){
        return parseInt(220963/60)%60+":"+duration%60
      }
    },
    methods: {
      goMusicPlay(item){
        // let src=''
        // console.log(item)
        // let musicDetail={
        //   duration:item.duration,
        //   id:item.id,
        //   name:item.name,
        //   album:{
        //       opyrightId:1416601,
        //       id:86339613,
        //       mark:0,
        //       name:"平凡天使",
        //       picId:109951164784376720,
        //       publishTime:1583769600000,
        //       size:1,
        //       status:0,
        //     }
            
          
        // }
        // let musicDetail=JSON.stringify(item)
        Axios.get(MusicServer+'song/url?id='+item.id).then(res=>{
    // src=res.data.data[0].url
    sessionStorage.setItem('musicDetail',JSON.stringify({...item,src:res.data.data[0].url}))
        console.log(sessionStorage.getItem('musicDetail'))
        this.$router.push('/musicPlay')
})
        
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        // clearTimeout(this.timeout);
        // this.timeout = setTimeout(() => {
          cb(results);
          
        // }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        // console.log(item);
        Axios.get(MusicServer+'search?keywords='+item.id).then(res=>{
          // console.log(res)
          if(res.data.code==200){
            this.searchMusicList=res.data.result.songs
            this.searchMusicCount=res.data.result.songCount
          }
          else{
            this.$message({
            message:'搜索失败',
            type:'error',
          })
          }
        })
      }
    },
    mounted() {
      //查询新歌
      Axios.get(MusicServer+'personalized/newsong').then(res=>{
        if(res.data.code==200){
          this.restaurants=res.data.result
          this.restaurants.map(item=>{
            // item.value=0;
            item.value=item.name
          })
        }
        else{
          this.$message({
            message:'网络异常',
            type:'error',
          })
        }
      })
      Axios.get(MusicServer+'personalized?limit=8').then(res=>{
        // console.log(res)
        if(res.data.code==200){
          this.TJMusic=res.data.result
        }
        else{
          this.$message({
            message:'推荐歌单获取失败',
            type:'error',
          })
        }
      })
    }
}
</script>

<style scoped>
.searchMusic{
  padding: 1rem;
}
.TJSong{
  margin-top: 2rem;
}
.MusicListTitle{
   margin: 2rem 0rem;
}
.searchMusicTitle{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* color: rgb(248, 248, 248); */
}
.MusicListContent{
 /* color: rgb(86, 174, 247); */
}
.MusicListContent>:nth-child(even){
  background: rgb(253, 221, 221);
   color: rgb(86, 174, 247);
   padding: 1rem;
}
.MusicListContent>:nth-child(odd){
  background: rgb(245, 128, 128);
   color: rgb(170, 216, 253);
   padding: 1rem;
}
.MusicListContent:hover{
  background: rgb(115, 144, 146);
}
.MusicListContent>:first-child{
  /* background: rgb(228, 227, 227); */
}
.searchMusicContent{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.searchMusicContent>:first-child{
  color: rgb(4, 112, 212);
}
.searchMusicContent img{
  width: 3rem;
  height: 3rem;
}
.searchMusicContent>:nth-child(2):hover{
  text-decoration: underline;
  cursor: pointer;
  color: rgb(39, 149, 252);
}

.TJDIV{
  line-height: 1.2rem;
  /* white-space: normal; */
  /* display: flex; */
  /* flex-direction: row; */
   /* overflow: hidden; */
  /* word-wrap: break-word; */
  
}
.TJDIV span{
 /* white-space: normal;
 word-wrap: break-word; */
 cursor: pointer;
  margin-right: 2rem;
  font-size: 1rem;
  color: #333;
  padding: 0.2rem 1rem ;
  border-radius: 0.9rem;
  border: 1px solid #666;
  min-width: 2rem;
  margin-top: 0.5rem;
  /* white-space: nowrap; */
  display: inline-block;
  /* background: ; */
}
</style>