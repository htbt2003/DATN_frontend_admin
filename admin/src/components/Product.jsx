import React, { useEffect, useState } from "react";
import { urlImage } from '../config';
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Variants from "./Variants";

const Product = ({ setProductSelecteds, setShowProduct, funtionApi }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [reLoad, setReLoad] = useState(false);
    const [showVariant, setShowVariant] = useState(false);
    const [product, setProduct] = useState([]);
    var condition = []
    useEffect(() => {
        (async function () {
            const result = await funtionApi(page, condition);
            setProducts(result.products.data);
            setTotal(result.products.total);
        })();
    }, [reLoad, page]);
    const numberPage = Math.ceil(total / 5);

    const handlePageChange = (event) => {
        setPage(event.selected + 1);
    };
    const handleSelectProduct = (product) => {
        // if((product.variants).length > 0){
        //     setProduct(product)
        //     setShowVariant(true)
        // }
        // else{
            setProductSelecteds(prevProductSelecteds => [...prevProductSelecteds, product]);
            // setShowProduct(false)    
        // }
    };
    console.log(products)
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
                                Chọn sản phẩm
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
                            <div className="">
                                <table
                                    className="w-full"
                                    variant="simple"
                                    color="gray-500"
                                    mb="24px"
                                >
                                    <thead>
                                        <tr>
                                            <th className="border-b flex items-center gap-2 border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                                                <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                                    Hình ảnh
                                                </div>
                                            </th>
                                            <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                                                <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                                    Tên sản phẩm
                                                </div>
                                            </th>
                                            <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                                                <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                                    Tên danh mục
                                                </div>
                                            </th>
                                            <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                                                <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                                    Tên thương hiệu
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products && products.length > 0 && products.map((product, index) => (
                                            <tr key={index} className='row hover:bg-[#F4F7FE] hover:cursor-pointer' onDoubleClick={()=>handleSelectProduct(product)}>
                                                <td
                                                    className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2"
                                                >
                                                    <img className="flex h-16 w-16 items-center justify-center rounded-xl" src={urlImage + "product/" + product.image} alt="hinh" />
                                                </td>
                                                <td
                                                    className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white"
                                                >
                                                    <div className=''>
                                                        <p>{product.name}</p>
                                                    </div>

                                                </td>
                                                <td
                                                    className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white "
                                                >
                                                    {product.categoryname}
                                                </td>
                                                <td
                                                    className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white "
                                                >
                                                    {product.brandname}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <ReactPaginate
                                className="flex justify-end items-center mt-3"
                                previousLabel={<div className="flex ml-1 pt-2 pb-2 text-brand-500">
                                    <FaChevronLeft size="0.6rem" />
                                    <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
                                </div>}
                                nextLabel={<div className="flex ml-1 pt-2 pb-2 text-brand-500">
                                    <FaChevronRight size="0.6rem" />
                                    <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
                                </div>}
                                pageCount={numberPage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageChange}
                                containerClassName="pagination"
                                pageClassName="inline-block mx-1"
                                pageLinkClassName="block px-3 py-2 rounded-lg text-brand-500 bg-white"
                                previousClassName="inline-block mx-1"
                                previousLinkClassName="block px-3 py-2 rounded-lg bg-white text-black"
                                nextClassName="inline-block mx-1"
                                nextLinkClassName="block px-3 py-2 rounded-lg bg-white text-black"
                                activeClassName="activePagination"
                                renderOnZeroPageCount={null}
                            />
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
            {
                showVariant?(
                    <Variants product={product} setShowVariant={setShowVariant} setProductSelecteds={setProductSelecteds}/>
                ):null
            }
        </>
    );
};

export default Product;
