import httpAxios from "../httpAxios";
import httpAxiosPrivate from "../httpAxiosPrivate";


const UserService = {
    
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
        return httpAxios.post("login_facebook", data);
    },
    login_google:(data) =>
    {
        return httpAxios.post("login_google", data);
    },
    logout:() =>
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
}
export default UserService;