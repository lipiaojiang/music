<template>
	<div class="musci-list">
		<ul>
			<li v-for="(song, index) in songs" :class="[{'active':index%2===0},{'selectActive':selectActive===index}]" @click.stop="select(index)">
				<span class="no">{{ index+1 }}.</span>
				<span class="name" :title="song.name">{{ song.name}}</span>
        <span class="play iconfont icon-bofang" v-show="isPlay === index" @click.stop="_add(song)"></span>
				<span class="time">{{ song.time }}</span>
				<span class="singer">{{ song.singer }}</span>
			</li>
		</ul>
	</div>
</template>
<script>
  export default {
  	props: {
  		songs: {
  			type: Array,
  			default () {
  				return []
  			}
  		}
  	},
    data () {
      return {
        selectActive: null,
        isPlay: false
      }
    },
    methods: {
      select (i) {
        if (i === this.selectActive) {
          this.selectActive = null
          this.isPlay = false
        } else {
          this.selectActive = i
          this.isPlay = i
        }
      },
      // 添加到播放列表
      _add (song) {
        this.$store.commit('addSelectSong', song)
      }
    }
  }
</script>
<style lang="stylus">
  .musci-list
  	font-size: 12px
  	color: #666
  	ul li
      display: flex 
      height: 36px
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
</style>