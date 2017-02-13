<template>
	<div class="player">
		<div class="ctr">
			<div class="pic" :class="{'ani':playFlag}"></div>
			<span class="last iconfont icon-bofangqishangyiqu"></span>
			<span class="play iconfont icon-bofang" v-show="!playFlag" @click.stop="_play"></span>
			<span class="pause iconfont icon-bofangqizanting-copy" v-show="playFlag" @click.stop="_pause"></span>
			<span class="next iconfont icon-bofangqixiayiqu"></span>
		</div>
		<audio id="audio" src="http://fs.web.kugou.com/818b54e04e0b975f81b79c91d3edbaea/58a1a262/G005/M02/0F/15/pYYBAFT-7_mAInnXADtA_E1NT7Q348.mp3" ></audio>
	</div>
</template>
<script>
export default {
	data () {
		return {
			playFlag: false
		}
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
		}
	}
}
</script>
<style lang="stylus">
	.player
	  width: 100%
	  height: 60px
	  border-top: 1px solid #ddd
	  overflow: hidden
	  #audio
	  	display: none
	  .ctr
	  	display: flex
	  	width: 100%
	  	height: 60px
	  	.iconfont
	  		flex: 0 0 40px
	  		width: 40px
	  		height: 60px
	  		text-align: center
	  		line-height: 60px
	  		font-size: 16px
	  		color: #f00
	  	.last
	  		font-size: 15px
	  	.play
	  		margin-top: -1px
	  	.pause
	  		font-size: 18px
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
		
</style>