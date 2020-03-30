<template>
<div style="height:100%">
    <div v-show="ok" class="main">
      <span @click="gosee" >查看功能</span>
      <!-- <span>查看功能</span> -->
    </div>
<iframe :src="IFrame"  id="thisframe2"  v-show="!ok"></iframe>
</div>
</template>

<script>
export default {
name:'redirect',
data(){
    return{
        ok:true,
        IFrame:''
    }
},
methods:{
gosee(){
    this.ok=false,
    this.IFrame='http://localhost:8080/#/'
}
},
mounted(){
    
}
}
</script>

<style scoped>
.main{
    display: flex;
    flex: 1;
    /* vertical-align: middle; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.main span{
    cursor: pointer;
    background: rgb(20, 171, 241);
    padding: 1rem;
    font-size: 1rem;
    color: white;
    border-radius: 0.5rem;
}
.main span:active{
    background: rgb(181, 232, 247);
}
#thisframe2{
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    /* vertical-align: middle; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>