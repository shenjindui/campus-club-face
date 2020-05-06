import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import layer from 'vue-layer'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';// 浅绿色主题
import './assets/css/icon.css';
import "babel-polyfill";
import SlideVerify from 'vue-monoplasty-slide-verify';
import Loading  from 'element-ui';
Vue.use(Loading)
Vue.use(SlideVerify);
/**
 * 将引入的组件注册为全局Vue组件
 */
Vue.use(ElementUI);
Vue.prototype.$layer = layer(Vue)
Vue.prototype.$axios = axios;
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
/**
 * main.js设置全局的请求次数，请求的间隙
 * @type {number}
 */
axios.defaults.retry = 2;//设置请求失败重新请求的次数
axios.defaults.retryDelay = 1000;
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    if(!config || !config.retry) return Promise.reject(err);
    config.__retryCount = config.__retryCount || 0;
    if(config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }
    config.__retryCount += 1;
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    return backoff.then(function() {
        return axios(config);
    });
});
/**
 * 后端访问的路径
 * @type {string}
 */
axios.default.baseURL = 'http://localhost:8889'
/**
 * 使用钩子函数对路由进行权限跳转
 */
router.beforeEach((to, from, next) => {
    //这边可以用match()来判断所有需要权限的路径，to.matched.some(item => return item.meta.loginRequire)
    next();
    /*if (!roles && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入
        roles.indexOf('admin') > -1 ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }*/
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
