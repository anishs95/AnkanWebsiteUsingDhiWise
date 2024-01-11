import axios from 'axios';
var basePath = process.env.REACT_APP_API_BASE;

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

const location = axios.create({
  baseURL: `${basePath}api/Location/`,
  headers: {
    'authorization':  getToken(),
    'Content-type': 'application/json',
  },
});

const user = axios.create({
  baseURL: `${basePath}api/User/`,
  headers: {
    'authorization':  getToken(),
    'Content-type': 'application/json',
  },
});


const authenticate = axios.create({
  baseURL: `${basePath}api/Authentication/`,
  headers: {
    'authorization':  getToken(),
    'Content-type': 'application/json',
  },
});




export { auth , product, cart, purchase, reward, location, user, authenticate, getToken}