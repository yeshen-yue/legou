import request from "../../request.js"
function getKeyword(params) {
    return request({
        url: "/search/helperaction",
        params
    })
}
function getHotword(params) {
    return request({
        url: "/search/indexaction",
        params
    })
}
function addHistory(data) {
    return request({
        url: "/search/addhistoryaction",
        data, method: 'post'
    })
}
function clearHistory(data) {
    return request({
        url: "/search/clearhistoryAction",
        data, method: 'post'
    })
}
export { getKeyword, getHotword, addHistory, clearHistory }