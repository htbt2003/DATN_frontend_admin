import httpAxios from "../httpAxios";


const ConfigServices = {
    update:(data) =>
    {
        return httpAxios.post("config/update/", data);
    },
    show:() =>
    {
        return httpAxios.post("config/show");
    },

}
export default ConfigServices;