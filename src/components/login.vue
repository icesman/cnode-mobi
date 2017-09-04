<template>
	<div class="login-wrapper">
		<backbtn :title="backTitle"></backbtn>
		<div class="login-input">
			<div class="login-input login-base">
				<input type="password" placeholder="Access Token" v-model="accessToken">
			</div>
			<div class="login-submit login-base">
				<button class="btn login-btn" @click="toLogin" :disabled="isDisabled">登陆</button>
			</div>
			<div class="login-error" v-show="msg">
				{{msg}}
			</div>
		</div>	
	</div>
</template>

<style>
.login-wrapper{
	text-align: center;
	padding: 10px 10px;
}
.login-wrapper .login-input{
	padding-top: 150px;
}
.login-wrapper .login-base{
	padding: 10px 10px;
	position: relative;
}
.login-input input{
	display: inline-block;
}
.login-btn{
	background-color: #03A9F4;
	color: #fff;
	padding: 5px 28px;
}
.login-wrapper .login-error{
	border: 1px solid #F44336;

}

</style>
<script>
import backbtn from 'components/backbutton'
export default{
	name: 'login',
	data() {
		return {
			accessToken: '',
			msg: '',
			backTitle: 'Login'
		}
	},
	methods: {
		toLogin() {
			let that = this;
			let request = $.ajax({
				type: 'POST',
				url: '/api/accesstoken',
				data: {accesstoken: that.accessToken},
				success: function(res){
					that.$store.commit('login')
					that.$store.commit('setAccessToken', {token: that.accessToken, loginName: res.loginname})
					localStorage.setItem('accessToken', that.accessToken)
					that.$router.go(-1)
				}
			});

			request.fail(function(res){
				if(res.status === 200){
					that.$store.commit(login)
				}else{
					that.msg = res.statusText;
				}
			});
		}
	},
	computed:{
		isDisabled : function(){
			return this.accessToken.length > 0 ? false : true
		}
	},
	components: {
		backbtn
	},
	created() {
		let token = localStorage.getItem('accessToken');
		if(token){
			this.accessToken = token;
		}else{
			this.accessToken = '';
		}
	}
}
</script>