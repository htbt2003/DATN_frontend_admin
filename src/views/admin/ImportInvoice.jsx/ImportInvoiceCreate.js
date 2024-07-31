import { Link, useNavigate } from 'react-router-dom';
import {  useState } from 'react';
import { urlImage } from '../../../config';
import Loading from '../../../Loading';
import swal from 'sweetalert';
import Card from 'components/card';
import Product from './Product';
import ImportInvoiceServices from '../../../services/ImportInvoiceServices';
import { useSelector } from 'react-redux';

function ImportInvoiceCreate() {
  const navigator = useNavigate();
  const [load, setLoad] = useState(false)
  const [productSelecteds, setProductSelecteds] = useState([]);
  const [showProduct, setShowProduct] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const user = useSelector((state) => state.auth.user);


  //------------Tính tổng giỏ hàng---------------------
  let Total = 0;
  productSelecteds && productSelecteds.forEach(function (item) {
    Total += item.qty * item.price_root;
  });

  //------xuất hoá đơn--------------------------
  const ExportOrder = async () => {
    setLoad(true);
    const order = {
      user_id: user.id,
      name: name,
      email: email,
      address: address,
      phone: phone,
      note: note,
    };

    var Listproducts = [];
    productSelecteds.forEach((item) => {
      Listproducts = [...Listproducts,
      {
        product_id: item.product_id || item.id,
        variant_id: item.product_id ? item.id : null,
        qty: item.qty,
        price_root: item.price_root,
      }
      ]
    });

    const orderData = {
      order,
      Listproducts,
    }
    await ImportInvoiceServices.create(orderData)
      .then(function (result) {
        if (result.status == true) {
          swal("Success", result.message, "success");
          navigator("/admin/importInvoice", { replace: true })
        }
      });
    setLoad(false);
  };
  //--------bỏ chọn sản phẩm----
  const handleDeleteProduct = (index) => {
    swal({
      title: "Cảnh cáo?",
      text: "Xóa sản phẩm này !",
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
        const newProduct = [...productSelecteds];
        newProduct.splice(index, 1);
        setProductSelecteds(newProduct);
      }
    });
  };

  //---cập nhật số lượng---------------------
  const handleChangeQty = (index, e) => {
    const newQty = e.target.value;
    if (!isNaN(newQty) && newQty > 0) {
      const newProduct = [...productSelecteds];
      newProduct[index].qty = newQty;
      setProductSelecteds(newProduct);
    }
  };
  //---cập nhật số lượng---------------------
  const handleChangePrice = (index, e) => {
    const newPrice = e.target.value;
    if (!isNaN(newPrice) && newPrice > 0) {
      if (newPrice > productSelecteds[index].price) {
        swal("Cảnh báo", "Giá nhập phải nhỏ hơn giá bán: " + productSelecteds[index].price, "warning");
      }
      else {
        const newProduct = [...productSelecteds];
        newProduct[index].price_root = newPrice;
        setProductSelecteds(newProduct);
      }
    }
  };
  //---tăng số lượng------------
  const handleIncrease = async (index) => {
    const newProduct = [...productSelecteds];
    newProduct[index].qty += 1;
    setProductSelecteds(newProduct);
  };
  //---------giảm sô lượng-------------
  const handleDecrease = async (index) => {
    if (productSelecteds[index].qty == 1) {
      swal({
        title: "Cảnh báo",
        text: "Xóa sản phẩm này!",
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
          const newProduct = [...productSelecteds];
          newProduct.splice(index, 1);
          setProductSelecteds(newProduct);
        }
      });
    } else {
      const newProduct = [...productSelecteds];
      newProduct[index].qty -= 1;
      setProductSelecteds(newProduct);
    }
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
                  {/* <button type="submit" className="linear rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" name="THEM">
                    <i className="fa fa-save" /> Lưu [Thêm]
                  </button> */}
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
          <button
            onClick={() => setShowProduct(true)}
            className="mb-5 rounded bg-brand-600 px-2 py-2 text-base text-white hover:bg-green-700 bg-brand-600 active:bg-brand-700"
          >
          Thêm sản phẩm
          </button>
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
                <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                  <div className="text-lg font-bold tracking-wide lg:text-lg">
                    Xóa
                  </div>
                </th>
              </tr>

            </thead>
            <tbody>
              {productSelecteds && productSelecteds.length > 0 && productSelecteds.map((product, index) => {
                let hinhanh = urlImage + "product/" + product.image;

                if (product.product_id) {
                  product.variant_values.forEach(function (item1) {
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
                      <h5>{product.name}</h5>
                      {
                        product.product_id ? (
                          <div className="product-title">
                            {product.variant_values.map((item2, index2) =>
                              <a className='mr-3 text-muted' key={index2}>{item2.product_attribute_value.attribute_value.name}</a>
                            )}
                          </div>
                        ) : null
                      }
                    </td>

                    <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                      <input
                        type="number"
                        className="p-1 form-control w-[150px] text-center bg-white border border-gray-300 rounded"
                        min={1}
                        max={100000000}
                        value={product.price_root}
                        onChange={(e) => handleChangePrice(index, e)}
                      />
                    </td>
                    <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                      <div className="productSelecteds-product-qty">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDecrease(index)}
                            className="p-1 btn-decrement border border-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-l"
                            style={{ minWidth: 26 }}
                            type="button"
                          >
                            <i className="icon-minus">-</i>
                          </button>
                          <input
                            type="number"
                            className="p-1 form-control w-16 text-center bg-white border border-gray-300"
                            value={product.qty}
                            onChange={(e) => handleChangeQty(index, e)}
                          // onBlur={(e) => handleUpdateQty(product, e)}
                          />
                          <button
                            onClick={() => handleIncrease(index)}
                            className="p-1 btn-increment border border-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-r"
                            style={{ minWidth: 26 }}
                            type="button"
                          >
                            <i className="icon-plus">+</i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white relative">
                      {(product.price_root * product.qty)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </td>
                    <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                      <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full" onClick={() => handleDeleteProduct(product)}>X</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <div className='mt-3'>
              <span className="text-lg font-bold">Tổng tiền:</span>
              <span className="ml-2 text-lg font-bold text-red-600">
                {Total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </span>
            </div>
          </table>
        </div>
      </Card>

      {
        productSelecteds.length > 0 ? (

          <div className='flex justify-end mt-5'>
            <button
              onClick={ExportOrder}
              className="linear rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              name="THEM"
            >
              <i className="fa fa-save" /> Lưu [Thêm]
            </button>
          </div>
        ) : null
      }

      {
        showProduct ? (
          <Product productSelecteds={productSelecteds} setProductSelecteds={setProductSelecteds} setShowProduct={setShowProduct} />
        ) : null
      }
    </div>
  );
}

export default ImportInvoiceCreate;