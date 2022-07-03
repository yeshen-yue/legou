import request from "../request.js"
function getGoodsDetails(params) {
    return request({
        url: "/goods/detailaction", params
    })
}
export { getGoodsDetails }