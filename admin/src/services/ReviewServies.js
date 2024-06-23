import httpAxios from "../httpAxios";


const ReviewServies = {
    getReviewProduct: (product_id) =>
    {
        return httpAxios.get(`reviewProduct/${product_id}`);
    },
    getReviewProductByUser: (product_id, user_id) =>
    {
        return httpAxios.get(`reviewProductUser/${product_id}/${user_id}`);
    },
    create:(data) =>
    {
        return httpAxios.post("review/store", data);
    },
    remove:(id) =>
    {
        return httpAxios.delete("review/destroy/" + id);
    },
};
export default ReviewServies;