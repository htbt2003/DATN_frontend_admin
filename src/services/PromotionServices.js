import httpAxios from "../httpAxios";


function getAll(page, condition)
{
    return httpAxios.get(`promotion/index?page=${page}`, {
        params: {
          ...condition,
        },
      });
}
function getById(id)
{
    return httpAxios.get("promotion/show/" + id);
}
function create(data)
{
    return httpAxios.post("promotion/store", data);
}
function update(data, id)
{
    return httpAxios.post("promotion/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("promotion/destroy/" + id);
}
const PromotionServices = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    action_destroy: (data) => {
        return httpAxios.post("promotion/action_destroy", data);
    },
    action_trash: (data) => {
        return httpAxios.post("promotion/action_destroy", data);
    },
    delete:(id) =>
    {
        return httpAxios.get("promotion/delete/" + id);
    },

}
export default PromotionServices;