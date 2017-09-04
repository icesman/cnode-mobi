<template>
	<div class="am-wrapper">
		<backbtn :title="title"></backbtn>
		<div class="personal-info personal-base">
			<div class="personal-avatar">
				<img :src="userInfo.avatar_url" alt="avatar">
			</div>
			<div class="personal-text">
				<div class="login-name">
					{{userInfo.loginname}}
				</div>
			</div>
		</div>

		<div class="recent-topics personal-base">
			<span class="type">我的文章</span>
			<div class="my-topic" v-for="item in userInfo.recent_topics">
				<router-link :to="routerHref(item.id)">
					<div class="topic-title">
						<span>{{item.title}}</span>
					</div>
					<div class="topic-lastreplied">
						<span>最后回复于： {{item.last_reply_at | time('YYYY-MM-DD HH:MM:SS', 'utc')}}</span>
					</div>
				</router-link>
			</div>
		</div>
		<div class="recent-topics personal-base">
			<span class="type">我的回复</span>
			<div class="my-topic" v-for="item in userInfo.recent_replies">
				<router-link :to="routerHref(item.id)">
					<div class="topic-title">
						<span>{{item.title}}</span>
					</div>
					<div class="topic-lastreplied">
						<span>最后回复于： {{item.last_reply_at | time('YYYY-MM-DD HH:MM:SS', 'utc')}}</span>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<style>
.am-wrapper{
	padding: 10px 10px;
}
.am-wrapper .personal-base{
	border: 1px solid #eee;
    border-radius: 10px;
    padding: 10px 10px;
    margin-bottom: 10px;
}
.personal-avatar img{
	width: 10%;
	border-radius: 50%;
}
.am-wrapper .recent-topics{
	text-align: left;
}
.am-wrapper .recent-replies{
	text-align: left;
}
.recent-topics .my-topic{
    background-color: #f0f8ff;
    border-radius: 0.339rem;
    padding: 5px 5px;
    margin-bottom: 5px
}
.recent-topics .type{
	font-size: 16px;
	font-weight: 900;
}
.my-topic .topic-lastreplied{
	padding-top: 5px;
	font-size: 12px;
}
a{
	color: #0d0c0c;
    text-decoration: none;
    text-decoration-line: none;
}
a:visited {
    color: #9f9494;
 }
</style>

<script>
import time from 'vfilters/datefilter'
import backbtn from 'components/backbutton'
export default{
	name: 'aboutme',
	data(){
		return {
			userInfo: {
			},
			title: 'AboutMe'
		}
	},
	methods: {
		routerHref(id){
			return '/detail/' + id;
		}
	},
	created(){
		var that = this;
		var userName = this.$store.state.loginName;
		$.get('/api/user/' + userName, function(res){
			if(res.success){
				that.userInfo = res.data
			}
		})
	},
	components: {
		backbtn
	}
}
</script>