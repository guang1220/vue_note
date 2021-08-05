import Vue from 'vue'
import ElementUI from 'element-ui'
import store from './store/index'
import './hljs'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import App from './App'
import router from './router'

/*

问题(按需使用)：这样使用会在页面渲染的时候会出现高亮效果，但是这导致的问题是，切换路由的时候代码高亮会消失。之所以产生这种现象，这跟 hljs.initHighlightingOnLoad()的定义有关，因为只执行一次。
可以重写 hljs.initHighlighting()方法，在组件的中是使用 hljs.highlightCode()，每次页面加载的时候都会执行渲染代码的逻辑
//在main.js中
import hljs from 'highlight.js'
hljs.highlightCode = function () {
	//自定义highlightCode方法，将只执行一次的逻辑去掉
	let blocks = document.querySelectorAll('pre code');
	[].forEach.call(blocks, hljs.highlightBlock);
};
//在组件中
export default {
  mounted(){
     hljs.highlightCode()
  }
}

*/
// 暂时用不上
// import hljs from 'highlight.js'
// hljs.highlightCode = function () {
//   //自定义highlightCode方法，将只执行一次的逻辑去掉
//   let blocks = document.querySelectorAll('pre code');
//   [].forEach.call(blocks, hljs.highlightBlock);
// };



// use
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
