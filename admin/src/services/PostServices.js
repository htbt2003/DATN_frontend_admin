import httpAxios from "../httpAxios";


function getAll(page)
{
    return httpAxios.get(`post/index?page=${page}`);
}
function getById(id)
{
    return httpAxios.get("post/show/" + id);
}
function create(data)
{
    return httpAxios.post("post/store", data);
}
function update(data, id)
{
    return httpAxios.post("post/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("post/destroy/" + id);
}
function getByType(limit, type)
{
    return httpAxios.get(`post_list/${limit}/${type}`);
}
function getPostAll(page)
{
    return httpAxios.get(`post_all?page=${page}`);
}
function getPostByTopicId(page, topic_id)
{
    return httpAxios.get(`post_topic/${topic_id}?page=${page}`);
}
function getPostNew()
{
    return httpAxios.get("post_new");
}
function getTopicBySlug(slug)
{
    return httpAxios.get(`post_detail/${slug}`);
}

const PostServices = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    getByType:getByType,
    getPostAll:getPostAll,
    getPostByTopicId:getPostByTopicId,
    getPostNew:getPostNew,
    getTopicBySlug:getTopicBySlug,
    changeStatus:(id) =>
    {
        return httpAxios.get("post/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("post/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("post/restore/" + id);
    },
    trash:(page) =>
    {
        return httpAxios.get(`post/trash?page=${page}`);
    },
}
export default PostServices;