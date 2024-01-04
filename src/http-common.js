import axios from 'axios';
var basePath = process.env.REACT_APP_API_BASE;

function getToken(){
  try {
    var authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy93aW5kb3dzZGV2aWNlY2xhaW0iOiJNT0IiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MDQzNjgzNTMsImV4cCI6MTcwNDQ1NDc1MywiaWF0IjoxNzA0MzY4MzUzfQ.lvGS0-e2QdXMum33EvKoW34DUfusNS5SdzYg7-J9NJ8';  
    return authToken;
  } catch (error) {
    //console.log(error);
    return false;
  }
}

const auth = axios.create({
  baseURL: `${basePath}api/auth/signin`,
  headers: {
    'authorization': getToken(),
    'Content-type': 'application/json',
  },
});

const product = axios.create({
  baseURL: `${basePath}api/Product/`,
  headers: {
    'authorization':  getToken(),
    'Content-type': 'application/json',
  },
});


const cart = axios.create({
  baseURL: `${basePath}api/Cart/`,
  headers: {
    'authorization':  getToken(),
    'Content-type': 'application/json',
  },
});

const purchase = axios.create({
  baseURL: `${basePath}api/Purchase/`,
  headers: {
    'authorization':  getToken(),
    'Content-type': 'application/json',
  },
});

const reward = axios.create({
  baseURL: `${basePath}api/Rewards/`,
  headers: {
    'authorization':  getToken(),
    'Content-type': 'application/json',
  },
});




export { auth , product, cart, purchase, reward}