import axios from 'axios';
var basePath = process.env.REACT_APP_API_BASE;
const user = require("../http-common").user;

function getApiHeader(){
  return axios.create({
    baseURL: `${basePath}api/User/`,
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

class UserService {
  getOtp(phoneNumber) {
    return getApiHeader().get("GetOTP/" + phoneNumber);
  }

  verifyOtp(payload) {
    return getApiHeader().post("VerifyOTP/", payload);
  }

  register(payload) {
    return getApiHeader().post("Register/", payload);
  }
}

export default new UserService();
