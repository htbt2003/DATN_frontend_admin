import httpAxiosPrivate from "httpAxiosPrivate";
import httpAxios from "../httpAxios";


const DashboardServices = {
    dashboard: (condition) => {
        return httpAxiosPrivate.get(`dashboard`, {
            params: {
                ...condition,
            },
        });
    },
};
export default DashboardServices;