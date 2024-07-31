import ProductStoreServices from '../../../services/ProductStoreServices';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { urlImage } from '../../../config';
import { IoIosSearch } from "react-icons/io";
import Loading from '../../../Loading';
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaEdit, FaPlus, FaRegEye, FaTrash } from 'react-icons/fa';
import Card from 'components/card';
import { IoToggle } from "react-icons/io5";
import { LiaToggleOffSolid } from "react-icons/lia";
import Product from './Product';

function ProductStoreList() {
  const [showProduct, setShowProduct] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState(false)
  const [reLoad, setReLoad] = useState();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState([]);
  const [catId, setCatId] = useState([]);
  const [trash, setTrash] = useState();
  const [keySearch, setKeyearch] = useState("");
  const [selectedproducts, setSelectedproducts] = useState([]);
  const [action, setAction] = useState();
  const [proDetail, setProDetail] = useState();
  document.title = "Danh sách kho hàng";
  var condition = {
    keySearch: keySearch,
    brandId: brandId,
    catId: catId
  }

  const fetchAPI = async () => {
    try {
      setLoad(true);

      const result = await ProductStoreServices.getAll(page, condition);
      setProducts(result.prostores.data);
      setTotal(result.prostores.total);
      // setTrash(result.trash)
      setCategories(result.categories)
      setBrands(result.brands)

      setLoad(false);
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(function () {
    (async function () {
      window.scroll(0, 0);
      fetchAPI()
    })();
  }, [reLoad, page])
  function productDelete(id) {
    swal({
      title: "Cảnh báo",
      text: "Cẩn trọng, khi bạn xóa sản phẩm trong kho sẽ liên quan tới doanh thu báo cáo sẽ thay đổi ?",
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
        try {
          const result = await ProductStoreServices.remove(id)
          setReLoad(id)
        }
        catch (error) {
          console.log(error)
        }
      }
    });
  }

  //restore---------------------
  // function handleStatus(product) {
  //   swal({
  //     title: "Cảnh báo",
  //     text: product.status == 1 ? "Tạm thời ngưng bán sản phẩm này?" : "Mở bán lại sản phẩm này?",
  //     icon: "warning",
  //     buttons: {
  //       cancel: "Không",
  //       confirm: {
  //         text: "Có",
  //         value: true,
  //         visible: true,
  //         className: "btn-delete",
  //         closeModal: true
  //       }
  //     }
  //   }).then(async (result) => {
  //     if (result) {
  //       try {
  //         const result = await ProductStoreServices.changeStatus(product.id)
  //         setReLoad(Date.now)
  //       }
  //       catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   });
  // }
  //------------pagination-------------
  const numberPage = Math.ceil(total / 5);
  const handlePageChange = (event) => {
    setPage(event.selected + 1);
  };
  //chọn sản phẩm---------
  const handleCheckbox = (productId) => {
    if (selectedproducts.includes(productId)) {
      setSelectedproducts(prevSelected => prevSelected.filter(id => id !== productId));
    } else {
      setSelectedproducts(prevSelected => [...prevSelected, productId]);
    }
  };
  //bỏ vào thùng rác--------------
  const handleAction = () => {
    const data = {
      listId: selectedproducts
    }
    swal({
      title: "Cảnh báo",
      text: "Bạn có chắc muốn bỏ những product này vào thùng rác?",
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
        if (action === "trash") {
          try {
            const result = await ProductStoreServices.action_destroy(data);
            setReLoad(Date.now)
            console.log(true)
          }
          catch (error) {
            console.log(error)
          }
        }
      }
    });

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

    // clearTimeout(time);
    // time = setTimeout(setReLoad(Date.now()), 10000);
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
  //show product---------------------
  function handleShow(product) {
    setProDetail(product);
    setShowProduct(true);
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
  }; 

  const RowMenu = ({ product, index }) => {
    let name = product.name;
    let hinhanh = urlImage + "product/" + product.image;

    if (product.variant) {
      name = product.variant.name;

      product.variant.variant_values.forEach(function (item1) {
        if (item1.product_attribute_value.image != null) {
          hinhanh = urlImage + "pro_attribute/" + item1.product_attribute_value.image;
        }
      });
    }
    return (
      <tr key={index} className="row group hover:bg-gray-100 dark:hover:bg-gray-800 relative border-b">
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2">
          <input
            type="checkbox"
            className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
 justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s]
 checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
            id={"category" + product.id}
            onChange={() => handleCheckbox(product.id)}
            checked={selectedproducts.includes(product.id)}
          />
          <img className="flex h-28 w-24 items-center justify-center rounded-xl" src={hinhanh} alt="hinh" />
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white relative">
          <div className=''>
            <h5>
              <Link>{truncateText(product.name, 30)}</Link>
            </h5>
            {
              product.variant ? (
                <div className="product-title">
                  {product.variant.variant_values.map((item2, index) =>
                    <a className='mr-3 text-muted' key={index}>{item2.product_attribute_value.attribute_value.name}</a>
                  )}
                </div>
              ) : null
            }
            <div className="absolute top-200 right-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-wrap flex-row ml-2 mt-2">
              <button
                onClick={() => handleShow(product)}
                className='mr-2'>
                <FaRegEye />
              </button>
              {/* <Link to={"/admin/productstore/update/" + product.id} className="text-blue-500 mr-2">
                <FaEdit />
              </Link> */}
              <button href="#" className="text-[#ef4444]" onClick={() => productDelete(product.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white">
          {product.sum_qty_store}
        </td>

      </tr>
    );
  };

  return (
    <>
      {load ? (<Loading />) : (<></>)}
      <div className='mt-5'>
        <div className='flex flex-row flex-wrap items-center gap-2 mb-2'>
          <div className='flex flex-row flex-wrap'>
            <p className="shrink text-[33px]  text-navy-700 dark:text-white">
              <a className="font-bold  hover:text-navy-700 dark:hover:text-white" href="/admin/product">
                Kho sản phẩm
              </a>
            </p>
          </div>
          <div className='ml-auto items-center justify-center'>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb flex" >
                <li className="breadcrumb-item mr-4 text-blue-500"><Link to="/admin/product">Tất cả({total})</Link></li>
                {/* <li className="breadcrumb-item mr-4 " aria-current="page" >Xuất bản({publish})</li> */}
                <li className="breadcrumb-item text-blue-500" aria-current="page"><Link to="/admin/product/trash">Rác({trash})</Link></li>
              </ol>
            </nav>
          </div>
        </div>
        <div className='flex flex-row flex-wrap mb-5 items-center'>
          <div className='flex'>
            <div className="mr-2 ">
              <select name="" className="focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border border-dark rounded mt-2 flex h-9 w-full items-center justify-center rounded-xl border p-2 text-sm outline-none" onChange={(e) => setAction(e.target.value)}>
                <option value="">Hành động</option>
                <option value="trash">Bỏ vào thùng rác</option>
              </select>
            </div>
            {
              (action != null && selectedproducts.length > 0) ?
                (
                  <div className=" p-2 mr-4 btn-secondary border border-dark rounded mt-2 flex h-9 items-center justify-center rounded-xl border p-2 text-sm outline-none hover:cursor-pointer" style={{ background: "#bfbfbf" }} onClick={() => handleAction()}>Áp dụng</div>
                ) :
                (
                  <div className=" p-2 mr-4 btn-secondary border border-dark rounded mt-2 flex h-9 items-center justify-center rounded-xl border p-2 text-sm outline-none hover:cursor-pointer" style={{ background: "#bfbfbf", opacity: 0.3 }} >Áp dụng</div>
                )
            }
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
          <div className="relative mt-[3px] h-[50px] xl:w-[325px] items-center justify-around rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0  ml-auto">
            <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700  ">
              <p className="pl-3 pr-2 text-xl">
                <IoIosSearch className="h-4 w-4 text-gray-400 dark:text-white" onClick={() => setReLoad(Date.now())} />
              </p>
              <input
                type="text"
                placeholder="Search..."
                class="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
                onChange={handleChange}
                onKeyDown={handleKeyEnter}
              />
            </div>
          </div>
        </div>

        <Card extra={"w-full h-full sm:overflow-auto p-6"}>
          <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
            <table
              className="w-full"
              variant="simple"
              color="gray-500"
              mb="24px"
            >
              <thead>
                <tr className=''>
                  <th className="border-b flex items-center gap-2 border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                    <input
                      type="checkbox"
                      className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
  justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s]
  checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
                      name="weekly"
                    />
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
                      Số lượng
                    </div>
                  </th>
                </tr>

              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <RowMenu product={product} index={index} />
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
        <ReactPaginate
          className="flex justify-end items-center mt-3"
          previousLabel={
            <div className="flex ml-1 pt-2 pb-2 text-brand-500">
              <FaChevronLeft size="0.6rem" />
              <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          nextLabel={
            <div className="flex ml-1 pt-2 pb-2 text-brand-500">
              <FaChevronRight size="0.6rem" />
              <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
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

      {
        showProduct ? (
          <Product proDetail={proDetail} setShowProduct={setShowProduct} />
        )  : null
      }
    </>

  );
}

export default ProductStoreList;