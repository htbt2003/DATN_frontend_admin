import httpAxios from "../httpAxios";


const ConfigServices = {
    update:(data) =>
    {
        return httpAxios.post("config/update", data);
    },
    show:() =>
    {
        return httpAxios.get("config/show");
    },

}
export default ConfigServices;