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
const queryCategoriesByUserId = (id)=> request({
    url: `/blog/queryCategoriesByUserId/${id}`,
    method: 'get'
})
const queryCategoryNameByIds = (ids)=> request({
    url: `/blog/queryCategoriesNameByUserId/${ids}`,
    method: 'get',
})
const deleteBlogById = (id)=> request({
    url: `/blog/deleteBlogById/${id}`,
    method: 'delete',
})
export {
    queryBlogPage,
    queryCategoryNameById,
    queryCategoryNameByIds,
    queryCategoriesByUserId,
    queryBlogById,
    queryBlogsByUserId,
    queryBlogByIds,
    deleteBlogById
}
