import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { urlImage } from '../../../config';
// import { IoIosSearch } from "react-icons/io";
import Loading from '../../../Loading';
import ReactPaginate from "react-paginate";
import ProductServices from '../../../services/ProductServices';
import CustomerServices from '../../../services/CustomerServices';
import OrderServices from '../../../services/OrderServices';
import swal from 'sweetalert';
import Card from 'components/card';
import Product from 'components/Product';
import Customer from 'components/Customer';

function ProductDelivery() {
  const [load, setLoad] = useState(false)
  const [reLoad, setReLoad] = useState();
  const [customer, setCustomer] = useState([]);
  const [productSelecteds, setProductSelecteds] = useState([]);
  const [showProduct, setShowProduct] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const funtionApi = ProductServices.getProductStore
  //--------bỏ chọn sản phẩm----
  const handleDeleteProduct = (index) => {
    const newProduct = [...productSelecteds];
    newProduct.splice(index, 1);
    setProductSelecteds(newProduct);
  };
  //------xuất hoá đơn--------------------------
  const ExportOrder = () => {
    const order = {
      user_id: customer.id,
      name: customer.name,
      email: customer.email,
      address: customer.address,
      phone: customer.phone,
      note: 'no',
    };
    var ListCart = [];
    productSelecteds.forEach((item) => {
      ListCart = [...ListCart,
      {
        product_id: item.product_id ? item.product_id : item.id,
        variant_id: item.product_id ? item.id : null,
        quantity: item.quantity,
        price: item.price_sale || (item.sale ? item.sale.price_sale : item.price),
        cost: item.cost || null,
      }
      ]
    });
    const data = {
      order: order,
      ListCart: ListCart,
    };
    (async function () {
      OrderServices.doCheckout(data)
        .then(function (result) {
          if (result.status == true) {
            swal("Success", result.message, "success");
          }
        });
    })();
    setCustomer("");
    setProductSelecteds([]);
    setReLoad(Date.now);
  };
  const handleQtyChange = (index, e) => {
    const qty = Number(e.target.value);
    const slton = productSelecteds[index].sum_qty_store - productSelecteds[index].sum_qty_selled;

    if (qty > slton) {
      swal("Cảnh báo", 'Số lượng tồn kho không đủ: ' + slton, "warning");
    } else {
      const newProducts = [...productSelecteds];
      newProducts[index] = { ...newProducts[index], qty: qty };
      setProductSelecteds(newProducts);
    }
  };
  console.log(productSelecteds)
  const RowMenu = ({ product, index }) => {
    return (
      <tr key={index} className="row group hover:bg-gray-100 dark:hover:bg-gray-800 relative ">
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2">
          {/* <input
            type="checkbox"
            className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
 justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s]
 checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
            id={"category" + product.id}
            onChange={() => handleCheckbox(product.id)}
            checked={selectedproducts.includes(product.id)}
          /> */}
          <img className="flex h-28 w-24 items-center justify-center rounded-xl" src={urlImage + "product/" + product.image} alt="hinh" />
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white relative">
        {product.name}
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
          {product.categoryname}
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
          {product.brandname}
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
          {product.price}
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
          <input
            onChange={(e) => handleQtyChange(index, e)}
            className='p-2 h-8 w-[100px] border border-2 border-gray-300'
            type="number"
            value={product.qty}
            min={1}
            max={product.sum_qty_store - product.sum_qty_selled}
          />
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
          <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full" onClick={() => handleDeleteProduct(index)}>X</button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      {load ? <Loading /> : null}
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
                  value={customer.name}
                  className="form-input mt-2 w-full rounded-xl border-2 border-gray-300 p-3 text-sm outline-none"
                  placeholder="Họ tên"
                  readOnly />
              </div>
              <div className="col-md">
                <label className="block text-lg font-semibold">Email (*)</label>
                <input type="text"
                  value={customer.email}
                  className="form-input mt-2 w-full rounded-xl border-2 border-gray-300 p-3 text-sm outline-none"
                  placeholder="Email"
                  readOnly
                />
              </div>
              <div className="col-md">
                <label className="block text-lg font-semibold">Điện thoại (*)</label>
                <input type="text"
                  value={customer.phone}
                  className="form-input mt-2 w-full rounded-xl border-2 border-gray-300 p-3 text-sm outline-none"
                  placeholder="Điện thoại"
                  readOnly
                />
              </div>
              <div className="col-md-5">
                <label className="block text-lg font-semibold">Địa chỉ (*)</label>
                <input type="text"
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
                  {/* <input
                      type="checkbox"
                      className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
  justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s]
  checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
                      name="weekly"
                    /> */}
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
                    Danh mục
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                  <div className="text-lg font-bold tracking-wide lg:text-lg">
                    Thương hiệu
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
                    Xóa
                  </div>
                </th>
              </tr>

            </thead>
            <tbody>
              {productSelecteds && productSelecteds.length > 0 && productSelecteds.map((product, index) => {
                return (
                  <RowMenu product={product} index={index} />
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {
        productSelecteds.length > 0 ? (
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
        showProduct?(
          <Product setProductSelecteds={setProductSelecteds} setShowProduct={setShowProduct} funtionApi={funtionApi}/>
        ):(
          showCustomer ?(
            <Customer setCustomer={setCustomer} setShowCustomer={setShowCustomer}/>
          ):null
        )
      }
    </div>
  );
}

export default ProductDelivery;