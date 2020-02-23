import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default {
  addCart(context, payLoad) {
    //查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
    //判断商品是否已经存在
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      // state.cartList.push(payLoad)
      payLoad.count = 1
      context.commit(ADD_TO_CART,payLoad)
    }
  }
}
