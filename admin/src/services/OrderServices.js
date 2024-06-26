import httpAxios from "../httpAxios";


function getAll(page, condition)
{
    return httpAxios.get(`order/index?page=${page}`, {
        params: {
          ...condition,
        },
      });
}
function getById(id)
{
    return httpAxios.get("order/show/" + id);
}
function create(data)
{
    return httpAxios.post("order/store", data);
}
function update(data, id)
{
    return httpAxios.post("order/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("order/destroy/" + id);
}
function getOrderByUserId(user_id)
{
    return httpAxios.get(`order/${user_id}`);
}
function doCheckout(data)
{
    return httpAxios.post("doCheckout", data);
}

const OrderService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    getOrderByUserId:getOrderByUserId,
    doCheckout:doCheckout,
    changeStatus:(id) =>
    {
        return httpAxios.get("order/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("order/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("order/restore/" + id);
    },
    trash:(page, condition) =>
    {
        return httpAxios.get(`order/trash?page=${page}`, {
            params: {
              ...condition,
            },
          });
    },
    orderDetail:(order_id) =>
    {
        return httpAxios.get("orderDetail/" + order_id);
    },
    action_destroy: (data) => {
        return httpAxios.post("order/action_destroy", data);
    },
    action_trash: (data) => {
        return httpAxios.post("order/action_destroy", data);
    },
}
export default OrderService;