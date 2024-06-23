import httpAxios from "../httpAxios";


const BrandService = {
    getBrandBySlug: (slug) =>
    {
        return httpAxios.get("brand/show/"+slug);
    },
    getAll: (page) =>{
        return httpAxios.get(`brand/index?page=${page}`);
    },
    getById:(id) =>
    {
        return httpAxios.get("brand/show/" + id);
    },
    create:(data) =>
    {
        return httpAxios.post("brand/store", data);
    },
    update:(data, id) =>
    {
        return httpAxios.post("brand/update/" + id, data);
    },
    remove:(id) =>
    {
        return httpAxios.delete("brand/destroy/" + id);
    },
    changeStatus:(id) =>
    {
        return httpAxios.get("brand/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("brand/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("brand/restore/" + id);
    },
    trash:(page) =>
    {
        return httpAxios.get(`brand/trash?page=${page}`);
    },
    brandHome:(limit) =>
    {
        return httpAxios.get(`brand_home/${limit}`);
    }
};
export default BrandService;