import request from "../../utils/request";

const editAvatar = (avatar) => {
    return request({
        url: '/user/editAvatar',
        method: 'post',
        data: avatar,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
const updateProfile = (profile) => {
    return request({
        url: '/user/updateProfile',
        method: 'post',
        data: profile,
    })
}
const updatePassword = (password) => {
    return request({
        url: '/user/updatePassword',
        method: 'post',
        data: password,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export {
    editAvatar,
    updateProfile,
    updatePassword
}
