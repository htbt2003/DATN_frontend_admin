import httpAxios from "../httpAxios";


function getAll(page)
{
    return httpAxios.get(`banner/index?page=${page}`);
}
function getById(id)
{
    return httpAxios.get("banner/show/" + id);
}
function create(data)
{
    return httpAxios.post("banner/store", data);
}
function update(data, id)
{
    return httpAxios.post("banner/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("banner/destroy/" + id);
}
function getByPosition(position)
{
    return httpAxios.get(`banner_list/${position}`);
}
const BannerService = {
    getByPosition:getByPosition,
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    changeStatus:(id) =>
    {
        return httpAxios.get("banner/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("banner/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("banner/restore/" + id);
    },
    trash:(page) =>
    {
        return httpAxios.get(`banner/trash?page=${page}`);
    }
}
export default BannerService;