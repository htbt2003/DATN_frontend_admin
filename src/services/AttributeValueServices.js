import httpAxios from "../httpAxios";


const attributeValueValueServices = {
    getAll: (page, condition) => {
        return httpAxios.get(`attributeValue/index?page=${page}`, {
            params: {
                ...condition,
            },
        });
    },
    getById: (id) => {
        return httpAxios.get("attributeValue/show/" + id);
    },
    create: (data) => {
        return httpAxios.post("attributeValue/store", data);
    },
    update: (data, id) => {
        return httpAxios.post("attributeValue/update/" + id, data);
    },
    remove: (id) => {
        return httpAxios.delete("attributeValue/destroy/" + id);
    },
    changeStatus: (id) => {
        return httpAxios.get("attributeValue/change_status/" + id);
    },
    delete: (id) => {
        return httpAxios.get("attributeValue/delete/" + id);
    },
    restore: (id) => {
        return httpAxios.get("attributeValue/restore/" + id);
    },
    trash: (page, condition) => {
        return httpAxios.get(`attributeValue/trash?page=${page}`, {
            params: {
                ...condition,
            },
        });
    },
    action_destroy: (data) => {
        return httpAxios.post("attributeValue/action_destroy", data);
    },
    action_trash: (data) => {
        return httpAxios.post("attributeValue/action_destroy", data);
    },
};
export default attributeValueValueServices;