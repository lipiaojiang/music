<template>
	<div class="player">
		<div class="ctr">
			<div class="pic" :class="{'ani':playFlag}"></div>
			<span class="last iconfont icon-bofangqishangyiqu"></span>
			<span class="play iconfont icon-bofang" v-show="!playFlag" @click.stop="_play"></span>
			<span class="pause iconfont icon-bofangqizanting-copy" v-show="playFlag" @click.stop="_pause"></span>
			<span class="next iconfont icon-bofangqixiayiqu"></span>
			<span class="like iconfont icon-xihuan" :class="{'active': likeFlag}" @click.stop="_like"></span>
			<span class="order iconfont icon-caidan01" v-show="orderFlag === 0" @click.stop="_orderChange"></span>
			<span class="order iconfont icon-xunhuan" v-show="orderFlag === 1" @click.stop="_orderChange"></span>
			<span class="order iconfont icon-iconfontdanqu" v-show="orderFlag === 2" @click.stop="_orderChange"></span>
			<span class="order iconfont icon-suijibofang" v-show="orderFlag === 3" @click.stop="_orderChange"></span>
			<span class="volume iconfont icon-tushubofangqiyousheng" v-show="volumeFlag" @click.stop="_volume"></span>
			<span class="volume iconfont icon-tushuebofangqijingyin" v-show="!volumeFlag" @click.stop="_volume"></span> 	
			<span class="playlist iconfont icon-bofangliebiao" @click.stop="_listShow"><sub>{{ songsList.length}}</sub></span>
		</div>
		<transition name="slide">
			<div class="songs-list" v-show="listFlag && songsList.length>0">
				<div class="title">播放列表</div>
				<div class="content">
					<ul>
						<li v-for="(song, index) in songsList">
							<span class="name">{{ song.name }}</span>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<audio id="audio" :src="played.url" autoplay  :loop="orderFlag===2"></audio>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				playFlag: false,
				orderFlag: 0,
				volumeFlag: true,
				likeFlag: false,
				listFlag: false,
				played: {
					name: "",
	        info: [],
	        time: "",
	        singer: "",
	        lang: "",
	        album: "",
	        url: "",
	        pic: ""
				}
			}
		},
		computed: {
			songsList () {
				return this.$store.state.selectSongs
			}
		},
		watch: {
			'songsList': '_played'
		},
		methods: {
			// 播放
			_play () {
				this.playFlag = true
				document.getElementById('audio').play()
			},
			// 暂停
			_pause () {
				this.playFlag = false
				document.getElementById('audio').pause()
			},
			// 喜欢
			_like () {
				this.likeFlag = !this.likeFlag
			},
			// 播放顺序设置
			_orderChange () {
				this.orderFlag++
				if (this.orderFlag>3) {
					this.orderFlag = 0
				}
			},
			// 静音
			_volume () {
				this.volumeFlag = !this.volumeFlag
				if (this.volumeFlag) {
					document.getElementById('audio').volume = 1.0
				} else {
					document.getElementById('audio').volume = 0.0
				}
			},
			// 设置当前播放歌曲
			_played () {
				this.played = this.songsList[this.songsList.length-1]
				this.playFlag = true
			},
			// 展开播放列表
			_listShow () {
				this.listFlag = !this.listFlag
			}
		}
	}
</script>
<style lang="stylus">
	.player
	  width: 100%
	  height: 60px
	  position: relative
	  z-index: 999
	  border-top: 1px solid #ddd
	  #audio
	  	display: none
	  .ctr
	  	display: flex
	  	width: 100%
	  	height: 60px
	  	background-color: #fff
	  	overflow: hidden
	  	.iconfont
	  		flex: 0 0 40px
	  		width: 40px
	  		height: 60px
	  		text-align: center
	  		line-height: 60px
	  		font-size: 16px
	  	.last, .play, .pause, .next
	  			color: #f00
	  	.last
	  		font-size: 15px
	  	.play
	  		margin-top: -1px
	  	.pause
	  		font-size: 18px
	  	.like
	  		margin-left: 24px
	  		color: #999
	  		&.active
	  			color: #f00
	  	.order, .playlist, .volume
	  		color: #999
	  	.playlist sub
	  		position: relative
	  		top: -6px
	  		font-size: 8px
	  	.pic
	  		flex: 0 0 60px
	  		width: 60px
	  		height: 60px
	  		margin-right: 10px
	  		border-radius: 50%
	  		background-image: url(../assets/img/music.png)
	  		background-size: 80% auto
	  		background-repeat: no-repeat
	  		background-position: center center
	  		&.ani
		  		animation-name: round
		  		animation-duration: 5s
		  		animation-iteration-count: infinite
		  		animation-timing-function: linear
		  		-webkit-animation-name: round
		  		-webkit-animation-duration: 5s
		  		-webkit-animation-iteration-count: infinite
		  		-webkit-animation-timing-function: linear
		.songs-list
			position: absolute
			left: 0
			bottom: 61px
			width: 100%
			height: 30vh
			z-index: -1
			border-top: 1px solid #ddd
			background-color: #fff
			overflow: hidden
			.title
				width: 100%
				height: 32px
				padding: 0 12px
				line-height: 32px
				border-bottom: 1px solid #ddd
			.content
				width: 100%
				height: calc(100% - 33px)
				overflow-x: hidden 
	@keyframes round {
		0% {
			transform: rotateZ(0deg)
			-webkit-transform: routateZ(0deg)
		}
		100% {
			transform: rotateZ(360deg)
			-webkit-transform: rotateZ(360deg)
		}
	}
	.slide-enter-active,.slide-leave-active
		transition: all .5s
	.slide-enter,.slide-leave-active
		transform: translate3d(0, 100%, 0)
		opacity: 0
</style>