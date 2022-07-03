import request from "../request.js"
function getCartList(params) {
    return request({
        url: "/cart/cartList", params,
    })
}
function submitOrder(data) {
    return request({
        url: "/order/submitAction", data, method: "post"
    })
}
function detailAction(params) {
    return request({
        url: "/order/detailAction", params,
    })
}
function delGoods(params) {
    return request({
        url: "/cart/deleteAction", params,
    })
}
export { getCartList, submitOrder, detailAction, delGoods }