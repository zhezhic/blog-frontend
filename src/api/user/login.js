import request from "../../utils/request";

export function login(userInfo) {
    return request({
        url:'/user/login',
        method:'post',
        data:userInfo
    })
}
