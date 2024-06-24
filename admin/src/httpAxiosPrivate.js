import axios from "axios";
import { urlAPI } from "./config";
import { store } from "./redux/stores";

const httpAxiosPrivate = axios.create({
    baseURL: urlAPI,
    headers:{
            "Content-type" : "application/json"
     }
});
httpAxiosPrivate.interceptors.request.use(config => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
httpAxiosPrivate.interceptors.response.use((response) => {
    return response.data;
  });
export default httpAxiosPrivate;

