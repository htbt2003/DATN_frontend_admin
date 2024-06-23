import httpAxios from "../httpAxios";


function getAll(page)
{
    return httpAxios.get(`category/index?page=${page}`);
}
function getById(id)
{
    return httpAxios.get("category/show/" + id);
}
function create(data)
{
    return httpAxios.post("category/store", data);
}
function update(data, id)
{
    return httpAxios.post("category/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("category/destroy/" + id);
}
function getCategoryByParentId(parent_id)
{
    return httpAxios.get(`category_list/${parent_id}`);
}
function getCategoryBySlug(slug)
{
    return httpAxios.get("category/show/"+slug);
}

const CategoryService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    getCategoryByParentId:getCategoryByParentId,
    getCategoryBySlug:getCategoryBySlug,
    changeStatus:(id) =>
    {
        return httpAxios.get("category/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("category/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("category/restore/" + id);
    },
    trash:(page) =>
    {
        return httpAxios.get(`category/trash?page=${page}`);
    }
}
export default CategoryService;