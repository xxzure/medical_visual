import App from '../App'

const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const chat = r => require.ensure([], () => r(require('../page/chat/chat')), 'chat')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const register = r => require.ensure([], () => r(require('../page/register/register')), 'register')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const history = r => require.ensure([], () => r(require('../page/history/history')), 'history')
const historyDetail = r => require.ensure([], () => r(require('../page/history/children/historyDetail')), 'historyDetail')
const historyRecordDetail = r => require.ensure([], () => r(require('../page/history/children/historyRecordDetail')), 'historyRecordDetail')
const addHistoryRecord = r => require.ensure([], () => r(require('../page/history/children/addHistoryRecord')), 'addHistoryRecord')
const chatbox = r => require.ensure([], () => r(require('../page/chat/children/chatbox')), 'chatbox')

const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const setusername = r => require.ensure([], () => r(require('../page/profile/children/children/setusername')), 'setusername')
const address = r => require.ensure([], () => r(require('../page/profile/children/children/address')), 'address')
const add = r => require.ensure([], () => r(require('../page/profile/children/children/children/add')), 'add')
const addDetail = r => require.ensure([], () => r(require('../page/profile/children/children/children/children/addDetail')), 'addDetail')

const service = r => require.ensure([], () => r(require('../page/service/service')), 'service')
const questionDetail = r => require.ensure([], () => r(require('../page/service/children/questionDetail')), 'questionDetail')
const find = r => require.ensure([], () => r(require('../page/find/find')), 'find')
const download = r => require.ensure([], () => r(require('../page/download/download')), 'download')




export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/msite',
            // meta: {
            //     requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            // },
        },
        //所有商铺列表页
        {
            path: '/msite',
            component: msite,
            meta: { keepAlive: true,requireAuth: true, },
        },
        //聊天页
        {
            path: '/chat',
            component: chat,
            meta: { requireAuth: true, },
            children: [{
                path: 'chatbox',
                component: chatbox,
                meta: { requireAuth: true, },
            },]
        },
        //登录注册页
        {
            path: '/login',
            component: login
        },
        {
            path: '/register',
            component: register
        },
        //个人信息页
        {
            path: '/profile',
            component: profile,
            meta: { requireAuth: true, },
            children: [{
                path: 'info', //个人信息详情页
                component: info,
                meta: { requireAuth: true, },
                children: [{
                    path: 'setusername',
                    component: setusername,
                    meta: { requireAuth: true, },
                },{
                    path: 'address',
                    component: address,     //编辑地址
                    meta: { requireAuth: true, },
                    children:[{
                        path:'add',
                        component:add,
                        meta: { requireAuth: true, },
                        children:[{
                            path:'addDetail',
                            component:addDetail,
                            meta: { requireAuth: true, },
                        }]
                    }]
                }]
            },
            {
                path: 'service', //服务中心
                component: service,
                meta: { requireAuth: true, },
            },]
        },
        //修改密码页
        {
            path: '/forget',
            component: forget,
            meta: { requireAuth: true, },
        },
        //历史记录
        {
            path: '/history',
            component: history,
            meta: { requireAuth: true, },
            children: [{
                path: 'historyDetail',
                component: historyDetail,
                meta: { requireAuth: true, },
            },{
                path: 'historyRecordDetail',
                component: historyRecordDetail,
                meta: { requireAuth: true, },
            },{
                path: 'addHistoryRecord',
                component: addHistoryRecord,
                meta: { requireAuth : true, }
            },]
        },
        //发现页
        {
            path: '/find',
            component: find,
            meta: { requireAuth: true, },
        },
        //下载页
        {
            path: '/download',
            component: download,
            meta: { requireAuth: true, },
        },
        //服务中心
        {
            path: '/service',
            component: service,
            meta: { requireAuth: true, },
             children: [{
                path: 'questionDetail', //订单详情页
                component: questionDetail,
                meta: { requireAuth: true, },
            }, ]
        },
    ]
}]
