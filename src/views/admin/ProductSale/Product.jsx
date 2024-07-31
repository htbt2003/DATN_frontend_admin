import React, { useEffect, useState } from "react";
import { urlImage } from '../../../config';
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import ProductServices from '../../../services/ProductServices';

const Product = ({ setProductSelecteds, setShowProduct, productIdSelected, setproductIdSelected, date_begin ,date_end, reLoad, setReLoad}) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [selecteditems, setSelecteditems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [brandId, setBrandId] = useState([]);
    const [catId, setCatId] = useState([]);
    const [keySearch, setKeyearch] = useState("");

    var condition = {
        keySearch: keySearch,
        brandId: brandId,
        catId: catId,
        productIdSelected:productIdSelected,
        date_begin:date_begin,
        date_end:date_end,
    }
    useEffect(() => {
        (async function () {
            const result = await ProductServices.getProductStoreToSale(page, condition);
            setProducts(result.products.data);
            setTotal(result.total);
            setCategories(result.categories)
            setBrands(result.brands)
        })();
    }, [reLoad, page]);
    const numberPage = Math.ceil(total / 5);

      //chọn sản phẩm---------
  const handleCheckbox = (product) => {
    if (selecteditems.includes(product)) {
        setSelecteditems(prevSelected => prevSelected.filter(item => item.id !== product.id));
        // setproductIdSelected(prevIDSelected => prevIDSelected.filter(id => id !== product.id));
    } else {
        setSelecteditems(prevSelected => [...prevSelected, product]);
        // setproductIdSelected(prevIDSelected => [...prevIDSelected, product.id]);
    }
  };

    const handlePageChange = (event) => {
        setPage(event.selected + 1);
    };

    //search enter------------------
    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') {
            setReLoad(Date.now())
        }
    };
    //search time----------------
    let time;
    const handleChange = (event) => {
        setKeyearch(event.target.value);
    };
    //chọn danh muc----------------
    const handleCat = (event) => {
        setCatId(event.target.value);
        setReLoad(Date.now())
    };
    //search time----------------
    const handleBrand = (event) => {
        setBrandId(event.target.value);
        setReLoad(Date.now())
    };
    //chọn sản phẩm---------------------
    const handleConfirm = () => {
        setProductSelecteds(prevProductSelecteds => [...prevProductSelecteds, ...selecteditems]);
        selecteditems && selecteditems.forEach(function (item) {
            setproductIdSelected(prevIDSelected => [...prevIDSelected, item.id]);
        })
        setReLoad(Date.now)
        setShowProduct(false)
    };


    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

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
                            <div className='flex flex-row flex-wrap mb-5 items-center'>
                                <div className='flex'>
                                    <div className="mr-2 ">
                                        <select name="" className="focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border border-dark rounded mt-2 flex h-9 w-full items-center justify-center rounded-xl border p-2 text-sm outline-none" onChange={(e) => handleCat(e)}>
                                            <option value="">Danh mục</option>
                                            {categories && categories.length > 0 && categories.map(function (category, index) {
                                                return (
                                                    <option value={category.id} key={index}>{category.name}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="mr-2 ">
                                        <select name="" className="focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border border-dark rounded mt-2 flex h-9 w-full items-center justify-center rounded-xl border p-2 text-sm outline-none" onChange={(e) => handleBrand(e)}>
                                            <option value="">Thương hiệu</option>
                                            {brands && brands.length > 0 && brands.map(function (brand, index) {
                                                return (
                                                    <option value={brand.id} key={index}>{brand.name}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="relative mt-[3px] h-[50px] xl:w-[325px] items-center justify-around rounded-full px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 ml-auto">
                                    <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700">
                                        <p className="pl-3 pr-2 text-xl">
                                            <IoIosSearch className="h-4 w-4 text-gray-400 dark:text-white" onClick={() => setReLoad(Date.now())} />
                                        </p>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
                                            onChange={handleChange}
                                            onKeyDown={handleKeyEnter}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden">
                                <table className="w-full" variant="simple" color="gray-500" mb="24px">
                                    <thead>
                                        <tr>
                                            <th className="border-b flex items-center gap-2 border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                                                <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                                    Hình ảnh
                                                </div>
                                            </th>
                                            <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                                                <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                                    Tên
                                                </div>
                                            </th>
                                            <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                                                <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                                    Giá
                                                </div>
                                            </th>
                                            <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                                                <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                                    Tồn kho
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products && products.length > 0 && products.map((product, index) => (
                                            <>
                                            {/* <tr>
                                                <td>dfdf</td>
                                                <td>dfdf</td>
                                            </tr>
                                            <tr>
                                                <td>dfdf</td>
                                                <td>dfdf</td>
                                            </tr> */}
                                                                                        <tr key={index} className='row hover:bg-[#F4F7FE] hover:cursor-pointer'>
                                                <td className="pt-[10px] pb-[10px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
 justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s]
 checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
                                                        id={"category" + product.id}
                                                        onChange={() => handleCheckbox(product)}
                                                        checked={selecteditems.includes(product)}
                                                    />
                                                    <img className="flex h-16 w-16 items-center justify-center rounded-xl" src={urlImage + "product/" + product.image} alt="hinh" />
                                                </td>
                                                <td className="pt-[10px] pb-[10px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                                                    <div className=''>
                                                        <p>{truncateText(product.name, 15)}</p>
                                                    </div>
                                                </td>
                                                <td className="pt-[10px] pb-[10px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                                                    {product.price_sale ? (
                                                        <>
                                                            <div style={{ textDecoration: 'line-through', color: 'red' }}>
                                                                {product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                            </div>
                                                            <div>
                                                                {product.price_sale?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div>
                                                            {product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="pt-[10px] pb-[10px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
                                                    {product.sum_qty_store - product.sum_qty_selled}
                                                </td>
                                            </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <ReactPaginate
                                className="flex justify-end items-center mt-1"
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
                                className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowProduct(false)}
                            >
                                Đóng
                            </button>
                            <button
                                className="bg-green-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleConfirm}
                            >
                                Xác nhận
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
