import httpAxios from "../httpAxios";


const BrandService = {
    getBrandBySlug: (slug) => {
        return httpAxios.get("brand/show/" + slug);
    },
    getAll: (page, condition) => {
        return httpAxios.get(`brand/index?page=${page}`, {
            params: {
                ...condition,
            },
        });
    },
    getById: (id) => {
        return httpAxios.get("brand/show/" + id);
    },
    create: (data) => {
        return httpAxios.post("brand/store", data);
    },
    update: (data, id) => {
        return httpAxios.post("brand/update/" + id, data);
    },
    remove: (id) => {
        return httpAxios.delete("brand/destroy/" + id);
    },
    changeStatus: (id) => {
        return httpAxios.get("brand/change_status/" + id);
    },
    delete: (id) => {
        return httpAxios.get("brand/delete/" + id);
    },
    restore: (id) => {
        return httpAxios.get("brand/restore/" + id);
    },
    trash: (page, condition) => {
        return httpAxios.get(`brand/trash?page=${page}`, {
            params: {
                ...condition,
            },
        });
    },
    brandHome: (limit) => {
        return httpAxios.get(`brand_home/${limit}`);
    },
    action_destroy: (data) => {
        return httpAxios.post("brand/action_destroy", data);
    },
    action_trash: (data) => {
        return httpAxios.post("brand/action_destroy", data);
    },
};
export default BrandService;