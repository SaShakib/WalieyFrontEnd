import axios from "axios";
import { api } from "../urlConfig";

const token = window.localStorage.getItem("token");
const superAdmin = window.localStorage.getItem("superAdmin");

const Superaxios = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    superAdmin: token && superAdmin ? true : "",
  },
});

// axiosIntance.interceptors.request.use((req) => {

//   const { auth } = store.getState();
//   if (auth.token) {
//     req.headers.Authorization = `Bearer ${auth.token}`;
//   }
//   return req;
// });

// axiosIntance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (error) => {
//     console.log(error.response);
//     const status = error.response ? error.response.status : 500;
//     if (status && status === 500) {
//       localStorage.clear();
//       axiosIntance.post("admin/signout");
//     }
//     return Promise.reject(error);
//   }
// );

export default Superaxios;
