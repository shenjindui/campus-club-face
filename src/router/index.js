import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            base:"/club",
            name: 'Home',
            component: resolve => require(['../components/club-face/home/Home.vue'],resolve)
        },
        {
            name: 'Passage',
            path: '/passages/:id/detail.html',
            component:resolve => require(['../components/club-face/passage/Passage.vue'],resolve)
        },
        {
            name: 'PassageList',
            path: '/passages',
            component:resolve => require(['../components/club-face/passage/PassageList.vue'],resolve)
        },
        {
            name: 'Club',
            path: '/clubs/:num',
            component:resolve => require(['../components/club-face/club/Club.vue'],resolve)
        },
        {
            name: 'ClubList',
            path: '/clubs',
            component:resolve => require(['../components/club-face/club/ClubList'],resolve)
        },

        {
            path: '/activities/:id/detail.html',
            name: 'Activity',
            component:resolve => require(['../components/club-face/activity/Activity'],resolve)
        },
        {
            name: 'ActivityList',
            path: '/activities',
            component:resolve => require(['@/components/club-face/activity/ActivityList'],resolve)
        },
        {
            name: 'File',
            path: '/files/:id/detail.html',
            component:resolve => require(['@/components/club-face/file/File'],resolve)
        },
        {
            name: 'FileList',
            path: '/files',
            component:resolve => require(['@/components/club-face/file/FileList'],resolve)
        },
    ],
    /*router = new Router({
        mode: "history",
        routes: routes
    })*/
   // mode: "history"//去掉地址栏里边的#号键


})


