<template>
	<div class="album-detail">
		<div class="top">
			<div class="tit">专辑</div>
			<div class="content">
				<div class="avatar"><img :src="album.avatar" alt=""></div>
				<div class="mation">
					<span class="name">{{ album.name }}</span>
					<div class="txt">
						<span class="singer">歌手:<i>{{ album.singer }}</i></span>
						<span class="date">发行时间:<i>{{ album.date }}</i></span>
					</div>
				</div>
			</div>
			<div class="bg" :style="{ backgroundImage: bgurl}"></div>
		</div>
		<songlist :songs="album.songs"></songlist>
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
				album: {},
				bgurl: null
			}
		},
		methods: {
			// 绑定背景央视地址获取
			_bgurl () {
				this.bgurl = `url(${this.album.avatar})`
			}
		},
		watch: {
			'album': '_bgurl'
		},
		created () {
			let url = `${window.location.hash}`.substring(1)
			this.$http.get(`/api${url}`).then((res) => {
				res = res.body
				if (res.errno === 0) {
					this.album = res.data
				}
			})
		}
	}
</script>
<style lang="stylus" scoped>
	.album-detail
		position: relative
		.top
				width: 100%
				padding: 12px
				position: relative
				top: -12px
				left: -12px
				background: linear-gradient(top, rgba(0, 0, 0, .1) 0%, rgba(255, 255, 255, 1) 100%)
				background: -webkit-linear-gradient(top, rgba(0, 0, 0, .1) 0%, rgba(255, 255, 255, 1) 100%)
				.tit
					font-size: 12px
					color: #999
					margin-bottom: 12px
				.content
					display: flex
					.avatar
						flex: 0 0 80px
						width: 80px
						height: 80px
						margin-right: 12px
						overflow: hidden 
						img
							width: 80px
							height: 80px
					.name
						display: block
						margin-bottom: 24px
						font-size: 12px
						font-weight: 700
						color: #666
					.txt
						 i
							padding: 0 4px
							font-style: normal
							color: #999
			.bg
					width: 100%
					height: 100%
					position: absolute
					top: 0
					left: 0
					opacity: 0.1
					background-repeat: no-repeat
					background-size: 100% auto
					background-position: center center
					z-index: -1
</style>