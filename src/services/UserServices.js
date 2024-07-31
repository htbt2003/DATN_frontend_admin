import httpAxios from "../httpAxios";
import httpAxiosPrivate from "../httpAxiosPrivate";

function getAll(page, condition)
{
    return httpAxios.get(`user/index?page=${page}`, {
        params: {
          ...condition,
        },
      });
}
function getById(id)
{
    return httpAxios.get("user/show/" + id);
}
function create(data)
{
    return httpAxios.post("user/store", data);
}
function update(data, id)
{
    return httpAxios.post("user/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("user/destroy/" + id);
}
const UserService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    changeStatus:(id) =>
    {
        return httpAxios.get("user/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("user/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("user/restore/" + id);
    },
    trash:(page, condition) =>
    {
        return httpAxios.get(`user/trash?page=${page}`, {
            params: {
              ...condition,
            },
          });
    },
    register:(data) =>
    {
        return httpAxios.post("register", data);
    },
    login:(data) =>
    {
        return httpAxios.post("login", data);
    },
    loginWithFacebook:() =>
    {
        return httpAxios.get('/login/facebook');
    },
    login_facebook:(data) =>
    {
        return httpAxios.post("loginFacebook", data);
    },
    login_google:(data) =>
    {
        return httpAxios.post("loginGoogle", data);
    },    logout:() =>
    {
        return httpAxiosPrivate.post("auth/logout");
    },
    me: () => {
        return httpAxiosPrivate.post("auth/me");
    },
    updateAccount:(data, id) =>
    {
        return httpAxiosPrivate.post("auth/updateAccount/" + id, data);
    },
    action_destroy: (data) => {
        return httpAxios.post("user/action_destroy", data);
    },
    action_trash: (data) => {
        return httpAxios.post("user/action_destroy", data);
    },
}
export default UserService;