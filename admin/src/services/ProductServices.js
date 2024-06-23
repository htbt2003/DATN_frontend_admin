import httpAxios from "../httpAxios";


function getAll(page)
{
    return httpAxios.get(`product/index?page=${page}`);
}
function getById(id)
{
    return httpAxios.get("product/show/" + id);
}
function create(data)
{
    return httpAxios.post("product/store", data);
}
function update(data, id)
{
    return httpAxios.post("product/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("product/destroy/" + id);
}
function getProductHome(limit, category_id)
{
    return httpAxios.get(`product_home/${limit}/${category_id}`);
}
function getProductAll(page, filters)
{
    return httpAxios.get(`product_allAction?page=${page}`, {
        params: {
          ...filters,
        },
      });
}
function getProductBySlug(slug)
{
    return httpAxios.get(`product_detail/${slug}`);
}
function getProductByCategoryId(page, category_id, filters) 
{
    return httpAxios.get(`product_category/${category_id}?page=${page}`, {
        params: {
          ...filters,
        },
      });
}
function getProductByBrandId(page, brand_id, filters)
{
    return httpAxios.get(`product_brand/${brand_id}?page=${page}`, {
        params: {
          ...filters,
        },
      });
}
function getSearch(key)
{
    return httpAxios.get(`search?key=${key}`);
}
function getProducts(page)
{
    return httpAxios.get(`products?page=${page}`);
}

const ProductService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    getProductHome:getProductHome,
    getProductAll:getProductAll,
    getProductBySlug:getProductBySlug,
    getProductByCategoryId:getProductByCategoryId,
    getProductByBrandId:getProductByBrandId,
    getSearch:getSearch,
    changeStatus:(id) =>
    {
        return httpAxios.get("product/change_status/" + id);
    },
    filter:(category_id=0, brand_id=0) =>
    {
        return httpAxios.get(`product/filter/${category_id}/${brand_id}`);
    },
    delete:(id) =>
    {
        return httpAxios.get("product/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("product/restore/" + id);
    },
    trash:(page) =>
    {
        return httpAxios.get(`product/trash?page=${page}`);
    },
    getProductNew:(limit) =>
    {
        return httpAxios.get(`product_new/${limit}`);
    },
    getProductSale:(limit) =>
    {
        return httpAxios.get(`product_sale/${limit}`);
    },
    getProductBestSeller:(limit) =>
    {
        return httpAxios.get(`product_bestSeller/${limit}`);
    },
    getProducts:(page) =>
    {
        return httpAxios.get(`products?page=${page}`);
    },
}
export default ProductService;