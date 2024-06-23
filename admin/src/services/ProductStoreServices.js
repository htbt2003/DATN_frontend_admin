import httpAxios from "../httpAxios";


function getAll(page)
{
    return httpAxios.get(`productstore/index?page=${page}`);
}
function getById(id)
{
    return httpAxios.get("productstore/show/" + id);
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
}
export default ProductStoreService;