import httpAxios from "../httpAxios";


function getAll(page, condition)
{
    return httpAxios.get(`productstore/index?page=${page}`, {
        params: {
          ...condition,
        },
      });
}
function show_history(product_id, variant_id)
{
    return httpAxios.get(`productstore/show_history/${product_id}?${variant_id}`);
}
function getById(id)
{
    return httpAxios.get(`productstore/show/${id}`);
}

function create(data)
{
    return httpAxios.post("productstore/store", data);
}
function update(data, id)
{
    return httpAxios.post("productstore/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("productstore/destroy/" + id);
}

const ProductStoreService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    show_history:show_history,
    action_destroy: (data) => {
        return httpAxios.post("productstore/action_destroy", data);
    },
    action_trash: (data) => {
        return httpAxios.post("productstore/action_destroy", data);
    },
    delete:(id) =>
        {
            return httpAxios.get("productstore/delete/" + id);
        },
    
}
export default ProductStoreService;