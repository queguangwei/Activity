import Api from '../../constants/Api'
import ApiCaller from '../../utils/ApiCaller'
import Cookie from '../../utils/Cookie'
import Runtime from '../../utils/Runtime'
import {
    USER_SYNC_COOKIE_INFO,
    GLOBAL_SWITCH_LOGIN_VISIBLE
} from '../constants/ActionTypes'

const cookieOptions = {
    path: '/',
    domain: Runtime.getDomain()
}

export function globalSwitchLoginVisible(visible) {
    return {
        type: GLOBAL_SWITCH_LOGIN_VISIBLE,
        visible: visible
    }
}

// 同步 cookie 信息
export function userSyncCookieInfo() {
    const cookieInfo = {
        uid: Cookie.get('uid', cookieOptions),
        sid: Cookie.get('sid', cookieOptions),
        phone: Cookie.get('phone', cookieOptions),
        userType: Cookie.get('userType', cookieOptions)
    }
    return {
        type: USER_SYNC_COOKIE_INFO,
        data: !!cookieInfo.uid && !!cookieInfo.sid ? cookieInfo : false
    }
}