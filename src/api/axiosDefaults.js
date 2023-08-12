import axios from "axios";

// Global cofig of axios
axios.defaults.baseURL = "https://moments-ci-af-df0edfddd1f4.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

//  creating an instance of the axios client with specific configurations
// Reccommended for multiple API fetching
// const instance = axios.create({
//   baseURL: 'https://moments-ci-af-df0edfddd1f4.herokuapp.com/',
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
//   withCredentials: true,
// });

// export default instance;
