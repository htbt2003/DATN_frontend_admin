import OrderServices from "../../../services/OrderServices"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import UserServices from "../../../services/UserServices"
import { urlImage } from "config";
import Card from "components/card";

function OrderUpdate() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const navigator = useNavigate();
  const [user_id, setUserId] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [orderDetails, setOrderDetails] = useState("");
  const [status, setStatus] = useState(1);

  function OrderEdit(event) {
    event.preventDefault();//không load lại trang
    var order = new FormData();
    order.append("user_id", user_id)
    order.append("name", name)
    order.append("email", email)
    order.append("phone", phone)
    order.append("address", address)
    order.append("note", note)
    order.append("status", status)
    OrderServices.update(order, id)
      .then(function (result) {
        alert(result.message);
        navigator("/admin/order", { replace: true })
      });
  }
  useEffect(function () {
    (async function () {
      await UserServices.getAll()
        .then(function (result) {
          setUsers(result.usersAll)
        });
    })();
  }, [])
  useEffect(function () {
    (async function () {
      await OrderServices.getById(id)
        .then(function (result) {
          const tmp = result.order
          setUserId(tmp.user_id);
          setName(tmp.name);
          setEmail(tmp.email);
          setPhone(tmp.phone);
          setAddress(tmp.address);
          setNote(tmp.note);
          setStatus(tmp.status);
          setOrderDetails(result.orderDetails)
        });
    })();
  }, []);
  //tính tổng hóa đơn
  let TotalOrder = 0;
  orderDetails && orderDetails.forEach(function (item) {
    TotalOrder += item.qty * item.price_bill;
  });

  const RowMenu = ({ product, index }) => {
    let name = product.name;
    let hinhanh = urlImage + "product/" + product.image;
    let price_sell = product.price_sell;

    if (product.variant) {
      name = product.variant.name;
      price_sell = product.variant.price;

      product.variant.variant_values.forEach(function (item1) {
        if (item1.product_attribute_value.image != null) {
          hinhanh = urlImage + "pro_attribute/" + item1.product_attribute_value.image;
        }
      });
    }
    return (
      <tr key={index} className="row group hover:bg-gray-100 dark:hover:bg-gray-800 relative ">
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2">
          <img className="flex h-28 w-24 items-center justify-center rounded-xl" src={hinhanh} alt="hinh" />
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white relative">
          {name}
          <div className="product-title">
            {product.variant && product.variant.variant_values.map((item2, index) =>
              <a className='mr-3 text-sm' key={index}>{item2.product_attribute_value.attribute_value.name}</a>
            )}
          </div>
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
          {product.price_bill < price_sell ? (
            <>
              <div style={{ textDecoration: 'line-through', color: 'red' }}>
                {price_sell?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </div>
              <div>
                {product.price_bill?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </div>
            </>
          ) : (
            <div>
              {product.price_bill?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </div>
          )}
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
          {(product.qty)}
        </td>

        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
          {(product.qty*product.price_bill)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </td>
        {/* <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
          <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full"
            onClick={() => handleDeleteProduct(index)}
          >X</button>
        </td> */}
      </tr>
    );
};

  return (
    <>
      <form method="post" onSubmit={OrderEdit}>
        <div className="card">
          <section className="content-header my-2">
            <div className="col-md-12 flex justify-between items-center">
              <strong className="text-3xl text-navy-700 dark:text-white">Hóa đơn</strong>
              <div className="flex space-x-2">
                <button type="submit" className="linear rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" name="THEM">
                  <i className="fa fa-save" /> Lưu [Thêm]
                </button>
                <Link className="linear rounded bg-brand-500 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" to={"/admin/product"}>
                  Về danh sách
                </Link>
              </div>
            </div>
          </section>
          <div className="card-body bg-white rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="bg-white p-5 rounded-xl">
                  <div className="mb-3">
                    <label className="block">
                      <strong>Tên hóa đơn (*)</strong>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block">
                      <strong>Email (*)</strong>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block">
                      <strong>Địa chỉ (*)</strong>
                    </label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block">
                      <strong>Ghi chú</strong>
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="mt-2 block w-full h-24 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-5 rounded-xl">
                  <div className="mb-3">
                    <label className="block">
                      <strong>Mã người dùng (*)</strong>
                    </label>
                    <select
                      value={user_id}
                      onChange={(e) => setUserId(e.target.value)}
                      className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                    >
                      {users.map((user, index) => (
                        <option key={index} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block">
                      <strong>Điện thoại (*)</strong>
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block">
                      <strong>Trạng thái</strong>
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                    >
                      <option value="">Trạng thái đơn hàng</option>
                      <option value={0}>Chờ xác nhận</option>
                      <option value={1}>Đã xác nhận</option>
                      <option value={2}>Chờ lấy hàng</option>
                      <option value={3}>Đang giao hàng</option>
                      <option value={4}>Đã giao hàng</option>
                      <option value={5}>Đã hủy</option>
                      <option value={6}>Đã trả lại</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Card extra={"w-full h-full sm:overflow-auto p-6 mt-3"}>
        <div className=" overflow-x-scroll xl:overflow-x-hidden">
          <strong className="text-[red] text-[30px] mb-5">CHI TIẾT HÓA ĐƠN</strong>
          <table
            className="w-full"
            variant="simple"
            color="gray-500"
            mb="24px"
          >
            <thead>
              <tr>
                <th className="border-b flex items-center gap-2 border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                  <div className="text-lg font-bold tracking-wide lg:text-lg">
                    Hình ảnh
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-6 pb-[10px] text-start dark:!border-navy-700">
                  <div className="text-lg font-bold tracking-wide lg:text-lg">
                    Tên
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                  <div className="text-lg font-bold tracking-wide lg:text-lg">
                    Giá
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                  <div className="text-lg font-bold tracking-wide lg:text-lg">
                    Số lượng
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                  <div className="text-lg font-bold tracking-wide lg:text-lg">
                    Tổng
                  </div>
                </th>
                {/* <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                  <div className="text-lg font-bold tracking-wide lg:text-lg">
                    Xóa
                  </div>
                </th> */}
              </tr>

            </thead>
            <tbody>
              {orderDetails && orderDetails.length > 0 && orderDetails.map((product, index) => {
                return (
                  <RowMenu product={product} index={index} />
                );
              })}

            </tbody>
          </table>
        </div>
      </Card>
    </>

  );
}

export default OrderUpdate;