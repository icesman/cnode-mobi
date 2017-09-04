<template>
	<div class="wrapper">
		<backbtn></backbtn>
		<div class="article base">
			<div class="title">
				<h2 v-text="article.title"></h2>
			</div>
			<div class="author">
				<img :src="article.author.avatar_url" class="author-img" />
				<span v-text="article.author.loginname" class="author-name"></span>
				<span class="create">{{article.create_at | time('YYYY-MM-DD HH:MM:SS', 'utc')}}</span>
			</div>
			<div class="content base" v-html="article.content">
			</div>
		</div>
		<div class="reply">
			<div class="reply-wrapper">
				<div class="reply-item base" v-for="item in article.replies">
					<div class="author reply-author">
						<img :src="item.author.avatar_url" class="author-img" />
						<span v-text="item.author.loginname" class="author-name"></span>
					</div>
					<div class="content" v-html="item.content">
					</div>
					<div class="reply-date">
						<span>&nbsp;{{item.create_at | time('YYYY-MM-DD HH:MM:SS', 'utc')}}</span>
						<span v-if="isLogined" class="reply-comment">回复</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.wrapper{
	text-align: left;
	word-wrap: break-word;
}
.base{
	padding: 10px 10px;
}
.content{
	overflow-x: auto;
}
.author{
	padding: 5px 5px;
	background-color: #eee;
}
.create{
	padding: 5px 5px;
	font-size: 10px;
}
.reply-author{
	background-color: #aed7d4;
	border-radius: 5px;
}
.author-img{
	width: 30px;
	height: 30px;
	border-radius: 5px;
	display: inline-block;
}
.article{
	border: 2px solid #eee;
}
.reply{
	margin-top: 10px;
	border: 1px solid #eee;
}
.reply-date .reply-comment{
	float: right;
    border: 1px solid #aed7d4;
    padding: 0px 10px;
    border-radius: 5px;
}

</style>

<script>
import time from 'vfilters/datefilter'
import backbtn from 'components/backbutton'
export default {
	name: 'detail',
	data () {
		return {
			article: {
				id: '',
				author_id: '',
				tab: '',
				content: '',
				title: '',
				last_reply_at: '',
				good: true,
				top: false,
				replt_count: '',
				visit_count: '',
				create_at: '',
				author: {
					loginname: '',
					avatar_url: ''
				},
				replies: [
					{
						id: '',
						author: {
							loginname: '',
							avatar_url: ''
						},
						content: '',
						ups: [],
						create_at: '',
						reply_id: '',
						is_uped:false
					}
				]
			}
		}
	},
	created () {
		var articleId = this.$route.params.id;
		var that = this;
		$.get('/api/topic/'+articleId, {mdrender: true}, function(res){
			if(res.success){
				that.article = res.data;
			}
		})
	},
	components: {
		backbtn
	},
	computed: {
		isLogined(){
			return this.$store.state.isLogin;
		}
	}
}
</script>