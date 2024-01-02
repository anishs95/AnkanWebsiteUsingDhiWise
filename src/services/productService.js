const product = require('../http-common').product;

class ProductService{
    
    getAllProductCategories(){
        return product.get("GetAllProductCategories");
    }

    getAllProductsByCategory(categoryId){
        return product.get("GetAllProductsByCategory/"+categoryId+"/6315a5678634010a50742e52");
    }

    getProduct(productId){
        return product.get("GetProduct/"+productId+"/6315a5678634010a50742e52");
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


