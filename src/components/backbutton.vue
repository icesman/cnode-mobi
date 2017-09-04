<template>
	<div class="back" @click="backToPre">
		<a href="">
			&nbsp;{{title}}
		</a>
	</div>
</template>
<style>
.back{
	min-height: 30px;
}
.back a{
	text-decoration-line: none;
}	
.back a:before{
    display: block;
    border: 15px solid;
    border-color: #fff #a9a8a8 #fff #fff;
    content: "";
    position: absolute;
    left: -2px;
    top: 1px;

}
.back a:after{
    display: block;
    border: 15px solid;
    border-color: transparent #fff transparent transparent;
    content: "";
    position: absolute;
    left: 0px;
    top: 1px;
}
</style>
<script>
export default{
	name: 'back',
	data() {
		return {}
	},
	methods:{
		backToPre () {
			this.$router.go(-1);
		}
	},
	props: {
		title: {
			type: String,
			default: ''
		}
	}
}
</script>