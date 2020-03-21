import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'



/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});

/**
 * 获取search页面搜索结果
 */

export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
	'extras[]': 'restaurant_activity',
	geohash,
	keyword,
	type: 'search'
});

/**
 * 获取短信验证码
 */

export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
	mobile: phone,
	scene: 'login',
	type: 'sms'
}, 'POST');


/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch('/v1/captchas', {},'POST');


/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {
	[type]: checkNumber,
	type
});


/**
 * 发送帐号
 */

export const sendMobile = (sendData, captcha_code, type, password) => fetch('/v1/mobile/verify_code/send', {
	action: "send",
	captcha_code,
	[type]: sendData,
	type: "sms",
	way: type,
	password,
}, 'POST');


/**
 * 获取服务中心信息
 */

export const getService = () => fetch('/v3/profile/explain');

/**
 * 获取用户信息
 */

export const getUser = () => fetch('/api/user');


/**
 * 手机号登录
 */

var sendLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
	code,
	mobile,
	validate_token
}, 'POST');

/**
*个人中心里编辑地址
*/

export const getAddressList = (user_id) => fetch('/v1/users/'+user_id+'/addresses')

/**
*个人中心里搜索地址
*/

export const getSearchAddress = (keyword) => fetch('v1/pois',{
	keyword:keyword,
	type:'nearby'
})

/**
* 删除地址
*/

export const deleteAddress = (userid, addressid) => fetch( '/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')



/**
 * 账号密码登录
 */
export const accountLogin = (username, password) => fetch('/api/user/login', {"email":username, "password":password}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/api/user/logout', {}, 'POST');


/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');

/**
 * 注册
 */
export const registerUser = (email, name, password) => fetch('/api/user/register', {"email":email, "name":name, "password":password}, 'POST');

export const gettimeseries = () => fetch('/api/type/3');

export const getechart = (tag) => fetch('/api/type/3/'+tag);

export const getrecordtag = () => fetch('/api/type/4');

export const getbodyrecord = (tag) => fetch('/api/type/4/'+tag);

export const makepepredict = (id) => fetch('/app/pe/predict', {"id": id}, 'POST');

export const addrecord = (content) => fetch('/api/type/4', content, 'POST', 'fetch', true);

export const getpepredict = (id) => fetch('/app/pe/predict', {"id": id});

//APP

//ecg 统计信息
export const app_ecg_history = () => fetch('/app/ecg/history');

//获得消息列表联系人
export const app_contacts = () => fetch('/app/contacts');

//获取消息
export const app_getmessage = (to_user_id,offset) => fetch('/app/messages',{
	to: to_user_id,
	offset: offset,
	limit: 20
});

//发送信息
export const app_sendmessage = (to_user_id,content) => fetch('/app/messages',{"to":to_user_id, "content":content}, 'POST');

//体检预测
export const app_pepredict = (tag) => fetch('/app/pe/predict',{id: tag});
