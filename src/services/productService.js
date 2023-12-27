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