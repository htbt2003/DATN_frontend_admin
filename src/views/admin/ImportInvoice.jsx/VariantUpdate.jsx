import React, { useEffect, useState } from "react";
import { urlImage } from '../../../config';
import ProductStoreServices from '../../../services/ProductStoreServices';
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const VariantUpdate = ({ product, setShowVariant, setReLoad }) => {
    const [qty, setQty] = useState(product.qty);
    const [price_root, setPrice_root] = useState(product.price_root);
    const user = useSelector((state) => state.auth.user);

    function OrderEdit(event) {
        event.preventDefault();//không load lại trang
        var prostore = new FormData();
        prostore.append("user_id", user.id)
        prostore.append("qty", qty)
        prostore.append("price_root", price_root)
        ProductStoreServices.update(prostore, product.id)
          .then(function (result) {
            toast.success(result.message);
            setReLoad(Date.now)
            setShowVariant(false)
          });      
      }

    //tăng số lượng
    const handleIncrease = () => {
        setQty(prevQty => prevQty + 1);
    };

    //giảm số lượng
    const handleDecrease = () => {
        setQty(prevQty => (prevQty > 1 ? prevQty - 1 : 1));
    };
    const handleChangePrice = (e) => {
        const newPrice = e.target.value;
        if (!isNaN(newPrice) && newPrice > 0) {
            if (product.variant) {
                if (newPrice > product.variant.price) {
                  swal("Cảnh báo", "Giá nhập phải nhỏ hơn hoặc bằng giá bán: " + product.variant.price, "warning");
                  e.target.value = product.variant.price
                  setPrice_root(product.variant.price)  
                } else {
                  setPrice_root(newPrice)  
                }
              } else {
                if (newPrice > product.price_sell) {
                  swal("Cảnh báo", "Giá nhập phải nhỏ hơn hoặc bằng giá bán: " + product.price, "warning");
                  e.target.value = product.price_sell
                  setPrice_root(product.price_sell)  
                } else {
                    setPrice_root(newPrice)  
                }
              }
          }
      };
    
    //------rentder thông tin sản phẩm------------------
    const render = (product) => {
        let name = product.name;
        let hinhanh = urlImage + "product/" + product.image;
        let price = product.price;
        let price_sale = product.price_sale || null;

        if (product.variant) {
            name = product.variant.name;
            price = product.variant.price;
            price_sale = product.variant.sale?.price_sale || null;

            product.variant.variant_values.forEach(function (item1) {
                if (item1.product_attribute_value.image != null) {
                    hinhanh = urlImage + "pro_attribute/" + item1.product_attribute_value.image;
                }
            });
        }
        return (
            <div className="sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2 mb-4">
                <img src={hinhanh} style={{ width: '150px', height: "150px" }} alt="hinh" className="flex h-26 w-26 items-center justify-center rounded-xl sm:text-[14px] text-sm font-bold" />
                <div className="mr-5">
                    {name}
                    <div className="flex items-center gap-14 mt-3">
                        {price_sale ? (
                            <div>
                                <div style={{ textDecoration: 'line-through', color: 'red' }}>
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
                        <div>
                            Tồn kho: {product.sum_qty_store - product.sum_qty_selled}
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-full w-full drop-shadow-2xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
            >
                <div className="relative my-6 mx-auto">
                    {/* Content */}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* Header */}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Cập nhật
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowVariant(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/* Body */}
                        <div className="relative p-6 flex-auto">
                            {/* thông tin sản phẩm */}
                            {render(product)}
                            <hr className=""></hr>
                            {/* nội dung chi tiết*/}
                            <div className="cart-product-quantity flex gap-2 pt-5 px-3">
                                <strong className="p-2">Nhập số lượng:</strong>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleDecrease()}
                                        className="p-2 btn-decrement border border-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-l"
                                        style={{ minWidth: 26 }}
                                        type="button"
                                    >
                                        <i className="icon-minus">-</i>
                                    </button>
                                    <input
                                        type="number"
                                        className="form-control w-[100px] text-center bg-white border border-gray-300 p-2"
                                        value={qty}
                                        onChange={(e) => {
                                            setQty(e.target.value);
                                        }}
                                    />
                                    <button
                                        onClick={() => handleIncrease()}
                                        className="p-2 btn-increment border border-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-r"
                                        style={{ minWidth: 26 }}
                                        type="button"
                                    >
                                        <i className="icon-plus">+</i>
                                    </button>
                                </div>
                            </div>
                            <div className="cart-product-quantity flex gap-2 pt-5 px-3">
                                <strong className="p-2">Nhập giá:</strong>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        className="form-control w-[150px] text-center bg-white border border-gray-300 p-2 rounded"
                                        value={price_root}
                                        onChange={(e) => handleChangePrice(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowVariant(false)}
                            >
                                Đóng
                            </button>
                            <button
                                className="bg-green-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={OrderEdit}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default VariantUpdate;
