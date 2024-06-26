import httpAxios from "../httpAxios";


const AttributeServices = {
    getAll: (page, condition) => {
        return httpAxios.get(`attribute/index?page=${page}`, {
            params: {
                ...condition,
            },
        });
    },
    getById: (id) => {
        return httpAxios.get("attribute/show/" + id);
    },
    create: (data) => {
        return httpAxios.post("attribute/store", data);
    },
    update: (data, id) => {
        return httpAxios.post("attribute/update/" + id, data);
    },
    remove: (id) => {
        return httpAxios.delete("attribute/destroy/" + id);
    },
    changeStatus: (id) => {
        return httpAxios.get("attribute/change_status/" + id);
    },
    delete: (id) => {
        return httpAxios.get("attribute/delete/" + id);
    },
    restore: (id) => {
        return httpAxios.get("attribute/restore/" + id);
    },
    trash: (page, condition) => {
        return httpAxios.get(`attribute/trash?page=${page}`, {
            params: {
                ...condition,
            },
        });
    },
    action_destroy: (data) => {
        return httpAxios.post("attribute/action_destroy", data);
    },
    action_trash: (data) => {
        return httpAxios.post("attribute/action_destroy", data);
    },
};
export default AttributeServices;