import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import {getStore} from '../config/mUtils'

Vue.use(Vuex)

const state = {
	userInfo: JSON.parse(getStore('user_info')), //用户信息
	shopid: null,//商铺id
	remarkText: null,//可选备注内容
	inputText: '',//输入备注内容
	login: true,//是否登录
	imgPath:null,//头像地址
	removeAddress:[],//移除地址
	addAddress:'',		//新增地址
	question: null,//问题详情
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})