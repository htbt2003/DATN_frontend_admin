import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { urlImage } from '../../../config';
// import { IoIosSearch } from "react-icons/io";
import Loading from '../../../Loading';
import ProductServices from '../../../services/ProductServices';
import OrderServices from '../../../services/OrderServices';
import swal from 'sweetalert';
import Card from 'components/card';
import Product from './Product';
import Customer from 'components/Customer';
import CartServices from '../../../services/CartServices';

function ProductDelivery() {
  const [load, setLoad] = useState(false)
  const [reloadIndex, setReloadIndex] = useState();
  const [customer, setCustomer] = useState([]);
  const [productSelecteds, setProductSelecteds] = useState([]);
  const [showProduct, setShowProduct] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [Cart, setCart] = useState([]);
  const funtionApi = ProductServices.getProductStore

  useEffect(function () {
    const fetchAPI = async () => {
      try {
        const result = await CartServices.getList('xuathang');
        setCart(result.ListCart);
      }
      catch (error) {
        console.log('wait...')
      }
    }
    fetchAPI()
  }, [reloadIndex])

  //------------Tính tổng giỏ hàng---------------------
  let TotalCart = 0;
  Cart && Cart.forEach(function (item) {
    let price = item.price_sale || item.price;
    TotalCart += item.quantity * price;
  });

  //--------bỏ chọn sản phẩm----
  const handleDeleteProduct = (item) => {
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
        await CartServices.delete(item.id);
        setReloadIndex(Date.now())
      }
    });
  };
  //------xuất hoá đơn--------------------------
  const ExportOrder =async  () => {
    setLoad(true);
    const order = {
      user_id: customer.id,
      name: customer.name,
      email: customer.email,
      address: customer.address,
      phone: customer.phone,
      note: 'no',
    };

    var ListCart = [];
    Cart.forEach((item) => {
      ListCart = [...ListCart,
      {
        id: item.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        price: item.price_sale || item.price,
        cost: item.variant ? item.variant.cost : item.cost,
      }
      ]
    });

    const orderData = {
      order,
      ListCart,
    }
    await OrderServices.doCheckout(orderData)
      .then(function (result) {
        if (result.status == true) {
          swal("Success", result.message, "success");
          // navigator("/admin/", { replace: true })
        }
      });
    setCustomer(null);
    setReloadIndex(Date.now);
    setLoad(false);
  };
  //---cập nhật số lượng---------------------
  const handleUpdateQty = async (item, e) => {
    const newQty = e.target.value

    const result = await CartServices.update_qty(item.id, newQty);
    if (!result.status) {
      swal("Cảnh báo", "Rất tiếc, bạn chỉ có thể mua " + result.inventory + " sản phẩm", "warning");
      e.target.value = result.inventory
      await CartServices.update_qty(item.id, e.target.value);
    } 
    setReloadIndex(Date.now())
  };
  const handleChangeQty = (index, e) => {
    const newQty = e.target.value;
    if (!isNaN(newQty) && newQty > 0) {
      const updatedListCart = [...Cart];
      updatedListCart[index].quantity = newQty;
      setCart(updatedListCart);
    }
  };
  //---tăng số lượng------------
  const handleIncrease = async (id) => {
    await CartServices.increase(id);
    setReloadIndex(Date.now())
  };
  //---------giảm sô lượng-------------
  const handleDecrease = async (product) => {
    if(product.quantity == 1){
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
           await CartServices.delete(product.id);
        }
      });
    }else{
       await CartServices.decrease(product.id);
    }
    setReloadIndex(Date.now())  
  };

  return (
    <div>
      {load ? (<Loading />) : (<></>)}
      <div className="mt-5 page-header">
        <div className='flex items-center'>
          <h1 className='ml-4 mr-3 text-2xl font-bold'>Xuất hàng</h1>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="!#"></Link></li>
          </ol>
        </nav>
      </div>
      <div className='mb-4'>
        <Card extra={"w-full h-full sm:overflow-auto p-6"}>
          <div className="overflow-x-scroll xl:overflow-x-hidden">
            <button
              onClick={() => setShowCustomer(true)}
              className="mb-5 rounded bg-brand-600 px-2 py-2 text-base text-white hover:bg-green-700 bg-brand-600 active:bg-brand-700"
            >
              Chọn khách hàng
            </button>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="rowshowcustome">
              <div className="col-md">
                <label className="block text-lg font-semibold">Họ tên (*)</label>
                <input type="text"
                  value={customer?.name}
                  className="form-input mt-2 w-full rounded-xl border-2 border-gray-300 p-3 text-sm outline-none"
                  placeholder="Họ tên"
                  readOnly />
              </div>
              <div className="col-md">
                <label className="block text-lg font-semibold">Email (*)</label>
                <input type="text"
                  value={customer?.email}
                  className="form-input mt-2 w-full rounded-xl border-2 border-gray-300 p-3 text-sm outline-none"
                  placeholder="Email"
                  readOnly
                />
              </div>
              <div className="col-md">
                <label className="block text-lg font-semibold">Điện thoại (*)</label>
                <input type="text"
                  value={customer?.phone}
                  className="form-input mt-2 w-full rounded-xl border-2 border-gray-300 p-3 text-sm outline-none"
                  placeholder="Điện thoại"
                  readOnly
                />
              </div>
              <div className="col-md-5">
                <label className="block text-lg font-semibold">Địa chỉ (*)</label>
                <input type="text"
                  value={customer?.address}
                  className="form-input mt-2 w-full rounded-xl border-2 border-gray-300 p-3 text-sm outline-none"
                  placeholder="Địa chỉ"
                  readOnly
                />
              </div>
            </div>
          </div>
        </Card>

      </div>
      <Card extra={"w-full h-full sm:overflow-auto p-6"}>
        <div className=" overflow-x-scroll xl:overflow-x-hidden">
          <button
            onClick={() => setShowProduct(true)}
            className="mb-5 rounded bg-brand-600 px-2 py-2 text-base text-white hover:bg-green-700 bg-brand-600 active:bg-brand-700"
          >
            Chọn sản phẩm
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
              {Cart && Cart.length > 0 && Cart.map((product, index) => {
                    let name = product.name;
                    let hinhanh = urlImage + "product/" + product.image;
                    let price = product.price;
                    let price_sale = product.price_sale || null;
                
                    if (product.variant) {
                      name = product.variant.name;
                      price = product.variant.price;
                      // price_sale = product.variant.sale?.price_sale || null;
                
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
                        <h5>{name}</h5>
                            {
                              product.variant ? (
                                <div className="product-title">
                                  {product.variant.variant_values.map((item2, index) =>
                                    <a className='mr-3 text-muted' key={index}>{item2.product_attribute_value.attribute_value.name}</a>
                                  )}
                                </div>
                              ) : null
                            }
                        </td>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                          {price_sale ? (
                            <div>
                              <div style={{ textDecoration: 'line-through' }}>
                                {price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                              </div>
                              <div style={{ color: 'red' }}>
                                {price_sale?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                              </div>
                            </div>
                          ) : (
                            <div>
                              {price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </div>
                
                          )}
                        </td>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                          <div className="cart-product-quantity">
                            <div className="flex items-center">
                              <button
                                onClick={() => handleDecrease(product)}
                                className="p-1 btn-decrement border border-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-l"
                                style={{ minWidth: 26 }}
                                type="button"
                              >
                                <i className="icon-minus">-</i>
                              </button>
                              <input
                                type="number"
                                className="p-1 form-control w-16 text-center bg-white border border-gray-300"
                                value={product.quantity}
                                onChange={(e) => handleChangeQty(index, e)}
                                onBlur={(e) => handleUpdateQty(product, e)}
                              />
                              <button
                                onClick={() => handleIncrease(product.id)}
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
                          {(price_sale || price * product.quantity)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
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
                {TotalCart?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </span>
            </div>
          </table>
        </div>
      </Card>

      {
        Cart.length > 0 ? (
          <div className='flex justify-end'>
            <button
              onClick={ExportOrder}
              className="mt-3 rounded bg-red-600 px-2 py-2 text-base text-white hover:bg-green-700 bg-brand-600 active:bg-brand-700"
            >
              Xuất hàng
            </button>
          </div>
        ) : null
      }

      {
        showProduct ? (
          <Product setProductSelecteds={setProductSelecteds} setShowProduct={setShowProduct} funtionApi={funtionApi} setReloadIndex={setReloadIndex} />
        ) : (
          showCustomer ? (
            <Customer setCustomer={setCustomer} setShowCustomer={setShowCustomer} />
          ) : null
        )
      }
    </div>
  );
}

export default ProductDelivery;