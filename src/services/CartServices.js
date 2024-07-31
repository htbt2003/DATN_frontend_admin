import httpAxios from "../httpAxios";


const CartServices = {
    getList:(deviceId) =>
    {
        return httpAxios.get("cart/list/" + deviceId);
    },
    getListSelected:(deviceId) =>
    {
        return httpAxios.get("cart/list_selected/" + deviceId);
    },    
    addCart:(data) =>
    {
        return httpAxios.post("cart/add", data);
    },
    update_qty: (id, quantity) =>{
        return httpAxios.post(`cart/update_qty/${id}/${quantity}`);
    },
    selected: (id) =>{
        return httpAxios.post(`cart/selected/${id}`);
    },
    increase:(id) =>
    {
        return httpAxios.get("cart/increase/" + id);
    },
    decrease:(id) =>
    {
        return httpAxios.get("cart/decrease/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.delete("cart/delete/" + id);
    },
};
export default CartServices;