<template>
	<div class="player">
		<div class="ctr">
			<div class="pic" :class="{'ani':playFlag}"></div>
			<div class="play-btn">
				<span class="last iconfont icon-bofangqishangyiqu" @click.stop="_last"></span>
				<span class="play iconfont icon-bofang" v-show="!playFlag" @click.stop="_play"></span>
				<span class="pause iconfont icon-bofangqizanting-copy" v-show="playFlag" @click.stop="_pause"></span>
				<span class="next iconfont icon-bofangqixiayiqu" @click.stop="_nextSong"></span>
			</div>
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
				<div class="title">
					<span>播放列表</span>
					<span class="deltel" @click.stop="_empty">清空</span>
				</div>
				<div class="content">
					<ul>
						<li v-for="(song, index) in songsList" :class="[{'active':index%2===0},{'selectActive':selectActive===index},{'playing':playedShow === index}]" @click.stop="select(index)">
							<span class="no">{{ index+1 }}.</span>
							<span class="name" :title="song.name">{{ song.name}}</span>
			        <span class="play iconfont icon-bofang" v-show="isPlay === index" @click.stop="_played(index)"></span>
							<span class="time">{{ song.time }}</span>
							<span class="singer">{{ song.singer }}</span>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<audio id="audio" :src="played.url" autoplay  :loop="orderFlag===2" @ended="_ended" @error="_ended"></audio>
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
					type: Object,
					default () {
						return {
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
				selectActive: null,
        isPlay: false
			}
		},
		computed: {
			// 获取选择播放歌曲的数据
			songsList () {
				return this.$store.state.selectSongs
			},
			// 播放列表显示当前播放的歌曲
			playedShow () {
				return this.songsList.indexOf(this.played)
			}
		},
		watch: {
			songsList () {
				if (this.songsList.length>0) {
					this._played(0)
				}
			}
		},
		methods: {
			// 播放
			_play () {
				if( this.songsList.length>0){
					this.playFlag = true
					document.getElementById('audio').play()
				}
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
			_played (index) {
				this.played = this.songsList[index]
				this.playFlag = true
			},
			// 下一曲
			_nextSong () {
				if (this.songsList.length === 0) {
					return
				}
				let index = this.songsList.indexOf(this.played)
				let maxLength = this.songsList.length - 1
				if (index < maxLength) {
					index++
				} else if (this.orderFlag !== 0) {
					index = 0
				} else {
					this._pause()
					return
				}
				// 返回随机索引
				if (this.orderFlag === 3) {
					index = parseInt(Math.random() * maxLength)
				}
				this._played(index)
			},
			// 上一曲
			_last () {
				if (this.songsList.length === 0) {
					return
				}
				let index = this.songsList.indexOf(this.played)
				let maxLength = this.songsList.length - 1
				if (index > 0) {
					index--
				} else if (this.orderFlag !== 0) {
					index = maxLength
				} else {
					this._pause()
					return
				}
				// 返回随机索引
				if (this.orderFlag === 3) {
					index = parseInt(Math.random() * maxLength)
				}
				this._played(index)
			},
			// 当前曲目结束
			_ended () {
				if (this.orderFlag === 2) {
					return
				}
				this._nextSong()
			},
			// 展开播放列表
			_listShow () {
				this.listFlag = !this.listFlag
			},
			select (i) {
				if (i === this.selectActive) {
					this.selectActive = null
					this.isPlay = false
				} else {
					this.selectActive = i
					this.isPlay = i
				}
      },
      // 清空播放列表
      _empty () {
      	this.$store.commit('emptySelectSong')
      	this.played = {}
      	this._pause()
      }
		}
	}
</script>
<style lang="stylus" scoped>
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
	  	.play-btn
	  		flex: 1 0 auto
	  	.iconfont
	  		flex: 0 0 40px
	  		width: 40px
	  		height: 60px
	  		text-align: center
	  		line-height: 60px
	  		font-size: 16px
	  	.last, .play, .pause, .next
	  			display: inline-block
	  			color: #f00
	  	.last
	  		font-size: 15px
	  	.pause
	  		font-size: 18px
	  		line-height: 58px
	  	.like
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
				display: flex
				width: 100%
				height: 32px
				justify-content: space-between
				line-height: 32px
				border-bottom: 1px solid #ddd
				span
					padding: 0 12px
			.content
				width: 100%
				height: calc(100% - 33px)
				overflow-x: hidden 
				ul li
		      display: flex 
		      height: 36px
		      margin: 4px 12px
		      line-height: 36px 
			  .active
			    background-color: rgba(220, 220, 220, .2)
			  .selectActive
		      background-color: rgba(220, 220, 220, .4)
		      animation-name: selectAni
		      animation-duration: .2s
		      animation-iteration-count: 1
		      animation-timing-function: linear
		      -webkit-animation-name: selectAni
		      -webkit-animation-duration: .2s
		      -webkit-animation-iteration-count: 1
		      -webkit-animation-timing-function: linear  
			  .time,.singer,.no
			  	flex: 0 0 auto
			  	margin: 0 4px
			  .name
		      flex: 1 1 auto
		      overflow: hidden
		      text-overflow: ellipsis
		      white-space: nowrap    
		    .play
		      flex: 0 0 36px
		      width: 36px
		      margin-right: 36px
		      color: #999
		      text-align: center
		   	.playing
			  	color: #f00
			  	.play
			  		color: #f00
	@keyframes selectAni {
	    0% {
	      transform: scale(1)
	      -webkit-transform: scale(1)
	    }
	    50% {
	      transform: scale(0.98)
	      -webkit-transform: scale(0.98)
	    }
	    100% {
	      transform: scale(1)
	      -webkit-transform: scale(1)
	    }
	  }     
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