<template>
	<div class="singer">
		<div class="filter">
			<div class="lang">
				<strong class="tit">语种:</strong>
				<span v-for="(lang, index) in lang" class="txt" :class="{'active':langFlag === index}" @click.stop="_selectLang(index)">{{ lang }}</span>
			</div>
			<div class="sex">
				<strong class="tit">分类:</strong>
				<span v-for="(sex, index) in sex" class="txt" :class="{'active':sexFlag === index}" @click.stop="_selectSex(index)">{{ sex }}</span>
			</div>
			<div class="first">
				<strong class="tit">筛选:</strong>
				<div class="con">
					<span v-for="(first, index) in first" class="txt" :class="{'active':firstFlag === index}" @click.stop="_selectFirst(index)">{{ first }}</span>
				</div>
			</div>
		</div>
		<ul class="singer-list">
			<li v-for="singer in singer"  @click="_detail(singer.info)">
				<img :src="singer.avatar" alt="">
				<span class="name">{{ singer.name }}</span>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data () {
		return {
			singerData: [],
			singer: [],
			lang: ['全部','华语','英语'],
			sex: ['全部','男','女','乐队组合'],
			first: ['热门','A','B','C','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			langFlag: 0,
			sexFlag: 0,
			firstFlag: 0
		}
	},
	methods: {
		// 语种筛选
		_selectLang (index) {
			this.langFlag = index
			this._filterSinger()		
		},
		// 性别筛选
		_selectSex (index) {
			this.sexFlag = index
			this._filterSinger()
		},
		// 首字母筛选
		_selectFirst (index) {
			this.firstFlag = index
			this._filterSinger()
		},
		// 筛选过滤
		_filterSinger() {
			let a = this.langFlag
			let b = this.sexFlag
			let c = this.firstFlag
			let reslut = this.singerData
			if (a>0) {
				let str = this.lang[a]
				reslut = this.singerData.filter((singer) => {
					return singer.lang === str
				})
			}
			if (b>0) {
				let str = this.sex[b]
				reslut = reslut.filter((singer) => {
					return singer.sex === str
				})
			} 
			if (c>0) {
				let str = this.first[c]
				reslut = reslut.filter((singer) => {
					return singer.first === str
				}) 
			} 
			this.singer = reslut
		},
		// 添加详情路由
		_detail (info)  {
			let url = `/singer_detail/${info}`
			this.$router.push(url)
		}
	},
	created () {
		this.$http.get('/api/singer').then((res) => {
			res = res.body
			if (res.errno === 0) {
				this.singerData = res.data
				this.singer = res.data
			}
		})
	}
}
</script>
<style lang="stylus">
	.filter
		font-size: 12px
		padding-bottom: 6px
		margin-bottom: 10px
		border-bottom: 1px solid #eee
		.lang, .sex
			display: flex
			flex-wrap: wrap
			margin-bottom: 4px
			.tit
				flex: 0 0 auto
				margin-right: 6px
				padding: 4px 0
				color: #666
			.txt
				flex: 0 0 auto
				padding: 4px
				color: #999
				margin: 0 6px
				&.active
					color: #f00
		.first
			flex-wrap: nowrap
			.tit
				float: left
				margin-right: 6px
				padding: 4px 0
				color: #666
			.con
				display: flex
				flex-wrap: wrap
				.txt
					flex: 0 0 auto
					padding: 4px
					color: #999
					margin: 0 6px
					&.active
						color: #f00
				
	.singer-list
		display: flex
		flex-wrap: wrap
		justify-content: space-between
		align-items: center
		li
			flex: 0 0 auto
			padding: 4px
			width: calc(33.33% - 8px)
			max-width: 100px
			.name
				display: block
				text-align: center
				line-height: 2
</style>