import httpAxios from "../httpAxios";

//backend
function getAll(page)
{
    return httpAxios.get(`menu/index?page=${page}`);
}
function getById(id)
{
    return httpAxios.get("menu/show/" + id);
}
function create(data)
{
    return httpAxios.post("menu/store", data);
}
function update(data, id)
{
    return httpAxios.post("menu/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("menu/destroy/" + id);
}

//frontend
function getByParentId(position)
{
    return httpAxios.get(`menu_list/${position}`);
}
const MenuService = {
    getByParentId: getByParentId,
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    changeStatus:(id) =>
    {
        return httpAxios.get("menu/change_status/" + id);
    },
    tao:(position, type, listid) =>
    {
        return httpAxios.get(`menu/tao/${position}/${type}/${listid}`);
    },
    search:(key) => 
    {
        return httpAxios.get(`menu/search/${key}`);
    },
    delete:(id) =>
    {
        return httpAxios.get("menu/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("menu/restore/" + id);
    },
    trash:(page) =>
    {
        return httpAxios.get(`menu/trash?page=${page}`);
    }
}
export default MenuService;