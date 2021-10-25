import request from "../utils/request";

const searchTitle = (keyword,current,size) => {
    return request({
        url: `/search/title/${keyword}/${current}/${size}`,
        method: 'get',
    })
}
const searchBlog = (content,current,size) => {
    return request({
        url: `/search/blog/${content}/${current}/${size}`,
        method: 'get',
    })
}
const searchName = (keyword,current,size) => {
    return request({
        url: `/search/name/${keyword}/${current}/${size}`,
        method: 'get',
    })
}
export {
    searchTitle,
    searchBlog,
    searchName
}
