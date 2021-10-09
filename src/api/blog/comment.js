import request from "../../utils/request";

const addComment = (comment)=> request({
    url: '/comment/addComment',
    method: 'post',
    data: comment
})
const queryCommentsByBlogId = (id)=> request({
    url: `/comment/queryCommentsByBlogId/${id}`,
    method: 'get',
})
export {
    addComment,
    queryCommentsByBlogId
}
