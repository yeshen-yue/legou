import request from "../../request.js"
function getBannerGoods(params) {
    return request({
        url: "/goods/goodsList",
        params
    })
}
export { getBannerGoods }