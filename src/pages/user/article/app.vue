<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
      list:[]
    }
  },
  methods: {
    
  },
  created  () {
    var routerObj = {};
    routerObj.path = this.$route.path;
    routerObj.params = this.$route.params;
    routerObj.query = this.$route.query;
    this.$router.push(routerObj);
    // if(this.$route.name === null){
    //   this.$router.push({
    //       name: 'article',
    //       query: {
    //         page: 1
    //       },
    //       params: {
    //         type: 'all'
    //       }
    //     })
    // }else{

    // }
  }
}
</script>

<style>
  body {
    background-color: #fff;
    overflow-x: hidden;
    margin: 0;
  }
  #app {
    text-align: center;
  }
  img{
    max-width: 100%;
    width: auto;
    display: block;
  }
  .btn{
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 2px;
  }
  input {
    display: block;
    height: 23px;
    padding: 5px 5px;
    font-size: 14px;
    line-height: 1.428;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    /*box-shadow: inset 0 1px 1px rgba(0, 0, 0, .75);*/
    outline: none;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }
  
</style>
