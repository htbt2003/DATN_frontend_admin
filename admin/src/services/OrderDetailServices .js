import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("orderDetail/index");
}
function getById(id)
{
    return httpAxios.get("orderDetail/show/" + id);
}
function create(data)
{
    return httpAxios.post("orderDetail/store", data);
}
function update(data, id)
{
    return httpAxios.post("orderDetail/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("orderDetail/destroy/" + id);
}

const OrderDetailServices = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    changeStatus:(id) =>
    {
        return httpAxios.get("orderDetail/change_status/" + id);
    },
    orderDetail:(order_id) =>
    {
        return httpAxios.get("orderDetail/" + order_id);
    },
}
export default OrderDetailServices;