import request from "../../utils/request";

const randomBackground = () => {
    return request({
        url: '/common/randomBackground',
        method: 'get',
    })
}
export {
    randomBackground,
}
