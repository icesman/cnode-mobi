<template>

	<div class="content">
		<div class="inner">
			<div id="topic_list">
        <transition-group name="slide-fade" tag="div">
  				<div class="cell" v-for="article in tList" :key="article.id">
            <router-link :to="routerHref(article.id)">
              <div class="topped" v-if="article.top">Topped</div>
              <div class="gooded" v-if="article.good">Good</div>
              <div class="content-top clearfix">
                <div class="left">
                  <a class="user-avatar">
                    <img :src="article.author.avatar_url" :title="article.author.loginname" width="100%">
                  </a>
                </div>
                <div class="right">
                  <div class="title">
                    <div class="content">{{article.title}}</div>
                  </div>
                </div>
              </div>
              <div class="content-bottom clearfix">
                <span class="reply-count">
                  评论[
                  <span class="count-of-replies" title="回复数" v-text="article.reply_count">
                  </span>
                  ]
                </span>
                <span class="created-time">
                    {{article.create_at | time('YYYY-MM-DD HH:MM:SS', 'utc')}}
                </span>
              </div>
            </router-link>
  				</div>
        </transition-group>
			</div>
		</div>
	</div>
</template>

<style scoped>
  .cell{
    padding: 10px 10px;
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,.2);
    min-height: 80px;
    position: relative;
  }
  .cell::after {
    content: "";
    display: block;
    clear: both;
  }
  .user-avatar img{
    border-radius: 5px;
  }
  a{
    color: #0d0c0c;
    text-decoration: none;
    text-decoration-line: none;
  }
  a:visited {
    color: #9f9494;
  }
  .left{
    float: left;
    display: inline-block;
    width: 15%;
  }
  .right{
    float: left;
    width: 80%;
    display: inline-block;
    text-align: left;
    word-wrap: break-word;
    padding: 0px 5px;
  }
  
  .cell .topped{
    color: #4CAF50;
    border: 1px solid #149f0b;
    border-radius: 5px;
    font-size: 10px;
    padding: 1px 2px;
    transform: rotate(40deg);
    width: 35px;
    text-align: center;
    position: absolute;
    top: 25px;
    right: 0;
    z-index: -1;
  }
  .cell .gooded{
    color: #E91E63;
    border: 1px solid #E91E63;
    border-radius: 5px;
    font-size: 10px;
    padding: 1px 2px;
    transform: rotate(40deg);
    width: 35px;
    text-align: center;
    position: absolute;
    right: 20px;
    top: 40px;
    z-index: -1;
  }
  .content-top{
    padding: 5px 0;
  }
  .content-bottom {
    text-align: left;
    font-size: 12px;
    padding: 5px 0;
  }
  .content{
    word-break: break-all;
  }
  .clearfix:before{
    content: " ";
    display: table;
  }

  .clearfix:after{
    content: " ";
    display: table;
    clear: both;
  }
  .clearfix{
    *zoom: 1;
  }

  .router-link-active{
    border-bottom: 2px solid #bacad8;
  }
  .nav{
    padding: 10px 10px;
    border: 1px solid #eee;
  }
  .nav a {
    color: #0d0c0c;
    text-decoration: none;
    text-decoration-line: none;
    display: inline-block;
    width: 20%;
  }
  a:visited {
    color: #9f9494;
  }
img {
  display: inline-block;
  width: auto;
  max-width: 100%;
  overflow: hidden;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<script>
import time from 'vfilters/datefilter'
export default {
  name: 'topic',
  data () {
      return {
          topicList:
          [
          	{
          		author: {
          			loginname: '',
          			avatar_url: ''
          		},
          		author_id: '',
          		content: '',
          		create_at: '',
          		good: false,
          		id: '',
          		last_reply_at: '',
          		reply_count: 0,
              visit_count: 0,
          		tab: '',
          		title: '',
          		top: true
          	}
          ]
      }
  },
  props:{
    tList: Array
  },
  methods:{
    next () {
      this.a+= 1;
    },
    pre () {
      if(this.a - 1 > 0){
        this.a-=1;
      }
    },
    jump (page) {
      this.a = page;
    },
    hrefHandle (hrefId) {
      return 'https://cnodejs.org/topic/' + hrefId;
    },
    routerHref (hrefId) {
      return '/detail/' + hrefId;
    } 
  },
  created () {
  }
}
</script>