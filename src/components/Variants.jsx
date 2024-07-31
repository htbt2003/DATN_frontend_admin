import React, { useEffect, useState } from "react";
import { urlImage } from '../config';

const Variants = ({ setProductSelecteds, product, setShowVariant }) => {
    // const [showVariant, setShowVariant] = useState(false);
    const variants = product.variants
    const attributes = product.productattributes;
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    var [selectedVariant, setSelectedVariant] = useState();

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

    const handleSelect = () => {
        setProductSelecteds(prevProductSelecteds => [...prevProductSelecteds, selectedVariant]);
        // setShowVariant(false)
    };

    const handleAttributeChange = (attributeId, valueId) => {
        setSelectedAttributes(prev => ({
            ...prev,
            [attributeId]: valueId
        }));
    };

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-full w-full shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
            >
                <div className="relative my-6 mx-auto">
                    {/* Content */}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* Header */}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Chọn biến thể sản phẩm
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
                        <div className="p-4">
                                {
                                    selectedVariant ? (
                                        <div className="sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2 mb-4" >
                                            <img src={urlImage + "pro_image/" + selectedVariant.image} alt="hinh" className="flex h-16 w-16 items-center justify-center rounded-xl" />
                                            <p className="mr-5">{selectedVariant.name}</p>
                                            <p>{selectedVariant.price}</p>
                                        </div>
                                    ):(
                                        <div className="sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2 mb-4">
                                            <img src={urlImage + "product/" + product.image} alt="hinh" className="flex h-16 w-16 items-center justify-center rounded-xl" />
                                            <p className="mr-5">{product.name}</p>
                                            <p>{product.price}</p>
                                        </div>
                                    )
                                }
                            {attributes && attributes.map((item, index) => (
                                <div key={index} className="">
                                    <div className="py-1 px-2 border-b">
                                        <strong>{item.attribute.name}</strong>
                                    </div>
                                    <div className="p-2">
                                        <select
                                            name="brand_id"
                                            className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
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
                            ))}                        </div>
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
                                onClick={() => handleSelect()}
                            >
                                Chọn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default Variants;
