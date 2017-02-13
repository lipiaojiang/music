<template>
	<ul class="album-list">
		<li v-for="album in album" @click.stop="_detail(album.info)">
			<img :src="album.pic" alt="">
			<p class="name">{{ album.name }}</p>
			<span class="date">{{ album.date }}</span>
		</li>
	</ul>
</template>
<script>
	export default {
		props: {
			album: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			_detail (info) {
				let url = `/album_detail/${info}`
				this.$router.push(url)
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.album-list
		display: flex
		justify-content: space-between
		li
			flex: 0 0 auto
			padding: 4px
			width: calc(33.33% - 8px)
			max-width: 100px
			.name
				overflow: hidden
				text-overflow: hidden
				white-space: nowrap
				margin: 4px 0
			.date
				font-size: 10px
				color: #999
</style>