import axios from 'axios';
var basePath = process.env.REACT_APP_API_BASE;
const product = require('../http-common').product;

function getApiHeader(){
    return axios.create({
      baseURL: `${basePath}api/Product/`,
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


class ProductService{
    
    getAllProductCategories(){
        return getApiHeader().get("GetAllProductCategoriesWeb");
    }

    getAllProductsByCategory(categoryId){
        return getApiHeader().get("GetAllProductsByCategoryWeb/"+categoryId+"/"+getLocationId());
    }

    getProduct(productId){
        return getApiHeader().get("GetProductWeb/"+productId+"/"+getLocationId());
    }

    GetProductsForAutocomplete(productName){
        return getApiHeader().get("GetProductsForAutocomplete?productName="+productName);
    }

    filterProducts(stringQuery){
        return getApiHeader().post("FilterProducts?"+stringQuery);
    }

    calculateConsumption(productId, area){
        return getApiHeader().get("GetProductConsumption/"+productId+"/"+area);
    }

}

export default new ProductService();












// const product = require('../http-common').product;

// class ProductDataService {

//   getAll() {
//     return product.get('/GetAllProducts');
//   }

//   getProduct(productId, locationId = null){
//     if(locationId != null)
//       return product.get('/GetProduct/' + productId + locationId);
//     else
//       return product.get('/GetProduct/' + productId);
//   }

//   getLocationPricing(productId){
//     return product.get('/GetLocationwiseProductPrice/' + productId);
//   }

//   getProductTypeMasters(){
//     return product.get('/GetProductTypeMasters/Tile');
//   }

//   getProductUsage(id){
//     return product.get('/GetProductUsage/' + id);
//   }

//   putLocationPricing(data){
//     return product.put(`/AddLocationwiseProductPrice/`, data);
//   }

//   putProductUsage(id, data){
//     return product.put(`/UpdateProductConsumptionDetails/` + id, data);
//   }

//   create(data) {
//     return product.post('/AddProduct', data);
//   }

//   delete(id) {
//     return product.delete(`/DeleteProduct/${id}`);
//   }

//   update(data) {
//     return product.put(`/UpdateProduct`, data);
//   }
// }

// export default new ProductDataService();


