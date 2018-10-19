import request from 'superagent'
import Sign from './Sign'
import Cookie from './Cookie'
import Global from '../constants/Global'
import {getDomain} from './Runtime'
import {notification} from 'antd'

function getCommonHeader() {
    const domain = getDomain()
    const cookieOptions = {
        domain: domain,
        path: '/'
    }
    const signRes = Sign.signMd5()
    let cookieData = {}
    let cookies = {}
    const sid = Cookie.get('sid', cookieOptions) || ''
    const uid = Cookie.get('uid', cookieOptions) || ''
    const userId = Cookie.get('userId', cookieOptions) || ''

    cookieData = eval('(' + Cookie.get('cookies', cookieOptions) + ')')
    cookies = cookieData ? cookieData : {}
    // 通用参数
    const commonParams = {
        cClientType: 1, // 浏览器
        cUserId: Cookie.get('uid', cookieOptions),
        cSid: sid || 0,
        cAddress: '',
        cLongitude: -1,
        cLatitude: -1,
        cSoftVersion: '',
        cSystemVersion: '',
        cDeviceId: '',
        cSignVersion: 1,
        cTime: signRes.time,
        cSign: signRes.sign,
        cSpreadCode: Cookie.get('spreadCode', cookieOptions),
        sid: sid,
        uid: uid,
        userId: userId,
        loginSource: 1
    }
    commonParams['Content-Type'] = "application/x-www-form-urlencoded"
    return commonParams
}

function call(inf, params, callback) {
    if (arguments.length == 2) {
        callback = params
        params = {}
    }

    const domain = getDomain()
    const commonParams = getCommonHeader()

    params = params || {}
    // params.uid = params.uid || commonParams.cUserId || ''
    // params.sid = params.sid || commonParams.cSid || ''
    params.time = commonParams.cTime
    params.sign = commonParams.cSign
    const type = inf.type.toLowerCase()
    let req = request[type](inf.url).set(commonParams)
    if (inf.form) {
        for (var p in params) {
            req = req.field(p, params[p])
        }
    } else if (inf.xform) {
        req.type('form').send(params)
    } else {
        req = req[type == 'post' ? 'send' : 'query'](params)
    }

    req.end((err, res) => {
        if (Global.DEBUG)
            console.log('请求[' + type.toUpperCase() + ']:' + inf.url)
        const result = JSON.parse(res.text)
        if (isNaN(result.code))
            result.code = result.errcode
        if (Global.DEBUG)
            console.log(result)
        if (result.code === 3001) {
            notification.error({
                key:'1',
                message: '登录过期请先登录！',
            })
            return
        }
        callback(result)
    })
}

function removeElement(_element) {
    var _parentElement = _element.parentNode;
    if (_parentElement) {
        _parentElement.removeChild(_element);
    }
}

export default {
    call: call,
    getCommonHeader: getCommonHeader
}
