import { Link, useNavigate, useParams } from 'react-router-dom';
// import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { urlImage } from "config";
import Card from "components/card";
import ImportInvoiceServices from '../../../services/ImportInvoiceServices';
import ProductStoreServices from '../../../services/ProductStoreServices';
import Loading from '../../../Loading';
import { useSelector } from 'react-redux';
import { FaEdit, FaPlus, FaRegEye, FaTrash } from 'react-icons/fa';
import swal from 'sweetalert';
import VariantUpdate from './VariantUpdate';
import { toast } from 'react-toastify';

function ImportInvoiceUpdate() {
  const [load, setLoad] = useState(false)
  const { id } = useParams();
  const navigator = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [orderDetails, setOrderDetails] = useState("");
  const [reLoad, setReLoad] = useState();
  const [showVariant, setShowVariant] = useState(false);
  const [product, setProduct] = useState();

  function OrderEdit(event) {
    event.preventDefault();//không load lại trang
    var order = new FormData();
    order.append("user_id", user.id)
    order.append("name", name)
    order.append("email", email)
    order.append("phone", phone)
    order.append("address", address)
    order.append("note", note)
    // order.append("status", status)
    ImportInvoiceServices.update(order, id)
      .then(function (result) {
        toast.success(result.message);
        navigator("/admin/importInvoice", { replace: true })
      });
  }
  useEffect(function () {
    (async function () {
      setLoad(true)

      await ImportInvoiceServices.getById(id)
        .then(function (result) {
          const tmp = result.order
          setName(tmp.name);
          setEmail(tmp.email);
          setPhone(tmp.phone);
          setAddress(tmp.address);
          setNote(tmp.note);
          setOrderDetails(result.orderDetails)
        });
        setLoad(false)
    })();
  }, [reLoad]);
  //tính tổng hóa đơn
  let TotalOrder = 0;
  orderDetails && orderDetails.forEach(function (item) {
    TotalOrder += item.qty * item.price_root;
  });

  function itemDelete(id) {
    swal({
      title: "Cảnh báo",
      text: "Lưu ý xóa sản phẩm này sẽ ảnh hưởng đến dữ liệu sản phẩm đang bán và báo cáo doanh thu?",
      icon: "warning",
      buttons: {
        cancel: "Không",
        confirm: {
          text: "Có",
          value: true,
          visible: true,
          className: "btn-delete",
          closeModal: true
        }
      }
    }).then(async (result) => {
      if (result) {
        try {
          await ProductStoreServices.delete(id)
          setReLoad(Date.now)
          console.log(1)
        }
        catch (error) {
          console.log(error)
        }
      }
    });
  }
  const handlShowProduct = (product) => {
    setProduct(product);
    setShowVariant(true);
  }

console.log(orderDetails)


  const RowMenu = ({ product, index }) => {
    let name = product.name;
    let hinhanh = urlImage + "product/" + product.image;

    if (product.variant) {
      name = product.variant.name;

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
          <div className="absolute top-200 right-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-wrap flex-row ml-2 mt-2">
              <button onClick={() => handlShowProduct(product)} className="text-blue-500 mr-2">
                <FaEdit />
              </button>
              <button href="#" className="text-[#ef4444]" onClick={() => itemDelete(product.id)}>
                <FaTrash />
              </button>
            </div>
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
        {product.price_root?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
        {product.qty}
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
          {(product.qty*product.price_root)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </td>
      </tr>
    );
};

  return (
    <div className='mt-5'>
      {load ? (<Loading />) : (<></>)}
      <div className='mb-4'>
        <form method="post">
          <div className="card">
            <section className="content-header my-2">
              <div className="col-md-12 flex justify-between items-center">
                <strong className="text-3xl text-navy-700 dark:text-white">Hóa đơn nhập</strong>
                <div className="flex space-x-2">
                  <button onClick={OrderEdit} className="linear rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" name="THEM">
                    <i className="fa fa-save" /> Lưu [Thêm]
                  </button>
                  <Link className="linear rounded bg-brand-500 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" to={"/admin/importInvoice"}>
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
                        <strong>Nhà cung cấp (*)</strong>
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                        placeholder='Nhà cung cấp'
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block">
                        <strong>Địa chỉ (*)</strong>
                      </label>
                      <input
                        placeholder='Đại chỉ'
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
                        placeholder='Ghi chú'
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
                        <strong>Email</strong>
                      </label>
                      <input
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block">
                        <strong>Điện thoại (*)</strong>
                      </label>
                      <input
                        placeholder='Điện thoại'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

      </div>
      <Card extra={"w-full h-full sm:overflow-auto p-6"}>
        <div className=" overflow-x-scroll xl:overflow-x-hidden">
          <strong className="text-[red] text-[30px] mb-5">CHI TIẾT HÓA ĐƠN NHẬP</strong>
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
              </tr>

            </thead>
            <tbody>
            {orderDetails && orderDetails.length > 0 && orderDetails.map((product, index) => {
                return (
                  <RowMenu product={product} index={index} />
                );
              })}
            </tbody>
            <div className='mt-3'>
              <span className="text-lg font-bold">Tổng tiền:</span>
              <span className="ml-2 text-lg font-bold text-red-600">
                {TotalOrder?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </span>
            </div>
          </table>
        </div>
      </Card>

      {
        showVariant ? (
          <VariantUpdate product={product} setShowVariant={setShowVariant} setReLoad={setReLoad}/>
        ) : null
      }
    </div>

  );
}

export default ImportInvoiceUpdate;