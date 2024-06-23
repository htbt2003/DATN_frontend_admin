import httpAxios from "../httpAxios";


function getAll(page)
{
    return httpAxios.get(`topic/index?page=${page}`);
}
function getById(id)
{
    return httpAxios.get("topic/show/" + id);
}
function create(data)
{
    return httpAxios.post("topic/store", data);
}
function update(data, id)
{
    return httpAxios.post("topic/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("topic/destroy/" + id);
}
function getTopicByParentId(parent_id)
{
    return httpAxios.get(`topic_list/${parent_id}`);
}
function getTopicBySlug(slug)
{
    return httpAxios.get("topic/show/"+slug);
}

const TopicService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    getTopicByParentId:getTopicByParentId,
    getTopicBySlug:getTopicBySlug,
    changeStatus:(id) =>
    {
        return httpAxios.get("topic/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("topic/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("topic/restore/" + id);
    },
    trash:(page) =>
    {
        return httpAxios.get(`topic/trash?page=${page}`);
    },
}
export default TopicService;