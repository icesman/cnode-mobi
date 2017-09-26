<template>
	<div>
		<navbar></navbar>
		<topic :tList="list"></topic>
		<ButtonCom v-on:increase="next" v-on:decrease="pre" v-on:setPage="jump" v-bind:parentNum="param.page"></ButtonCom>
		<pagefooter></pagefooter>
	</div>
</template>

<style>
a:visited {
	color: #9f9494;
}
img {
	display: inline-block;
	width: auto;
	max-width: 100%;
	overflow: hidden;
}
</style>

<script>
import topic from 'components/topic'
import ButtonCom from 'components/pagenav'
import navbar from 'components/nav'
import pagefooter from 'components/tab'
import api from 'api/api'

import { mapState } from 'vuex'


export default{
	name: 'list',
	data () {
		return {
			list: [],
			param: {
				page: 1,
				tab: '',
				limit: 10,
				mdrender: true
			}
		}
	},
	methods: {
		getArticle (parameter) {
		    this.$router.push({
		    	name: 'article',
		    	query: {
		    		page: parameter.page
		    	}
		    })
		},
		next () {
	      this.param.page+= 1;
	      this.getArticle(this.param)

	    },
	    pre () {
	      this.param.page-=1;
	      this.getArticle(this.param)
	    },
	    jump (page) {
	      this.param.page = page;
	      this.getArticle(this.param)
	    }
	},
	created () {
		let tabType = this.$route.params.type ?  this.$route.params.type : 'all';
		let page = +this.$route.query.page ? +this.$route.query.page : 1;
		this.param = {page: page, tab: tabType, limit: 10, mdrender: true}
		$.get(api.api + '/topics', this.param, (res) => {
			if(res.success){
		        this.list = res.data;
		      }
		});
	},
	components: {
		topic,
		ButtonCom,
		navbar,
		pagefooter
	},
	watch: {
    '$route' (to, from) {
    	let page = +to.query.page;
    	let tabType = to.params.type;
    	this.param = { page: page, tab: tabType, limit: 10, mdrender: true };
    	this.getArticle(this.param);
    	$.get(api.api + '/topics', this.param, (res) => {
    		if(res.success){
		        this.list = res.data;
		      }
    	})
    }
  }
}
</script>