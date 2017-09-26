<template>
<div class="editor-wrapper">
	<backbtn></backbtn>
	
	<div class="editor-tab">
		<select name="tab" id="tab" v-model="tab">
			<option value="ask">ask</option>
			<option value="share">share</option>
			<option value="job">job</option>
			<option value="dev" selected>dev</option>
		</select>
	</div>
	<div class="editor-title">
		<input type="text" name="title" id="title" placeholder="文章标题 10字以上" v-model="title">
	</div>
	<div class="editor-content">
		<textarea name="content" id="content" class="content" cols="10" rows="30" placeholder="文章内容" v-model="content"></textarea>
	</div>
	<div class="editor-submit">
		<button class="btn editor-btn" :disabled="isDisabled" @click="newPost">提交</button>
	</div>
	
</div>
</template>
<style>
.editor-wrapper{
	text-align: center;
}
.editor-title{
	padding: 10px 10px;
}
.editor-tab{
	padding: 10px 10px;
}
select#tab{
	-webkit-appearance: none;
	padding: 10px 10px;
	font-size: 15px;
	background-color: #fff;
	width: 100%;
	border:1px solid #eee;
}
.editor-title input[type="text"]{
	width: 98%;
    border: 1px solid #eee;
    height: 35px;
    -webkit-appearance: none;
    padding: 2px 2px;
}
.editor-content{
	padding: 10px 10px;
}
.editor-content .content{
	border: 1px solid #eee;
	padding: 5px 5px;
	-webkit-appearance: none;
	width: 95%;
	overflow: auto;
	word-break: break-all;
}
.editor-submit{
	padding: 10px 10px;
}
.editor-submit .editor-btn{
	background-color: #03A9F4;
    color: #fff;
}
</style>
<script>
import backbtn from 'components/backbutton'
import api from 'api/api'
export default{
	name: 'editor',
	data() {
		return {
			title: '',
			content: '',
			tab: 'dev'
		}
	},
	methods: {
		newPost(event) {
			event.preventDefault();
			$.post(api.api + '/topics', {
				title: this.title,
				tab: this.tab,
				content: this.content,
				accesstoken: this.token
			},
			(res) => {
				if(res.success){
					this.$router.push({name: 'detail', params: {id: res.topic_id}})
				}
			}
			);
		}
	},
	components: {
		backbtn
	},
	computed: {
		isDisabled() {
			return (this.title.length > 10) ? false : true;
		},
		token() {
			return this.$store.state.accessToken;
		}
	}
}
</script>