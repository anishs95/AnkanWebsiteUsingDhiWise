const cart = require("../http-common").cart;

class CartService {

  addItemToCart(data) {
    return cart.put("/AddItemToCart/"+"6315b73aec764d5a5c5e74eb"+"/6315a5678634010a50742e52", data);
  }

  getUserCart(){
    return cart.get("/GetCart/"+"6315b73aec764d5a5c5e74eb");
  }

  deleteItemFromCart(data){
    return cart.put("/RemoveItemFromCart/"+"6315b73aec764d5a5c5e74eb"+"/6315a5678634010a50742e52", data);
  }


}
export default new CartService();
