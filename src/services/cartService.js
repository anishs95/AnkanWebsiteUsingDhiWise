import axios from "axios";
var basePath = process.env.REACT_APP_API_BASE;

const cart = require("../http-common").cart;

function getApiHeader() {
  return axios.create({
    baseURL: `${basePath}api/Cart/`,
    headers: {
      authorization: getToken(),
      "Content-type": "application/json",
    },
  });
}

function getToken() {
  var token = localStorage.getItem("ankanToken");
  try {
    var authToken = "Bearer " + token;
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

class CartService {
  addItemToCart(data) {
    return getApiHeader().put(
      "/AddItemToCart/" + getUserId() + "/" + getLocationId(),
      data
    );
  }

  getUserCart() {
    return getApiHeader().get("/GetCart/" + getUserId());
  }

  deleteItemFromCart(data) {
    return getApiHeader().put(
      "/RemoveItemFromCart/" + getUserId() + "/"+getLocationId(),
      data
    );
  }

  clearCart() {
    return getApiHeader().post("/ClearCart/" + getUserId());
  }
}
export default new CartService();
