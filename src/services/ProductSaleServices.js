import httpAxios from "../httpAxios";


function getAll(page, condition)
{
    return httpAxios.get(`productsale/index?page=${page}`, {
        params: {
          ...condition,
        },
      });
}
function getById(id)
{
    return httpAxios.get("productsale/show/" + id);
}
function create(data)
{
    return httpAxios.post("productsale/store", data);
}
function update(data, id)
{
    return httpAxios.post("productsale/update/" + id, data);
}
function remove(product_id, promotion_id)
{
    return httpAxios.delete(`productsale/destroy/${product_id}/${promotion_id}`);
}
const ProductSaleServices = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    action_destroy: (data) => {
        return httpAxios.post("productsale/action_destroy", data);
    },
    action_trash: (data) => {
        return httpAxios.post("productsale/action_destroy", data);
    },
}
export default ProductSaleServices;