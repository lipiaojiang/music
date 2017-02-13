<template>
	<div class="nav-wrap" :class="{navShow:isNavShow}" @click.stop="">
    <ul>
      <li>
        <span class="iconfont icon-caidan01" @click.stop="navShow"></span>
      </li>
      <li>
        <router-link to="/search">
          <span class="iconfont icon-search"></span>
          <span class="text">搜索</span>
        </router-link>
      </li>
      <li>
        <router-link to="/" exact>
          <span class="iconfont icon-yinle"></span>
          <span class="text">发现音乐</span>
        </router-link>
      </li>
      <li>
        <router-link to="/mv">
          <span class="iconfont icon-mv"></span>
          <span class="text"> MV</span>
        </router-link>
      </li>
      <li>
        <router-link to="/dynamics">
          <span class="iconfont icon-iconset0203"></span>
          <span class="text">朋友</span>
        </router-link>
      </li>
      <li>
        <span class="iconfont icon-next"  @click.stop="navShow" v-show="!isNavShow"></span>
      </li>
    </ul>
    <div class="user-wrap" v-show="!isNavShow">
      <span class="iconfont icon-icon04"></span>
      <span class="iconfont icon-youxiang"></span>
      <span class="iconfont icon-bofangqishezhi"></span>
    </div>
    <div class="user-wrap user-wrap-horizontal" v-show="isNavShow">
      <span class="iconfont icon-icon04"></span>
      <span class="user-name">登陆</span>
      <span class="iconfont icon-youxiang"></span>
      <span class="iconfont icon-bofangqishezhi"></span>
    </div>
  </div>
</template>
<script>
	export default {
		computed: {
			isNavShow () {
				return this.$store.state.isNavShow
			}
		},
		methods: {
			navShow () {
      	this.$store.commit('navShow')
    	}
		}
	}
</script>
<style lang="stylus" scoped>
.nav-wrap
  width: 36px
  height: 100%
  position: absolute
  top: 0
  left: 0
  font-size: 16px
  text-align: center
  background: #f3f3f5
  overflow: hidden
  transition: width .5s ease .2s
  z-index: 99
  &.navShow
    width: 40vw
    border-right: 1px solid #ddd
  li
    width: 40vw
    height: 36px
    text-align: left
    &:first-child
      margin-top: 12px
    a
      display: block
      font-size: 0
      &.active
        color: #000
        border-left: 1px solid #f00
        background-color: #e4e4e4
    .iconfont
      display: inline-block
      width: 36px
      height: 100%
      margin-right: 2px
      text-align: center
      vertical-align: middle
      line-height: 36px
      color: #666
      &.icon-caidan01
        color: #000
    .text
      line-height: 36px
      font-size: 12px
      color: #666
      vertical-align: middle
  .user-wrap
    width: 100%
    position: absolute
    bottom: 0
    left: 0
    border-top: 1px solid #ddd
    &.user-wrap-horizontal
      display: flex
    span
      display: inline-block
      height: 24px
      margin: 6px
      line-height: 24px
      &.iconfont 
        width: 24px
        font-size: 14px
        color: #666
        vertical-align: middle
      &.user-name
        flex: 1 1 auto
        text-align: left
        font-size: 10px
        color: #666
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap;
      &:first-child
        &.iconfont
          width: 24px
          height: 24px
          font-size: 24px
          line-height: 24px
          color: #fff
          border-radius: 50%
          background-color: #d4d4d4
</style>