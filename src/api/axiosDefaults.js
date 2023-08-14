import axios from "axios";

// Global cofig of axios
axios.defaults.baseURL = "https://ci-drf-api-pj-87220ee25e96.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

//  creating an instance of the axios client with specific configurations
// Reccommended for multiple API fetching
// const instance = axios.create({
//   baseURL: 'https://ci-drf-api-pj-87220ee25e96.herokuapp.com/',
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
//   withCredentials: true,
// });

// export default instance;

// (1) Create axios instances for response and request interceptors
export const axiosRes = axios.create();
export const axiosReq = axios.create();
