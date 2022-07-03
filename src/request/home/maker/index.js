import request from "../../request.js"
function getBrandList(params) {
    return request({
        url: "/brand/listaction",
        params
    })
}
function getMakerDetails(params) {
    return request({
        url: "/brand/detailaction",
        params
    })
}
export { getBrandList, getMakerDetails }