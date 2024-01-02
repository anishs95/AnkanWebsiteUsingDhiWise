const purchase = require('../http-common').purchase;

class PurchaseService{
    
    placeOrder(data){
        return purchase.post("PlaceOrder", data);
    }



}

export default new PurchaseService();