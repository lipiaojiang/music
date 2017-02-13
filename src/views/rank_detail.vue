<template>
	<div class="rank-detail">
		<div class="title"><img :src="rankActive.icon" alt="">{{ rankActive.title }}</div>
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
		computed: {
			rankActive () {
				return this.$store.state.selectRank
			}
		},
		methods: {
			_songfilter (data) {
				let result = []
				let _info = window.location.hash.split('/').reverse()[0]
				_info = parseInt(_info)
				data.forEach((song) => {
					if (song.info.indexOf(_info) !== -1) {
						result.push(song)
					}
				})
				this.songs = result
			}
		},
		created () {
			this.$http.get('/api/songs').then((res) => {
				res = res.body
				if (res.errno === 0) { 
					this._songfilter(res.data)
				}
			})
		}
	}
</script>
<style lang="stylus" scoped>
	.title
		padding: 6px 0
		font-size: 12px
		font-weight: 200
		color: #666
		border-bottom: 1px solid #eee
		margin-bottom: 12px
		img
			width: 16px
			margin-right: 4px
			vertical-align: middle
</style>