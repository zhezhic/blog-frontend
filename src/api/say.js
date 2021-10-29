import request from "../utils/request";

const addSay=(say)=>{
    return request({
        url: '/say/addSay',
        method: 'post',
        data: say
    })
}
const querySay=(userId)=>{
    return request({
        url: `/say/querySayByUserId/${userId}`,
        method: 'get',
    })
}
const deleteSayById=(sayId)=>{
    return request({
        url: `/say/deleteSayById/${sayId}`,
        method: 'delete',
    })
}
export {
    addSay,
    querySay,
    deleteSayById
}
