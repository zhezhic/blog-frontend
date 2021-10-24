import request from "../utils/request";

const searchTitle = (keyword,current,size) => {
    return request({
        url: `/searchTitle/${keyword}/${current}/${size}`,
        method: 'get',
    })
}
const multiSearch = (content,current,size) => {
    return request({
        url: `/multiSearch/${content}/${current}/${size}`,
        method: 'get',
    })
}
export {
    searchTitle,
    multiSearch
}
