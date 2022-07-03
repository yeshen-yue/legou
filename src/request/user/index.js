import request from "../request.js"
function myStar(params) {
    return request({
        url: "/collect/listAction",
        params,
    })
}
function manageAddress(params) {
    return request({
        url: "/address/getListAction",
        params,
    })
}
function addAddress(data) {
    return request({
        url: "/address/saveAction",
        data, method: 'post'
    })
}
function getAddressDetail(params) {
    return request({
        url: "/address/detailAction",
        params
    })
}
function suggestion(data) {
    return request({
        url: "/feedback/submitAction",
        data, method: 'post'
    })
}
export { myStar, manageAddress, addAddress, getAddressDetail, suggestion }