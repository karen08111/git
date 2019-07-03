<template>
</template>

<script>
	import { setToken } from '@/utils/auth'
	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			var arr = decodeURIComponent(window.location.href).split("?");
//			console.log(this.$route.query)
			this.$cookies.set('name',this.$route.query.nick)
			this.$cookies.set('status',this.$route.query.auth_status)
			this.$cookies.set('statusTwxt',this.$route.query.auth_status_test)
//			console.log(this.$route.query.avatar)
			this.$cookies.set('avatar',this.$route.query.avatar)
			setToken(this.$route.query.token)
			this.$router.push("/personal")
//			if(arr[1]){
//	    		var user = arr[1].split("&")
//	    		this.$cookies.set('name',user[0].split("=")[1])
//	    		this.$cookies.set('status',user[3].split("=")[1])
//	    		this.$cookies.set('statusTwxt',user[4].split("=")[1])
//	    		setToken(user[5].split("=")[1])
//	    		var r = /^(https?|\/\/)/i;
//	    		if(r.test(user[1].split("=")[1])){this.$cookies.set('avatar',user[1].split("=")[1])};
//	    		console.log(this.$cookies.get('avatar'))
//				this.$router.push("/personal")
//	    	}
		}
	}
</script>

<style>
</style>