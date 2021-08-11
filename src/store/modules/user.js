import {login} from "../../api/user/login";

const state = {
    token: localStorage.getItem('token'),
    user: null,
}
const mutations = {
    setToken(state, token) {
        state.token = token
        localStorage.setItem('token', token)
    },
    setUser(state, user) {
        state.user = user
    }
}
const actions = {
    login({commit}, userInfo) {
        console.log('store/user/login', userInfo)
        const {email, password} = userInfo
        return new Promise((resolve, reject) => {
            login({email, password})
                .then((response) => {
                    const {data} = response
                    commit('setToken', data.token)
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
