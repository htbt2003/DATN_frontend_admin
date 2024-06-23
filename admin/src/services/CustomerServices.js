import httpAxios from "../httpAxios";


function getAll(page)
{
    return httpAxios.get(`customer/index?page=${page}`);
}
function getById(id)
{
    return httpAxios.get("customer/show/" + id);
}
function create(data)
{
    return httpAxios.post("customer/store", data);
}
function update(data, id)
{
    return httpAxios.post("customer/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("customer/destroy/" + id);
}
const CustomerService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    changeStatus:(id) =>
    {
        return httpAxios.get("customer/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("customer/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("customer/restore/" + id);
    },
    trash:(page) =>
    {
        return httpAxios.get(`customer/trash?page=${page}`);
    }
}
export default CustomerService;