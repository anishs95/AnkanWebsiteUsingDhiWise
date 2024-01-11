import axios from 'axios';
var basePath = process.env.REACT_APP_API_BASE;
const purchase = require('../http-common').purchase;

function getApiHeader(){
    return axios.create({
      baseURL: `${basePath}api/Purchase/`,
      headers: {
        'authorization':  getToken(),
        'Content-type': 'application/json',
      },
    });
 }

function getToken(){
  var token = localStorage.getItem("ankanToken");
   try {
     var authToken = 'Bearer '+token;  
     return authToken;
   } catch (error) {
     console.log(error);
     return false;
   }
 }
 function getUserId() {
  return localStorage.getItem("userId");
}

function getLocationId() {
  if (localStorage.getItem("ankanSelectedLocationId")) {
    return localStorage.getItem("ankanSelectedLocationId");
  } else {
    return "6315a5678634010a50742e52";
  }
}

class PurchaseService{
    
    placeOrder(data){
        return getApiHeader().post("PlaceOrder", data);
    }

    purchaseHistory(){
        return getApiHeader().get("GetOrdersByUser/"+getUserId());
    }



}

export default new PurchaseService();