import request from "../request.js"
function subjectRequest(params) {
    return request({
        url: "/topic/listaction",
        params,
    })
}
function subjectDeatailsRequest(params) {
    return request({
        url: "/topic/detailaction",
        params,
    })
}
export { subjectRequest, subjectDeatailsRequest }