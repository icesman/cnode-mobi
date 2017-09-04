<template>
	<div>
		<footer class="invalid-footer" style="">
			<div class="footer-tab new-post">
				New Post
			</div>
			<div class="footer-tab about-me">
				AboutMe
			</div>
		</footer>
		<footer class="page-footer">
			<div class="footer-tab new-post" @click="changeRouter('editor')">
				New Post
			</div>
			<div class="footer-tab about-me" @click="changeRouter('user')">
				About Me
			</div>
		</footer>
	</div>
</template>

<style>
.footer-tab{
	display: inline-block;
	width: 30px;
	height: 30px;
	font-size: 12px;
	padding: 10px 10px;
}
.invalid-footer{
	text-align: center;
	min-height: 30px;
	width: 100%;
	background-color: #fff;
	z-index: -1;
	visibility: hidden;
}
.page-footer{
	text-align: center;
	min-height: 30px;
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 999;
	background-color: #fff;
	border: 1px solid #eee;
}
</style>

<script>
export default{
	name: 'pageFooter',
	data() {
		return {
		}
	},
	methods: {
		changeRouter(to) {
			this.$router.push({name: to});
		}
	},
	computed:{
		loginStatus() {
			return this.$store.state.isLogin;
		}
	}
}
	
</script>