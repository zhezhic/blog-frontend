import request from "../../utils/request";

const queryBlogPage = (current, size)=> request({
    url: `/blog/queryBlogPage/${current}/${size}`,
    method: 'get'
})
const queryBlogById = (id)=> request({
    url: `/blog/queryBlogById/${id}`,
    method: 'get'
})
const queryBlogsByUserId = (current,size)=> request({
    url: `/blog/queryBlogsByUserId/${current}/${size}`,
    method: 'get',
})
const queryBlogsByOtherUserId= (current,size,id)=> request({
    url: `/blog/queryBlogsByOtherUserId/${current}/${size}/${id}`,
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
    queryBlogsByOtherUserId,
    queryBlogById,
    queryBlogsByUserId,
    queryBlogByIds,
    deleteBlogById
}
