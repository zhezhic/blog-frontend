import request from "../../utils/request";

const queryBlogPage = (current, size)=> request({
    url: `/blog/queryBlogPage/${current}/${size}`,
    method: 'get'
})
const queryBlogById = (id)=> request({
    url: `/blog/queryBlogById/${id}`,
    method: 'get'
})
const queryCategoryNameById = (id)=> request({
    url: `/blog/queryCategoryNameById/${id}`,
    method: 'get'
})
const queryCategoryNameByIds = (ids)=> request({
    url: `/blog/queryCategoryNameByIds/${ids}`,
    method: 'get',
})
const addComment = (comment)=> request({
    url: '/addComment',
    method: 'post',
    data: comment
})
export {
    queryBlogPage,
    queryCategoryNameById,
    queryCategoryNameByIds,
    queryBlogById,
    addComment
}
