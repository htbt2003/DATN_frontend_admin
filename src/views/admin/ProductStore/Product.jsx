import React, { useEffect, useState } from "react";
import { urlImage } from '../../../config';
import ProductStoreServices from '../../../services/ProductStoreServices';

const Product = ({ proDetail, setShowProduct }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [reLoad, setReLoad] = useState(false);

    useEffect(() => {
        (async function () {
            const result = await ProductStoreServices.show_history(proDetail.product_id, proDetail.variant_id);
            setProducts(result.prostores);
        })();
    }, [reLoad, page]);
console.log(products)
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    //------rentder thông tin sản phẩm------------------
    const render = (proDetail) => {
        let name = proDetail.name;
        let hinhanh = urlImage + "product/" + proDetail.image;

        if (proDetail.variant) {
            name = proDetail.variant.name;

            proDetail.variant.variant_values.forEach(function (item1) {
                if (item1.product_attribute_value.image != null) {
                    hinhanh = urlImage + "pro_attribute/" + item1.product_attribute_value.image;
                }
            });
        }
        return (
            <div className="sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2 mb-4">
                <img src={hinhanh} style={{ width: '100px', height: "100px" }} alt="hinh" className="flex items-center justify-center rounded-xl sm:text-[14px] text-sm font-bold" />
                <div className="mr-5">
                    {name}
                    <div className="flex items-center gap-3 mt-3">
                        {
                            proDetail.variant ? (
                                <div className="product-title">
                                    {proDetail.variant.variant_values.map((item2, index) =>
                                        <a className='mr-3 text-muted' key={index}>{item2.product_attribute_value.attribute_value.name}</a>
                                    )}
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>

        )
    }

    console.log(products)
    return (
        <>
            <div
                className="justify-center items-center flex fixed inset-0 z-50 drop-shadow-2xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none outline-none focus:outline-none border-2 border-solid"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/* Content */}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-full overflow-hidden">
                        {/* Header */}
                        <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Chi tiết nhập
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowProduct(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/* Body */}
                        <div className="relative p-6 flex-auto">
                            {/* thông tin sản phẩm */}
                            {render(proDetail)}
                            <hr className=""></hr>
                            {/* nội dung chi tiết*/}

                            <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden">
                                <table className="w-full" variant="simple" color="gray-500" mb="24px">
                                    <thead className="bg-[#F4F7FE] border">
                                        <tr className="">
                                            <th className="px-5 pt-2 border-b flex items-center gap-2 border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                                                <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                                    Ngày nhập
                                                </div>
                                            </th>
                                            <th className=" pt-2 border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                                                <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                                    Số lượng
                                                </div>
                                            </th>
                                            <th className="pt-2 border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                                                <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                                    Giá
                                                </div>
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products && products.length > 0 && products.map((product, index) => (
                                            <tr key={index} className='border row hover:bg-[#F4F7FE] hover:cursor-pointer'>
                                                <td className="px-5 pt-[10px] pb-[10px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2">
                                                    {product.created_at}
                                                </td>
                                                <td className="pt-[10px] pb-[10px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                                                    <div className=''>
                                                        {product.qty}
                                                    </div>
                                                </td>
                                                <td className="pt-[10px] pb-[10px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                                                    {product.price_root?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </td>
                                                {/* <td className="pt-[10px] pb-[10px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                                                    {product.sum_qty_store - product.sum_qty_selled}
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="bg-green-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowProduct(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default Product;
