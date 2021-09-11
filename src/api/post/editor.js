import request from "../../utils/request";

const uploadImage = (image) => {
    return request({
        url: '/blog/uploadImage',
        method: 'post',
        data: image,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
const release = (blog) => {
    return request({
        url: '/blog/release',
        method: 'post',
        data: blog,
    })
}
export {
    uploadImage,
    release
}
