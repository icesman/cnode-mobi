<template>
	<nav class="nav">
      <router-link v-for="item in navList" :to="item">
        <span>{{item.params.type.toUpperCase()}}</span>
      </router-link>
    </nav>
</template>
<style>
.router-link-active{
	border-bottom: 2px solid #03a9f4;
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
	width: 15%;
}
</style>
<script>
export default{
	name : 'navigator',
	data () {
		return {
			navList :[
				{
					name: 'article',
					params: {
						type: 'all'
					},
					query: {
						page: 1
					}
				},
				{
					name: 'article',
					params: {
						type: 'good'
					},
					query: {
						page: 1
					}
				},
				{
					name: 'article',
					params: {
						type: 'share'
					},
					query: {
						page: 1
					}
				},
				{
					name: 'article',
					params: {
						type: 'ask'
					},
					query: {
						page: 1
					}
				},
				{
					name: 'article',
					params: {
						type: 'job'
					},
					query: {
						page: 1
					}
				}
			]
		}
	}
}
</script>