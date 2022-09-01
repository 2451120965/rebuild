// import { Loading } from 'element-ui'
import Vue from 'vue'

let loading// loading框设置局部刷新，且所有请求完成后关闭loading框
function startLoading (targetdq, text) {
  loading = Vue.prototype.$loading({
    lock: true,
    text: text,
    spinner: 'el-icon-loading',
    background: 'rgba(255,255,255,.4)',
    target: document.querySelector(targetdq) // 设置加载动画区域
  })
}

function endLoading () {
  loading.close()
}

export function showFullScreenLoading (targetdq, text = '努力加载中') {
  startLoading(targetdq, text)
}

export function hideFullScreenLoading () {
  endLoading()
}

export function setLoadingText (text) {
  loading.text = text
}

export function changeLoadingText (text = '努力加载中') {
  loading.text = text
}

export default {
  showFullScreenLoading, //展示loading
  hideFullScreenLoading, //结束对应顺序的loading
  changeLoadingText, //改变loading提示词
}
