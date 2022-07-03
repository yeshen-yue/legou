import request from "../request.js"
function categoryRequest(params) {
    return request({
        url: "/category/categoryNav", params
    })
}
function getGoodsList(params) {
    return request({
        url: "/goods/goodsList", params
    })
}
function getCurrentNav(params) {
    return request({
        url: "/category/currentaction", params
    })
}
function getNavList() {
    return request({
        url: "/category/indexaction",
    })
}
export { categoryRequest, getGoodsList, getCurrentNav, getNavList }