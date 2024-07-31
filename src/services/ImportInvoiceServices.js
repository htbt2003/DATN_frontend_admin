import httpAxios from "../httpAxios";


function getAll(page, condition)
{
    return httpAxios.get(`importInvoice/index?page=${page}`, {
        params: {
          ...condition,
        },
      });
}
function getById(id)
{
    return httpAxios.get("importInvoice/show/" + id);
}
function create(data)
{
    return httpAxios.post("importInvoice/store", data);
}
function update(data, id)
{
    return httpAxios.post("importInvoice/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("importInvoice/destroy/" + id);
}
function getimportInvoiceByUserId(user_id)
{
    return httpAxios.get(`importInvoice/${user_id}`);
}
function doCheckout(data)
{
    return httpAxios.post("doCheckout", data);
}

const ImportInvoiceServices = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    getimportInvoiceByUserId:getimportInvoiceByUserId,
    doCheckout:doCheckout,
    changeStatus:(id) =>
    {
        return httpAxios.get("importInvoice/change_status/" + id);
    },
    delete:(id) =>
    {
        return httpAxios.get("importInvoice/delete/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("importInvoice/restore/" + id);
    },
    trash:(page, condition) =>
    {
        return httpAxios.get(`importInvoice/trash?page=${page}`, {
            params: {
              ...condition,
            },
          });
    },
    action_destroy: (data) => {
        return httpAxios.post("importInvoice/action_destroy", data);
    },
    action_trash: (data) => {
        return httpAxios.post("importInvoice/action_destroy", data);
    },
}
export default ImportInvoiceServices;