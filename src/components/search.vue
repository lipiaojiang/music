<template>
  <div class="search">
  	<div class="search-btn">
  	  <input type="text" placeholder="请输入歌曲名，歌手搜索" class="search-input" v-model="condition">
  	  <span class="iconfont icon-search" @click.stop="_search"></span>
  	</div>
  	<div class="search-result" v-show="searchCount>0">
      <div class="content" v-if="searchResult.length>0">
        <songlist :songs="searchResult"></songlist>
      </div>
      <p v-else>未找到符合条件的歌手或者曲目！</p>
    </div>
  </div>
</template>
<script>
  import songlist from 'components/songlist'
  export default {
    data () {
      return {
      	songs: [],
        searchResult: [],
        condition: null,
        searchCount: 0
      }
    },
    components: {
      songlist
    },
    methods: {
    	_search () {
    		this.searchCount++
    		if (this.condition === null || this.condition.length === 0) {
    			this.searchResult = []
    		} else {
	    		this.searchResult = this.songs.filter((song) => {
	    			return song.singer.indexOf(this.condition) !== -1 || song.name.indexOf(this.condition) !== -1
	    		})
    		}   		
    	}
    },
    created () {
    	this.$http.get('/api/songs').then((res) => {
    		res = res.body
    		if (res.errno === 0) {
    			this.songs = res.data
    		}
    	})
    }
  }
</script>
<style lang="stylus">
  .search-btn
    position: relative
    line-height: 1
    .search-input
      width: calc(100% - 14px)
      padding: 6px
      font-size: 14px
      color: #999
      border: 1px solid #ddd
    .iconfont
      display: block
      width: 28px
      height: 28px
      position: absolute
      top: 1px
      right: 0
      font-size: 20px
      color: #999
      text-align: center
      line-height: 28px
  .search-result
    margin-top: 12px
</style>