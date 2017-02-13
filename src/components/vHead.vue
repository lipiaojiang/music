<template>
  <div class="header">
  	<span class="iconfont icon-jiantou" v-show="history>1" @click="back"></span>
  	<span class="title">云音乐</span>
  </div>
</template>

<script>
export default {
  data () {
  	return {
  		history: 1
  	}
  },
  watch: {
  	'$route': 'routeChange'
  },
  methods: {
  	routeChange () {
      this.history++
    },
    back () {
      window.history.back()
      if (this.history > 0) {
        this.history -= 2
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
	width: 100%
	height: 36px
	font-size: 12px
	color: #fff
	line-height: 36px
	text-indent: 1em
	background-color: #bc2f2e
</style>
