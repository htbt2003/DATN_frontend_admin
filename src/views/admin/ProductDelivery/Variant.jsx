import React, { useEffect, useState } from "react";
import { urlImage } from '../../../config';
import CartServices from "services/CartServices";
import swal from "sweetalert";
import { toast } from "react-toastify";

const Variant = ({ setProductSelecteds, product, setShowVariant, setReloadIndex }) => {
    // const [showVariant, setShowVariant] = useState(false);
    const variants = product.variants
    const attributes = product.productattributes;
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    var [selectedVariant, setSelectedVariant] = useState();
    const [qty, setQty] = useState(1);

    const findSelectedVariant = (variants, selectedAttributes) => {
        const selectedValues = Object.values(selectedAttributes).map(Number);
        for (const variant of variants) {
            const variantValues = variant.variant_values.map(av => av.product_attribute_value_id);
            //   const selectedValues = Object.values(selectedAttributes);
            // Kiểm tra xem các attribute_values của variant có chứa selectedAttributes không
            const result = (variantValues.length === selectedValues.length &&
                variantValues.every(value => selectedValues.includes(value)));
            console.log(result)
            if (result == true) {
                return variant;
            }
        }
        return null;
    };

    useEffect(() => {
        const result = findSelectedVariant(variants, selectedAttributes);
        setSelectedVariant(result)
    }, [selectedAttributes]);

    //-----chọn giá trị thuộc tính------------------
    const handleAttributeChange = (attributeId, valueId) => {
        setSelectedAttributes(prev => ({
            ...prev,
            [attributeId]: valueId
        }));
    };
    //---thêm sản phẩm------------------
    const handleAddCart = async () => {
        if (variants.length > 0 && !selectedVariant) {
          swal("Cảnh báo", "Vui lòng đưa ra lựa chọn", "warning");
        }else {
          const data = {
            deviceId: 'xuathang',
            variant_id: selectedVariant? selectedVariant.id : null,
            product_id: selectedVariant? selectedVariant.product_id : product.id,
            quantity: qty,
          }    
          console.log(data)
          const result = await CartServices.addCart(data);
          setReloadIndex(Date.now())
          if(result.status){
            toast.success(result.message)
          }else{
            swal("Cảnh báo", result.message, "warning");
          }
        }
      };
      const handleIncrease = () => {
        setQty(prevQty => prevQty + 1);
      };
    
      const handleDecrease = () => {
        setQty(prevQty => (prevQty > 1 ? prevQty - 1 : 1));
      };
    
    //------rentder thông tin sản phẩm------------------
    const render = (product, selectedVariant) => {
        let name = product.name;
        let hinhanh = urlImage + "product/" + product.image;
        let price = product.price;
        let price_sale = product.price_sale || null;

        if (selectedVariant) {
            name = selectedVariant.name;
            price = selectedVariant.price;
            // price_sale = selectedVariant.sale?.price_sale || null;

            selectedVariant.variant_values.forEach(function (item1) {
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
                                Thêm sản phẩm
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
                            {render(product, selectedVariant)}
                            <hr className=""></hr>
                            {/* nội dung chi tiết*/}
                            {
                                variants ? (
                                    <div className="flex grap-3">
                                        {attributes && attributes.map((item, index) => (
                                            <div key={index} className="mt-3">
                                                <div className="py-1 px-2 flex gap-2">
                                                    <strong className="item-center p-2">{item.attribute.name}:</strong>
                                                    <div className="">
                                                    <select
                                                        name="brand_id"
                                                        className="w-full p-2 text-sm border-2 border-gray-300 rounded outline-none"
                                                        onChange={(e) => handleAttributeChange(item.id, e.target.value)}
                                                    >
                                                        <option value="">Chọn {item.attribute.name}</option>
                                                        {item.product_attribute_values.map((item2, index2) => (
                                                            <option key={index2} value={item2.id}>
                                                                {item2.attribute_value.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            }
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
                                onClick={handleAddCart}
                            >
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default Variant;
