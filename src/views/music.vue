<template>
	<div class="music-wrap">
		<div class="title">发现音乐</div>
		<div class="music-menu">
			<ul>
				<li>
					<router-link to="/rank">排行榜</router-link>
				</li>
				<li>
					<router-link to="/hot">热门歌曲</router-link>
				</li>
				<li>
					<router-link to="/singer">歌手</router-link>
				</li>
			</ul>
		</div>
		<div class="content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>
<script>
	export default {}
</script>
<style lang="stylus" scoped>
  .music-wrap
    .title
      font-size: 12px
      color: #999
    .music-menu
      height: 36px
      line-height: 36px
      border-bottom: 1px solid #ddd
      ul
      	display: flex
      	li
      	  margin-right: 24px
      	  font-size: 14px
      	  a
      	    display: block
      	    color: #000
      	    &.active
      	  	  color: #f00
      	  	  border-bottom: 1px solid #f00
    .content
      width: 100%
      height: calc(100vh - 190px)
      margin-top: 12px
      overflow-x: hidden
</style>