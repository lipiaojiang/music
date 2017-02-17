import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex);
Vue.use(VueResource)

const store = new Vuex.Store ({
  state: {
  	isNavShow: false,
    selectRank: {
      title: "",
      info: "",
      icon: ""
    },
  	selectSongs: []
  },
  getters: {
  	navShow: state => state.navShow,
    selectRank: state => state.selectRank,
    selectSongs: state => state.selectSongs
  },
  mutations: {
  	// 左侧导航展开
  	navShow (state) {
  		state.isNavShow = !state.isNavShow
  	},
    // 点击空白或其他位置收起导航
    hideNav (state) {
      state.isNavShow = false
    },
    // 选择的榜单
    addSelectRank (state, data) {
      state.selectRank = {...(state.selectRank), ...data}
    },
    // 添加选择的歌曲
    addSelectSong (state, data) {
      if (state.selectSongs.indexOf(data) !== -1) {
        return
      } 
      state.selectSongs.unshift(data)
    },
    // 清空播放列表
    emptySelectSong (state) {
      state.selectSongs = []
    }
  },
  actions: {

  }
})

export default store