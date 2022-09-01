<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from '@/store/index.js'
export default {
  mounted () {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      localStorage.setItem("isMobile", 0)
      store.commit("common/SET_ISMOBILE", true)
    } else {
      localStorage.setItem("isMobile", 1)
      store.commit("common/SET_ISMOBILE", false)
    }
  }
}
</script>

<style lang="scss">
  @import "/assets/css/iconfont.css";
  @import '/assets/font/iconfont.css';
  @import "./style/global.scss";
</style>
