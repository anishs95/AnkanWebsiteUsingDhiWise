import axios from 'axios';
var basePath = process.env.REACT_APP_API_BASE;

function getToken(){
  try {
    var authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy93aW5kb3dzZGV2aWNlY2xhaW0iOiJNT0IiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MDM2NTM3MDIsImV4cCI6MTcwMzc0MDEwMiwiaWF0IjoxNzAzNjUzNzAyfQ.2HY8d8WxqTNh0DaPsnSy650_Nmx-pDLjXlggteDALcU';  
    return authToken;
  } catch (error) {
    //console.log(error);
    return false;
  }
}

const auth = axios.create({
  baseURL:
    `${basePath}api/auth/signin`,
  headers: {
    'authorization': getToken(),
    'Content-type': 'application/json',
  },
});

const product = axios.create({
  baseURL: `${basePath}api/Product/`,
  method: 'GET', // Change the method to 'GET'
  headers: {
    'authorization':  getToken(),
    'Content-type': 'application/json',
  },
});




export { auth , product}