import {
	RECORD_USERINFO,
	GET_USERINFO,
	OUT_LOGIN,
	RETSET_NAME,
	SAVE_AVANDER,
	SAVE_QUESTION,
	SAVE_HISTORY,
	SAVE_RECORDHISTORY,
	SAVE_MESSAGE,
	GET_ALLGROUP,
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

import {localapi, proapi} from 'src/config/env'

export default {

	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_info', info);
		// setStore('user_id', info.id);
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.id !== info.id)) {
			return;
		};
		if (!state.login) {
			return
		}
		state.userInfo = info;
	},
	//修改用户名
	[RETSET_NAME](state,username) {
		state.userInfo = Object.assign({}, state.userInfo,{username})
	},
	//退出登录
	[OUT_LOGIN](state) {
		state.userInfo = {};
		state.login = false;
	},
	//保存图片
	[SAVE_AVANDER](state, imgPath) {
		state.imgPath = imgPath;
	},
	//保存所选问题标题和详情
	[SAVE_QUESTION](state, question) {
		state.question = {...question};
	},
	//进入历史记录详情页前保存该信息
	[SAVE_HISTORY](state, historyDetail) {
		state.historyDetail = historyDetail;
	},
	[SAVE_RECORDHISTORY](state, historyRecordDetail) {
		state.historyRecordDetail = historyRecordDetail;
	},
	//保存联系人信息
	[SAVE_MESSAGE](state, infor){
		state.infor={};
		state.infor=infor;
	},
	[GET_ALLGROUP](state,allgroup){
		state.allgroup=allgroup
	},
}
