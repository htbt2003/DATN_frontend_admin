import httpAxios from "../httpAxios";


const AddressServices = {
    getAddressByUserId:(id) =>
    {
        return httpAxios.get("address_userId/" + id);
    },
    getCountAddressByUserId:(id) =>
    {
        return httpAxios.get("count_address_userId/" + id);
    },
    getAll: (page) =>{
        return httpAxios.get(`address/index?page=${page}`);
    },
    getById:(id) =>
    {
        return httpAxios.get("address/show/" + id);
    },
    create:(data) =>
    {
        return httpAxios.post("address/store", data);
    },
    update:(data, id) =>
    {
        return httpAxios.post("address/update/" + id, data);
    },
    remove:(id) =>
    {
        return httpAxios.delete("address/destroy/" + id);
    },
    changeStatus:(id) =>
    {
        return httpAxios.get("address/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("address/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("address/restore/" + id);
    },
    trash:(page) =>
    {
        return httpAxios.get(`address/trash?page=${page}`);
    },
};
export default AddressServices;