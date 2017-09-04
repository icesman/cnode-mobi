<template>
	<div>
		<navbar></navbar>
		<div class="begin-content">
			<p>
				This is a webapp based on Vue, Vue-Router and Vuex.
				Please choose one of the tab to view.
			</p>
		</div>
	</div>
</template>

<style>
.begin-content {
	padding: 50px 10px;
	font-size: 16px;
	font-weight: 500;
}
</style>

<script>
import navbar from 'components/nav'
export default{
	name: 'begin',
	data() {
		return {

		} 
	},
	components: {
		navbar
	}
}
</script>