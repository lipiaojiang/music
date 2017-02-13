<template>
	<div class="musci-list">
		<ul>
			<li v-for="(song, index) in songs" :class="[{'active':index%2===0},{'selectActive':selectActive===index}]" @click="select(index)">
				<span class="no">{{ index+1 }}.</span>
				<span class="name" :title="song.name">{{ song.name}}</span>
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
        selectActive: 0,
      }
    },
    methods: {
      select (i) {
        this.selectActive = i
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
  	  // list-style-type: 1
  	  // list-style-position: inside
	  .active
	    background-color: rgba(220, 220, 220, .2)
	  .selectActive
	  	background-color: rgba(220, 220, 220, .4)
	  .time,.singer,.no
	  	flex: 0 0 auto
	  	margin: 0 4px
	  .name
      flex: 1 1 auto
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap      
</style>