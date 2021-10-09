import {login,getInfo} from "../../api/user/user";

const state = {
    token: localStorage.getItem('token'),
    userInfo: null,
}
const mutations = {
    setToken(state, token) {
        state.token = token
        localStorage.setItem('token', token)
    },
    setUser(state, userInfo) {
        state.userInfo = userInfo
    },
    clearUserState(state) {
        localStorage.removeItem('token')
        state.token=null
        state.userInfo=null
    }
}
const actions = {
    login({commit}, userInfo) {
        return login(userInfo)
                .then((response) => {
                    const {data} = response
                    commit('setToken', data.token)
                    return response
                })
    },
    getInfo({commit}) {
        return new Promise((resolve, reject) => {
            getInfo().then((response) => {
                    const {data} = response
                    commit('setUser', data.userInfo)
                    resolve()
                }).catch((error)=>{
                reject(error)
            })
        })

    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}
