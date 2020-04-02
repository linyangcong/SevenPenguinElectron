<template>
  <div id="app">
    <!-- <div class="sevenPenguinTitle">七只企鹅</div> -->
    <div class="goback">
      <div  class="gobackLeft"  @click="goBack">
          <div class="gobackMargin">
            <img src="../img/goback.png" />
          </div>
          <div >七只企鹅</div>
      </div>
      
      <div class="gobackRight">
          <div class="gobackMargin" @click="windowMin">
            <img src="../img/min.png" />
          </div>
          <div class="gobackMargin" @click="windowMax">
            <img src="../img/max.png" />
          </div>
          <div class="gobackMargin" @click="windowClose">
            <img src="../img/close.png" />
          </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {ipcRenderer } from 'electron'
  export default {
    name: 'app',
    datat(){

    },
    methods:{
      goBack(){
        // console.log('返回')
        console.log(this.$router)
        this.$router.go(-1)
      },
      windowMin(){
        // console.log('windowMin')
        ipcRenderer.send('windowMin')
      },
      windowMax(){
        // console.log('windowMax')
        ipcRenderer.send('windowMax')
      },
      windowClose(){
        // console.log('windowClose')
        ipcRenderer.send('windowClose')
      }
    }
  }
</script>

<style>
html,body,#app{
  height: 100%;
  font-family:Microsoft YaHei;
  /* overflow-y:scroll; */
}
html::-webkit-scrollbar,body::-webkit-scrollbar,#app::-webkit-scrollbar{
    display: none;
}
#app{
  background: rgb(252, 249, 248);
}
.goback{
  -webkit-app-region:drag;
  background: rgb(255, 78, 78);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* height: 2.5rem; */
}
.goback div{
  display: inline-block;
  vertical-align: middle;
}
.goback img{
  -webkit-app-region:no-drag;
  height: 1.2rem;
  width: 1.2rem;
  vertical-align: middle;
}
.gobackMargin:hover{
  background: rgb(167, 2, 2);
}
.gobackLeft{
  color: white;
  line-height: 2.5rem;
}
.gobackRight{
  line-height: 2.5rem;
}
.gobackMargin{
  padding: 0rem 0.5rem;
}
</style>