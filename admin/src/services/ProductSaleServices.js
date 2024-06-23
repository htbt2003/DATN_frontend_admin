import httpAxios from "../httpAxios";


function getAll(page)
{
    return httpAxios.get(`productsale/index?page=${page}`);
}
function getById(id)
{
    return httpAxios.get("productsale/show/" + id);
}
function create(data)
{
    return httpAxios.post("productsale/store", data);
}
function update(data, id)
{
    return httpAxios.post("productsale/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("productsale/destroy/" + id);
}
function getProductHome(limit, category_id)
{
    return httpAxios.get(`product_home/${limit}/${category_id}`);
}
function getProductAll(limit, page=1)
{
    return httpAxios.get(`product_all/${limit}/${page}`);
}
function getProductBySlug(slug)
{
    return httpAxios.get(`product_detail/${slug}`);
}
function getProductByCategoryId(limit, category_id)
{
    return httpAxios.get(`product_category/${limit}/${category_id}`);
}
function getProductByBrandId(limit, brand_id)
{
    return httpAxios.get(`product_brand/${limit}/${brand_id}`);
}
function getProductSearch(key)
{
    return httpAxios.get(`product_search/${key}`);
}

const ProductSaleServices = {
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
    getProductSearch:getProductSearch,
}
export default ProductSaleServices;