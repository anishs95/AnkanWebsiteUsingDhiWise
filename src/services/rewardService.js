import axios from 'axios';
var basePath = process.env.REACT_APP_API_BASE;
const reward = require('../http-common').reward;

function getApiHeader(){
    return axios.create({
      baseURL: `${basePath}api/Rewards/`,
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


class RewardService{
    

    GetUserReward(){
        return getApiHeader().get("GetUserReward/"+getUserId());
    }

    getRewardsByUser(){
        return getApiHeader().get("GetRewardsByUser/"+getUserId());
    }



}

export default new RewardService();