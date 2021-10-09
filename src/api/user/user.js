import request from "../../utils/request";


const login = (userInfo) => request({
    url: '/user/login',
    method: 'post',
    data: userInfo
})
const getInfo = () => request({
    url: '/user/getInfo',
    method: 'get',
})
const getInfoById = (id) => request({
    url: `/user/getInfoById/${id}`,
    method: 'get',
})
const logout = () => request({
    url: '/user/logout',
    method: 'delete',
})
const updateAvatar = (avatar) => {
    return request({
        url: '/user/updateAvatar',
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
const register = (userInfo) => request({
    url: '/user/register',
    method: 'post',
    data: userInfo
})

const getAvatarById = (id) => request({
    url: `/user/getAvatarById/${id}`,
    method: 'get',
})
export {
    register,
    login,
    logout,
    getInfo,
    getInfoById,
    updateAvatar,
    updatePassword,
    updateProfile,
    getAvatarById
}
