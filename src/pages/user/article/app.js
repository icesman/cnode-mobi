/* eslint-disable no-trailing-spaces,no-mixed-spaces-and-tabs,semi,indent,space-before-function-paren */
import Vue from 'vue'
import App from './app.vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import list from 'components/list'
import detail from 'components/article'
import editor from 'components/edit'
import login from 'components/login'
import begin from 'components/begin'
import aboutme from 'components/aboutme'
import api from 'api/api'

Vue.use(Router)
Vue.use(Vuex)

//  define the router
const router = new Router({
	routes: [
		{
			path: '/',
			name: 'root',
			component: begin
		},
		{
			path: '/:type',
			name: 'article',
			component: list
		},
		{
			path: '/detail/:id',
			name: 'detail',
			component: detail
		},
		{
			path: '/edit',
			name: 'editor',
			component: editor,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/user',
			name: 'user',
			component: aboutme,
			meta: {
				requiresAuth: true
			}
		}
	]
})

const store = new Vuex.Store({
	state: {
		isLogin: false,
		accessToken: '',
		loginName: '',
		topicList: [],
		loginErrorMsg: ''
	},
	mutations: {
		login(state) {
			state.isLogin = true;
		},
		logout(state) {
			state.isLogin = false;
		},
		setAccessToken(state, userInfo) {
			state.accessToken = userInfo.token;
			state.loginName = userInfo.loginName;
		},
		setTopicList(state, topicList) {
			state.topicList = topicList;
		},
		setLoginErrorMsg(state) {
			state.loginErrorMsg = 'Token is invalid';
		}
	},
	actions: {
		getList({commit, state}, queryParam) {
			axios.get(api.api + '/topics', {params: queryParam})
				.then((res) => {
					if (res.data.success) {
						commit('setTopicList', res.data.data)
					}
				});
		},
		getLogin({commit, state}, loginParam) {
			console.log(loginParam)
			axios.post(api.api + '/accesstoken',
				{
					accesstoken: loginParam.accessToken
				})
				.then(
					res => {
						if (res.data.success) {
							commit('login');
							commit('setAccessToken',
								{
									token: loginParam.accessToken,
									loginName: res.data.loginname
								}
							);
							router.push({name: loginParam.toQuery});
						}
					}
				).catch(
				err => {
					commit('setLoginErrorMsg');
					console.log(err);
				}
			);
		}
	}
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!store.state.isLogin) {
			next({
				name: 'login',
				query: {to: to.name}
			})
		} else {
			next()
		}
	} else {
		next()
	}
})

new Vue({
	el: '#app',
	render: h => h(App),
	router,
	store
})
