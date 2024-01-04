const purchase = require('../http-common').purchase;

class PurchaseService{
    
    placeOrder(data){
        return purchase.post("PlaceOrder", data);
    }

    purchaseHistory(){
        return purchase.get("GetOrdersByUser/"+"6315b73aec764d5a5c5e74eb");
    }



}

export default new PurchaseService();