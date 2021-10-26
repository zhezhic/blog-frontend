import request from "../../utils/request";

const queryBlogPage = (current, size)=> request({
    url: `/blog/queryBlogPage/${current}/${size}`,
    method: 'get'
})
const queryBlogById = (id)=> request({
    url: `/blog/queryBlogById/${id}`,
    method: 'get'
})
const queryBlogsByUserId = (id)=> request({
    url: `/blog/queryBlogsByUserId/${id}`,
    method: 'get',
})
const queryBlogByIds = (ids)=> request({
    url: `/blog/queryBlogByIds/${ids}`,
    method: 'get',
})
const queryCategoryNameById = (id)=> request({
    url: `/blog/queryCategoryNameById/${id}`,
    method: 'get'
})
const queryCategoryNameByIds = (ids)=> request({
    url: `/blog/queryCategoryNameByIds/${ids}`,
    method: 'get',
})

export {
    queryBlogPage,
    queryCategoryNameById,
    queryCategoryNameByIds,
    queryBlogById,
    queryBlogsByUserId,
    queryBlogByIds
}
