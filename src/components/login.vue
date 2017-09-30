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
            <div class="login-error" v-show="errMsg">
                {{errMsg}}
            </div>
        </div>
    </div>
</template>

<style>
    .login-wrapper {
        text-align: center;
        padding: 10px 10px;
    }

    .login-wrapper .login-input {
        padding-top: 150px;
    }

    .login-wrapper .login-base {
        padding: 10px 10px;
        position: relative;
    }

    .login-input input {
        display: inline-block;
    }

    .login-btn {
        background-color: #03A9F4;
        color: #fff;
        padding: 5px 28px;
    }

    .login-wrapper .login-error {
        border: 1px solid #F44336;
        color: #f44336;

    }

</style>
<script>
	import backbtn from 'components/backbutton'
	import api from 'api/api'

	export default {
		name: 'login',
		data() {
			return {
				accessToken: '',
				backTitle: 'Login'
			}
		},
		methods: {
			toLogin() {
				let nextQuery = window.location.hash.split('=')[1];
				this.$store.dispatch('getLogin', {
						accessToken: this.accessToken,
						toQuery: nextQuery
					}
				);
			}
		},
		computed: {
			isDisabled() {
				return this.accessToken.length > 0 ? false : true;
			},
			errMsg() {
				return this.$store.state.loginErrorMsg;
			}

		},
		components: {
			backbtn
		},
		created() {
			let token = localStorage.getItem('accessToken');
			if (token) {
				this.accessToken = token;
			} else {
				this.accessToken = '';
			}
		}
	}
</script>