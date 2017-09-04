<template>
  <div class="button-group">
    <button class="btn page-btn" v-on:click="decrease()">pre</button>
    <input class="page-input" name="pageNum" onfocus="this.select()" v-bind:value="currentPage" v-on:keyup.enter="jump($event)" v-on:keydown="keyDown"/>
    <button class="btn page-btn" v-on:click="increase()">next</button>
  </div>
</template>

<script>
export default {
  name: 'button',
  props: {
      parentNum: Number
  },
  data () {
      return {
          num: this.parentNum
      }
  },
  methods:{
      increase (){
        this.num+=1;
        this.$emit('increase');
      },
      decrease () {
        this.num-=1;
        this.$emit('decrease')
      },
      jump (event) {
        let page = event.target.value.trim();
        this.$emit('setPage', parseInt(page))
        this.num = parseInt(page);
      },
      keyDown (e) {
        const key = e.keyCode;
        const condition = (key >= 48 && key <= 57) || key == 8 || key == 37 || key == 39;
        if (!condition) {
            e.preventDefault();
        }
      }
  },
  computed : {
    currentPage () {
      this.num = this.parentNum;
      return this.parentNum;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .button-group {
    display: inline-block;
    padding: 10px 10px;
  }
  input {
    display: inline-block;
  }
  .page-input {
    display: inline-block;

  }
  .page-btn{
    background-color: #03A9F4;
    color: #fff;
  }
</style>
