import httpAxios from "../httpAxios";


function getAll(page, condition)
{
    return httpAxios.get(`contact/index?page=${page}`, {
        params: {
          ...condition,
        },
      });
}
function getById(id)
{
    return httpAxios.get("contact/show/" + id);
}
function create(data)
{
    return httpAxios.post("contact/store", data);
}

function update(data, id)
{
    return httpAxios.post("contact/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("contact/destroy/" + id);
}
const ContactService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    changeStatus:(id) =>
    {
        return httpAxios.get("contact/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("contact/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("contact/restore/" + id);
    },
    trash:(page, condition) =>
    {
        return httpAxios.get(`contact/trash?page=${page}`, {
            params: {
              ...condition,
            },
          });
    },
    action_destroy: (data) => {
        return httpAxios.post("contact/action_destroy", data);
    },
    action_trash: (data) => {
        return httpAxios.post("contact/action_destroy", data);
    },
}
export default ContactService;