import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { urlImage } from '../../../config';
import Loading from '../../../Loading';
import swal from 'sweetalert';
import Card from 'components/card';
import Product from './Product';
import PromotionServices from '../../../services/PromotionServices';
import { useSelector } from 'react-redux';

function PromotionCreate() {
  const navigator = useNavigate();
  const [load, setLoad] = useState(false)
  const [reLoad, setReLoad] = useState(false);
  const [productSelecteds, setProductSelecteds] = useState([]);
  const [showProduct, setShowProduct] = useState(false);
  const [name, setName] = useState("");
  const [date_begin, setDateBegin] = useState();
  const [date_end, setDateEnd] = useState();
  const [productIdSelected, setproductIdSelected] = useState([]);

  const user = useSelector((state) => state.auth.user);
  document.title = 'Tạo chương trình khuyến mãi mới'

  //------xuất hoá đơn--------------------------
  const ExportOrder = async () => {
    setLoad(true);
    const promotion = {
      user_id: user.id,
      name: name,
      date_begin: date_begin,
      date_end: date_end,
    };

    var Listproducts = [];
    productSelecteds.forEach((item) => {
      if(item.variants.length > 0){
        item.variants.forEach((variant) => {
          Listproducts = [...Listproducts,
            {
              product_id: variant.product_id,
              variant_id: variant.id,
              qty: variant.qty,
              price_sale: variant.price_sale,
            }
          ]  
        })  
      }
      else{
        Listproducts = [...Listproducts,
          {
            product_id: item.id,
            variant_id: null,
            qty: item.qty,
            price_sale: item.price_sale,
          }
        ]
  
      }
    });
    console.log(Listproducts)
    const orderData = {
      promotion,
      Listproducts,
    }
    await PromotionServices.create(orderData)
      .then(function (result) {
        if (result.status == true) {
          swal("Success", result.message, "success");
          navigator("/admin/promotion", { replace: true })
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
        setproductIdSelected(prevIDSelected => prevIDSelected.filter(id => id !== productSelecteds[index].id));
        setReLoad(Date.now)
      }
    });
  };
  //---cập nhật giá sản phẩm đơn---------------------
  const handleChangePrice = (index, e) => {
    const newPrice = e.target.value;
    if (!isNaN(newPrice) && newPrice > 0) {
      if (newPrice > productSelecteds[index].price) {
        swal("Cảnh báo", "Giá khuyến mãi phải nhỏ hơn giá bán: " + productSelecteds[index].price, "warning");
        e.target.value = productSelecteds[index].price - 1000;
        const newProduct = [...productSelecteds];
        newProduct[index] = { ...newProduct[index], price_sale: productSelecteds[index].price - 1000 };
        setProductSelecteds(newProduct);
      }
      else {
        const newProduct = [...productSelecteds];
        newProduct[index] = { ...newProduct[index], price_sale: newPrice };
        setProductSelecteds(newProduct);
      }
    }
  };
  //---cập nhật số lượng sản phẩm đơn---------------------
  const handleChangeQty = (index, e) => {
    const newQty = e.target.value;
    const inventory = productSelecteds[index].sum_qty_store - productSelecteds[index].sum_qty_selled;
    if (!isNaN(newQty) && newQty > 0) {
      if (newQty > inventory) {
        swal("Cảnh báo", "Số lượng kho không đủ, bạn chỉ có thể khuyến mãi tối đa " + inventory + ' sản phẩm', "warning");
        e.target.value = inventory;
        const newProduct = [...productSelecteds];
        newProduct[index] = { ...newProduct[index], qty: newQty };
        setProductSelecteds(newProduct);
      }
      else {
        const newProduct = [...productSelecteds];
        newProduct[index] = { ...newProduct[index], qty: newQty };
        setProductSelecteds(newProduct);
      }
    }
  };

  //---cập nhật giá sản phẩm biến thể---------------------
  const handleChangePriceVariant = (index, indexVar, e) => {
    const newPrice = e.target.value;
    if (!isNaN(newPrice) && newPrice > 0) {
      if (newPrice > productSelecteds[index].variants[indexVar].price) {
        swal("Cảnh báo", "Giá khuyến mãi phải nhỏ hơn giá bán: " + productSelecteds[index].variants[indexVar].price, "warning");
        e.target.value = (productSelecteds[index].variants[indexVar].price) - 1000;
        const newProduct = [...productSelecteds];
        newProduct[index].variants[indexVar] = { ...newProduct[index].variants[indexVar], price_sale: (productSelecteds[index].variants[indexVar].price) - 1000 };
        setProductSelecteds(newProduct);
      }
      else {
        const newProduct = [...productSelecteds];
        newProduct[index].variants[indexVar] = { ...newProduct[index].variants[indexVar], price_sale: newPrice };
        setProductSelecteds(newProduct);
      }
    }
  };
  //---cập nhật số lượng sản phẩm biến thể---------------------
  const handleChangeQtyVariant = (index, indexVar, e) => {
    const newQty = e.target.value;
    const inventory = productSelecteds[index].variants[indexVar].sum_qty_store - productSelecteds[index].variants[indexVar].sum_qty_selled;
    if (!isNaN(newQty) && newQty > 0) {
      if (newQty > inventory) {
        swal("Cảnh báo", "Số lượng kho không đủ, bạn chỉ có thể khuyến mãi tối đa " + inventory + ' sản phẩm', "warning");
        e.target.value = inventory;
        const newProduct = [...productSelecteds];
        newProduct[index].variants[indexVar] = { ...newProduct[index].variants[indexVar], qty: newQty };
        setProductSelecteds(newProduct);
      }
      else {
        const newProduct = [...productSelecteds];
        newProduct[index].variants[indexVar] = { ...newProduct[index].variants[indexVar], qty: newQty };
        setProductSelecteds(newProduct);
      }
    }
  };


  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // lấy ra ngày giờ hiện tại ------------
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  //-----thời gian hiện tại------------------------------------
  const currentDateBegin = formatDateTime(Date.now());

  //----thời gian kết thúc lớn hơn thời gian hiện tại 1h------------------------------------
  const currentDateEnd = formatDateTime(Date.now() + 3600000);

  useEffect(() => {
    setDateBegin(currentDateBegin)
    setDateEnd(currentDateEnd)
  }, []);

  //----chọn ngày bắt đầu-------------------------------------------------------
  const handleDateBegin = (e) => {
    const selectedBeginDate = new Date(e.target.value).getTime();
    const endDate = new Date(date_end).getTime();
    // console.log(selectedBeginDate)
    // console.log(endDate)
    if (selectedBeginDate > endDate - 3600000) {
      swal("Cảnh báo", "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc ít nhất một tiếng!", "warning");
      const newBeginDate = formatDateTime(endDate - 3600000);
      e.target.value = formatDateTime(endDate - 3600000);
      setDateBegin(newBeginDate)
    } else {
      setDateBegin((e.target.value).replace('T', ' '));
    }
  };
  //----chọn ngày bắt đầu---------------------------------------------------
  const handleDateEnd = (e) => {
    const selectedEndDate = new Date(e.target.value).getTime();
    const beginDate = new Date(date_begin).getTime();

    if (selectedEndDate < beginDate + 3600000) {
      swal("Cảnh báo", "Thời gian kết thúc phải lớn hơn thời gian bắt đầu ít nhất một tiếng!", "warning");
      const newEndDate = formatDateTime(beginDate + 3600000);
      e.target.value = newEndDate;
      setDateEnd(newEndDate);
    } else {
      setDateEnd((e.target.value).replace('T', ' '));
    }
  };
  // console.log(date_begin)
  // console.log(date_end)

  return (
    <div className='mt-5'>
      {load ? (<Loading />) : (<></>)}
      <div className='mb-4'>
        <form method="post">
          <div className="card">
            <section className="content-header my-2">
              <div className="col-md-12 flex justify-between items-center">
                <strong className="text-3xl text-navy-700 dark:text-white">Tạo chương trình khuyến mãi mới</strong>
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
            <div className="card-body bg-white rounded-xl p-5">
              <div className="mb-3">
                <label className="block text-lg font-semibold">Tên chương trình (*)</label>
                <input type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input w-[500px] mt-2 w-full rounded-xl border-2 border-gray-300 p-3 text-sm outline-none"
                  placeholder="Tên khuyến mãi"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="rowshowcustome">
                <div className="col-md">
                  <label className="block text-lg font-semibold">Thời gian bắt đầu (*)</label>
                  <input
                    type='datetime-local'
                    min={currentDateBegin}
                    value={date_begin}
                    className="border-2 border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border border-dark rounded mt-2 flex h-9 w-full items-center justify-center rounded-xl border p-2 text-sm outline-none"
                    onChange={(e) => setDateBegin((e.target.value).replace('T', ' '))}
                    onBlur={(e) => handleDateBegin(e)}
                  />
                </div>
                <div className="col-md">
                  <label className="block text-lg font-semibold">Thời gian kết thúc (*)</label>
                  <input
                    type='datetime-local'
                    min={currentDateEnd}
                    value={date_end}
                    className="border-2 border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border border-dark rounded mt-2 flex h-9 w-full items-center justify-center rounded-xl border p-2 text-sm outline-none"
                    onChange={(e) => setDateEnd((e.target.value).replace('T', ' '))}
                    onBlur={(e) => handleDateEnd(e)}
                  />
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
                    Giá gốc
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                  <div className="text-lg font-bold tracking-wide lg:text-lg">
                    Giá khuyến mãi
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                  <div className="text-lg font-bold tracking-wide lg:text-lg">
                    Số lượng
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                  <div className="text-lg font-bold tracking-wide lg:text-lg">
                    Kho hàng
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
                if (product.variants.length > 0) {
                  return (
                    <>
                      <tr key={`product-${index}`} className='bg-[#F4F7FE]'>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2">
                          <img className="flex h-10 w-10 items-center justify-center rounded-xl" src={`${urlImage}product/${product.image}`} alt="hinh" />
                        </td>
                        <td colSpan={5} className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                          {product.name}
                        </td>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                          <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full" onClick={() => handleDeleteProduct(index)}>X</button>
                        </td>
                      </tr>
                      {product.variants.map((variant, indexVar) => {
                        let hinhanh = urlImage + "product/" + product.image;
                        variant.variant_values.forEach(function (item1) {
                          if (item1.product_attribute_value.image != null) {
                            hinhanh = urlImage + "pro_attribute/" + item1.product_attribute_value.image;
                          }
                        });

                        return (
                          <tr key={`variant-${indexVar}`} className="row group hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                            <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2">
                              <img className="flex h-[80px] w-20 items-center justify-center rounded-xl" src={hinhanh} alt="hinh" />
                            </td>
                            <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white relative">
                              <div className="product-title">
                                {variant.variant_values.map((item2, index2) =>
                                  <a className='mr-3 text-muted' key={index2}>{item2.product_attribute_value.attribute_value.name}</a>
                                )}
                              </div>
                            </td>
                            <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                              {variant.price}
                            </td>
                            <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                              <input
                                type="number"
                                className="p-1 form-control w-[150px] text-center bg-white border border-gray-300 rounded"
                                min={1}
                                max={100000000}
                                // value={variant.price_root}
                                onChange={(e) => handleChangePriceVariant(index, indexVar, e)}
                              />
                            </td>
                            <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                              <input
                                type="number"
                                className="p-1 form-control w-[100px] text-center bg-white border border-gray-300 rounded"
                                // value={product.qty}
                                onChange={(e) => handleChangeQtyVariant(index, indexVar, e)}
                              /> 
                            </td>
                            <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white relative">
                              {variant.sum_qty_store - variant.sum_qty_selled}
                            </td>
                            <td></td>
                          </tr>
                        );
                      })}
                    </>
                  );
                }
                else {
                  return (
                    <>
                      <tr key={`product-${index}`} className='bg-[#F4F7FE]'>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2">
                          <img className="flex h-10 w-10 items-center justify-center rounded-xl" src={`${urlImage}product/${product.image}`} alt="hinh" />
                        </td>
                        <td colSpan={5} className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                          {product.name}
                        </td>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                          <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full" onClick={() => handleDeleteProduct(index)}>X</button>
                        </td>
                      </tr>
                      <tr key={index} className=" row group hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2">
                          -
                        </td>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white relative">
                          -
                        </td>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                          {product.price}
                        </td>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                          <input
                            type="number"
                            className="p-1 form-control w-[150px] text-center bg-white border border-gray-300 rounded"
                            min={1}
                            max={100000000}
                            // value={product.price_root}
                            onChange={(e) => handleChangePrice(index, e)}
                          />
                        </td>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                          <input
                            type="number"
                            className="p-1 form-control w-[100px] text-center bg-white border border-gray-300 rounded"
                            // value={product.qty}
                            onChange={(e) => handleChangeQty(index, e)}
                          />
                        </td>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white relative">
                          {product.sum_qty_store - product.sum_qty_selled}
                        </td>
                        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                        </td>
                      </tr>
                    </>
                  );
                }
              })}
            </tbody>
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
          <Product productSelecteds={productSelecteds} setProductSelecteds={setProductSelecteds} setShowProduct={setShowProduct} productIdSelected={productIdSelected} setproductIdSelected={setproductIdSelected} date_begin={date_begin} date_end={date_end} reLoad={reLoad} setReLoad={setReLoad} />
        ) : null
      }
    </div>
  );
}

export default PromotionCreate;