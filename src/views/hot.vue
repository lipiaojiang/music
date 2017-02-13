<template>
	<div class="hot">
		<songlist :songs="songs"></songlist>
	</div>
</template>
<script>
	import songlist from 'components/songlist'

	export default {
		components: {
			songlist
		},
		data () {
			return {
				songs: []
			}
		},
		created () {
			this.$http.get('/api/songs').then((res) => {
				res = res.body
				if (res.errno === 0) {
					this.songs = res.data
				}
			})
		}
	}
</script>
<style lang="stylus">
	
</style>