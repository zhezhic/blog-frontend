import request from "../../utils/request";

export function addAvatar(avatar) {
    return request({
        url:'/user/addAvatar',
        method:'post',
        data:avatar,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}
