<template>
  <div id="app" @click.stop="hideNav">
    <vHead></vHead>
    <div class="main">
      <navWrap></navWrap>
      <div class="main-right">
        <router-view></router-view>
      </div>
    </div>
    <player></player>
  </div>
</template>

<script>
  import vHead from 'components/vHead'
  import player from 'components/player'
  import navWrap from 'components/navWrap'

  export default {
    name: 'app',
    components: {
      vHead,player,navWrap
    },
    methods: {
      hideNav () {
        this.$store.commit('hideNav')
      }
    }
  }
</script>
<style lang="stylus">
  .main
    width: 100%
    height: calc(100vh - 97px)
    position: relative
    .main-right
      width: calc(100% - 60px)
      height: calc(100% - 24px)
      margin-left: 36px
      padding: 12px
      overflow: hidden
</style>
