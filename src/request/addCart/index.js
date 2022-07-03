import request from "../request.js"
function addCart(data) {
    return request({
        url: "/cart/addCart", data, method: 'post'
    })
}
function addStar(data) {
    return request({
        url: "/collect/addcollect", data, method: 'post'
    })
}
export { addCart, addStar }