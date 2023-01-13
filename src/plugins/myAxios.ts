// Set config defaults when creating the instance
import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api'
});

//设置cookie
myAxios.defaults.withCredentials = true;

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log("我要发请求了",config);
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log("我收到你的响应了",response.data);
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


export default myAxios;
