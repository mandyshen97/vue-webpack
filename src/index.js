// index.js

/**
 * 入口文件
 */
import Vue from 'vue';
import App from './App.vue';

import './assets/styles/test.css';
import './assets/images/bg.jpg';
import './assets/styles/test-stylus.styl';

const root = document.createElement('div');
document.body.appendChild(root);

// 创建Vue对象，将App组件挂载到root节点
new Vue({
  render: (h) => h(App)
}).$mount(root)