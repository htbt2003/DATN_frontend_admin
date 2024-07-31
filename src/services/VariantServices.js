import httpAxios from "../httpAxios";


const VariantServices = {
    getAll: (page) =>{
        return httpAxios.get(`variant/index?page=${page}`);
    },
    getById:(id) =>
    {
        return httpAxios.get("variant/show/" + id);
    },
    create:(data) =>
    {
        return httpAxios.post("variant/store", data);
    },
    update:(data) =>
    {
        return httpAxios.post("variant/update", data);
    },
    remove:(id) =>
    {
        return httpAxios.delete("variant/destroy/" + id);
    },
    changeStatus:(id) =>
    {
        return httpAxios.get("variant/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("variant/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("variant/restore/" + id);
    },
    trash:(page) =>
    {
        return httpAxios.get(`variant/trash?page=${page}`);
    },
};
export default VariantServices;