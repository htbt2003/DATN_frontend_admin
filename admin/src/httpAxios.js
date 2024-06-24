import axios from "axios";
import { urlAPI } from "./config";

const httpAxios = axios.create({
    baseURL: urlAPI,
    headers: {"X-Customer_Header":'foobar'}
});
httpAxios.interceptors.response.use((response) => {
    return response.data;
  });
export default httpAxios;