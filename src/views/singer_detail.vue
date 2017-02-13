<template>
	<div class="singer-detail">
		<div class="top">
			<div class="tit">歌手</div>
			<div class="content">
				<div class="avatar"><img :src="singer.avatar" alt=""></div>
				<div class="mation">
					<span class="name">{{ singer.name }}</span>
					<div class="num">
						<span class="songs">单曲:<i>{{ songsNum }}</i></span>
						<span class="album">专辑:<i>{{ albumNum }}</i></span>
						<span class="mv">MV:<i>{{ mvNum }}</i></span>
					</div>
				</div>
			</div>
			<div class="bg" :style="{ backgroundImage: bgurl}"></div>
		</div>
		<div class="item-tab-wrap">
			<span class="item-tab" v-for="(tab, index) in tabs" :class="{'active': tabFlag === index}" @click.stop="_tabChange(index)">{{ tab }}</span>
		</div>
		<div class="item-tab-con">
			<songlist v-show="tabFlag === 0" :songs="singer.songs"></songlist>
			<albumlist v-show="tabFlag === 1" :album="singer.album"></albumlist>
			<div class="summary" v-show="tabFlag === 3">{{ singer.summary }}</div>
		</div>
	</div>
</template>
<script>
	import songlist from 'components/songlist'
	import albumlist from 'components/albumlist'

	export default {
		data () {
			return {
				singer: {},
				bgurl: null,
				albumNum: 0,
				songsNum: 0,
				mvNum: 0,
				tabs: ['热门50','专辑','MV','歌手详情'],
				tabFlag: 0 
			}
		},
		components: {
			songlist,albumlist
		},
		watch: {
			singer () {
				this._bgurl()
				this._albumNum()
				this._songsNum()
				this._mvNum()
			}
		},
		methods: {
			// 绑定背景央视地址获取
			_bgurl () {
				this.bgurl = `url(${this.singer.avatar})`
			},
			// 专辑数量
			_albumNum () {
				this.albumNum = this.singer.album.length
			},
			// 单曲数量
			_songsNum () {
				this.songsNum = this.singer.songs.length
			},
			// mv数量
			_mvNum () {
				this.mvNum = this.singer.mv.length
			},
			// 选项卡切换
			_tabChange (index) {
				this.tabFlag = index
			}
		},
		created () {
			let url = `${window.location.hash}`.substring(1)
			this.$http.get(`/api/${url}`).then((res) => {
				res = res.body
				if (res.errno === 0) {
					this.singer = res.data
				}
			})
		}
	}
</script>
<style lang="stylus" scoped>
	.singer-detail
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
				align-items: center
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
					margin-bottom: 12px
					font-size: 14px
				.num 
					span
						margin-right: 12px
					i
						margin-left: 4px
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
		.item-tab-wrap
			display: flex
			height: 24px
			border-bottom: 1px solid #ddd
			.item-tab
				height: 24px
				margin-right: 6px
				padding: 0 12px
				&.active
					color: #f00
					border-bottom: 1px solid #f00
		.item-tab-con
				height: calc(100vh - 276px)
				margin-top: 12px
				overflow-x: hidden
				.summary
					font-size: 12px
					color: #666
					text-indent: 2em
					text-align: justify
					line-height: 1.5
</style>