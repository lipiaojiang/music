<template>
	<div class="popular">
		<ul class="list">
			<li v-for="(rank, index) in rank.ranklist" :data-info="rank.info" @click="_detail(index)">
				<img :src="rank.icon" width="100%" alt="">
				<span class="text">{{ rank.title }}</span>
			</li>
		</ul>
	</div>
</template>
<script>
  export default {
    data () {
    	return {
    		rank: {}
    	}
    },
    methods: {
    	_detail (index) {		
    		let rank = this.rank.ranklist[index]
    		let info = rank.info
    		let router = '/rank_detail/' + info 
    		this.$store.commit('addSelectRank', rank) 		
    		this.$router.push(router)
    	}
    },
    created () {
    	this.$http.get('/api/rank').then((res) => {
    		res = res.body
    		if (res.errno === 0) {
    			this.rank = res.data
    		}
    	})
    }
  }
</script>
<style lang="stylus" scoped>
	.list
		li
			display: flex
			height: 32px
			padding: 0 12px
			line-height: 32px
			font-size: 14px
			align-items: center
			img
				flex: 0 0 16px
				width: 16px
				height: 16px
				align-self: center
			.text
				flex: 1 1 auto
				align-self: center
				margin-left: 12px
				width: 100%
				overflow: hidden
				text-overflow: ellipsis
				white-space: nowrap
</style>