import ProductServices from '../../../services/ProductServices';
import BrandServices from '../../../services/BrandServices';
import CategoryServices from '../../../services/CategoryServices';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { urlImage } from '../../../config';
import { IoIosSearch } from "react-icons/io";
import Loading from '../../../Loading';
import ReactPaginate from "react-paginate";

function ProductList() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [load, setLoad] = useState(false);
  const [reLoad, setReLoad] = useState();
  const [products, setProducts] = useState([]);
  // const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filter_category, setFilterCateggory] = useState(0);
  const [filter_brand, setFilterBrand] = useState(0);
  const [filter_data, setFilterData] = useState([]);
  // const [click_filter, setClickFilter] = useState(0);
  const [key, setKey] = useState("");
  // const [search_data, setSearchData] = useState([]);
  const [publish, setPublish] = useState();
    const [trash, setTrash] = useState();
  useEffect(function () {
    (async function () {
      setLoad(true);

      const resultProduct = await ProductServices.getAll(page);
      setProducts(resultProduct.products.data);
      setTotal(resultProduct.total);
      setPublish(resultProduct.publish)
      setTrash(resultProduct.trash)

      const categoryResult = await CategoryServices.getAll();
      setCategories(categoryResult.categoriesAll);

      const brandResult = await BrandServices.getAll();
      setBrands(brandResult.brandsAll);

      const result = await ProductServices.filter(filter_category, filter_brand);
      setFilterData(result.products)

      setLoad(false);
    })();
  }, [reLoad, page])
  async function ProductDelete(id) {
    const result = await ProductServices.delete(id)
    alert(result.message)
    setReLoad(id)
  }
  async function handleStatus(id) {
    const result = await ProductServices.changeStatus(id)
    // alert(result.message)
    setReLoad(Date.now)
  }
  //------------pagination-------------
  const numberPage = Math.ceil(total / 5);
  const handlePageChange = (event) => {
    setPage(event.selected+1);
  };
  //------------search---------------
  // const searchdata = products.filter((item) => {
  //   return Object.values(item)
  //     .join("")
  //     .toLowerCase()
  //     .includes(key.toLowerCase());
  // });
  //--------------filter-----------------
  // const handleFilter = (e) => {
  //   let filterdata
  //   if (filter_category !== 0 && filter_brand !== 0) {
  //     filterdata = products.filter(item => item.category_id === filter_category && item.brand_id === filter_brand)
  //   }
  //   else if (filter_category !== 0) {
  //     filterdata = products.filter(item => item.category_id === filter_category)
  //   }
  //   else {
  //     filterdata = products.filter(item => item.brand_id === filter_brand)
  //   }
  //   setFilterData(filterdata);

  // }

  // function filteredData() {
  //   let filteredProducts = []
  //   filteredProducts = products
  //   // search
  //   if (key) {
  //     filteredProducts = searchdata;
  //   }
  //   if (filter_category && filter_brand) {
  //     filteredProducts = products.filter(item => item.category_id === filter_category && item.brand_id === filter_brand)
  //   }
  //   else if (filter_category) {
  //     filteredProducts = products.filter(item => item.category_id === filter_category)
  //   }
  //   else if (filter_brand) {
  //     filteredProducts = products.filter(item => item.brand_id === filter_brand)
  //   }
  //   console.log(filteredProducts)
  //   // render
  //   return filteredProducts.map((product, index) => (
  //     <tr className="datarow" key={index}>
  //       <td className="" style={{ width: 26 }}>
  //         <input style={{ width: 16 }} type="checkbox" id="checkboxID" />
  //       </td>
  //       <td className="py-1">
  //         <img className="img-fluid" src={urlImage + "product/" + product.image} alt="hinh" />
  //       </td>
  //       <td>
  //         <div className='row'>
  //           <div className='col-7 pt-2'>{product.name}</div>
  //           <div className="col- 2 function_style">
  //             <button onClick={() => handleStatus(product.id)} className={product.status === 1 ? "btn btn-success btn-sm" : "btn btn-danger btn-sm"}>
  //               <i className={product.status === 1 ? "fa fa-toggle-on" : "fa fa-toggle-off"} />
  //             </button>
  //             <Link to={"/admin/product/update/" + product.id} className="btn btn-primary btn-sm">
  //               <i className="fa fa-edit" />
  //             </Link>
  //             <Link to={"/admin/product/show/" + product.id} className="btn btn-info btn-sm" >
  //               <i className="fa fa-eye" />
  //             </Link>
  //             <button href="#" className="btn btn-danger btn-sm" onClick={() => ProductDelete(product.id)}>
  //               <i className="fa fa-trash" />
  //             </button>
  //           </div>
  //         </div>
  //       </td>
  //       <td> {product.category_id} </td>
  //       <td> {product.brand_id} </td>
  //       <td> {product.id} </td>
  //     </tr>
  //   )
  //   );
  // }
  // const result = filteredData();

  const RowMenu = ({ product }) => {
    return (
      <tr className="datarow">
        <td className="" style={{ width: 26 }}>
          <input style={{ width: 16 }} type="checkbox" id="checkboxID" />
        </td>
        <td className="py-1">
          <img className="img-fluid" src={urlImage + "product/" + product.image} alt="hinh" />
        </td>
        <td>
          <div className='row'>
            <div className='col-7 pt-2'>{product.name}</div>
            <div className="col- 2 function_style">
              <button onClick={() => handleStatus(product.id)} className={product.status === 1 ? "btn btn-success btn-sm" : "btn btn-danger btn-sm"}>
                <i className={product.status === 1 ? "fa fa-toggle-on" : "fa fa-toggle-off"} />
              </button>
              <Link to={"/admin/product/update/" + product.id} className="btn btn-primary btn-sm">
                <i className="fa fa-edit" />
              </Link>
              <Link to={"/admin/product/show/" + product.id} className="btn btn-info btn-sm" >
                <i className="fa fa-eye" />
              </Link>
              <button href="#" className="btn btn-danger btn-sm" onClick={() => ProductDelete(product.id)}>
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        </td>
        <td> {product.category.name} </td>
        <td> {product.brand.name} </td>
        <td> {product.id} </td>
      </tr>
    );
  };

  return (
    <div>
      {load ? (<Loading />) : (<></>)}
      <div className="page-header">
        <div className='row'>
          <h1 className='ml-4 mr-3'>Sản phẩm</h1>
          <Link to="/admin/product/create"><button className='btn-primary' style={{ height: 30, background: "rgb(182, 109, 255)", border: "none", borderRadius: 5, color: "black" }}>Thêm mới</button></Link>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/admin/product">Tất cả({total})</Link></li>
            <li className="breadcrumb-item active" aria-current="page" >Xuất bản({publish})</li>
            <li className="breadcrumb-item active" aria-current="page"><Link to="/admin/product/trash">Rác({trash})</Link></li>
          </ol>
        </nav>
      </div>
      <div className="page-header">
        <div className='row'>
          <div className="ml-4 mr-2">
            <select name="" className="border border-dark rounded">
              <option value="">Hành động</option>
              <option value="">Bỏ vào thùng rác</option>
            </select>
          </div>
          <div className=" p-2 mr-4 btn-secondary" style={{ height: 35, background: "#bfbfbf", border: "none", borderRadius: 2, color: "black", textAlign: "center" }}>Áp dụng</div>
          <div className="mr-2">
            <select name="" className="border border-dark rounded" onChange={(e) => setFilterCateggory(e.target.value)}>
              <option value={0}>Danh mục</option>
              {categories && categories.length > 0 && categories.map(function (category, index) {
                return (
                  <option value={category.id} key={index}>{category.name}</option>
                );
              })}
            </select>
          </div>
          <div className="mr-2">
            <select name="" className="border border-dark rounded" onChange={(e) => setFilterBrand(e.target.value)}>
              <option value={0}>Thương hiệu</option>
              {brands && brands.length > 0 && brands.map(function (brand, index) {
                return (
                  <option value={brand.id} key={index}>{brand.name}</option>
                );
              })}
            </select>
          </div>
          <div className=" p-2 mr-4 btn-secondary" style={{ height: 35, background: "#bfbfbf", border: "none", borderRadius: 2, color: "black", textAlign: "center" }}>Lọc</div>
        </div>
        <div className="search-field d-none d-md-block m-1" style={{ height: 50 }}>
          <form className="d-flex align-items-center h-100 bg-white rounded" action="#">
            <div className="input-group">
              <div className="input-group-prepend bg-transparent">
                <i className="border-0 " style={{ marginTop: '11px', marginLeft: '10px' }}> <IoIosSearch size={20} color="#595959" /></i>
              </div>
              <input onChange={(e) => setKey(e.target.value)} type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th><div style={{ width: 26 }}><input style={{ width: 16 }} type="checkbox" id="checkboxAll" /></div> </th>
                      <th> Hình ảnh </th>
                      <th> Tên sản phẩm </th>
                      <th> Tên danh mục </th>
                      <th> Tên thương hiệu </th>
                      <th> Id </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {filteredData()} */}
                    {
                      (products && products.length > 0 && products.map(function (product, index) {
                        return (
                            <RowMenu product={product} key={index} />
                          );
                      }))
                      // click_filter === 1 ?
                      // (filter_data && filter_data.length > 0 && filter_data.map(function (product, index) {
                      //   return (
                      //       <RowMenu product={product} key={index} />
                      //     );
                      // }))
                      // :
                      // (products && products.length > 0 && products.map(function (product, index) {
                      //   return (
                      //       <RowMenu product={product} key={index} />
                      //     );
                      // }))
                      // click_filter == 0 && key == 0 ?
                      // (products && products.length > 0 && products.map(function (product, index) {
                      //   return (
                      //       <RowMenu product={product} key={index} />
                      //     );
                      // }))
                      // :
                      // (key != 0 && click_filter != 0?
                      //   (search_data && search_data.length > 0 && search_data.map(function (product, index) {
                      //     return (
                      //         <RowMenu product={product} key={index} />
                      //       );
                      //   }))
                      //   :
                      // (filter_data && filter_data.length > 0 && filter_data.map(function (product, index) {
                      //   return (
                      //       <RowMenu product={product} key={index} />
                      //     );
                      // }))
                      // )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <nav aria-label="Page navigation example">
            <ul className="pagination pagination-sm justify-content-end">
              <li className="page-item disabled">
                <Link className="page-link">«</Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  »
                </Link>
              </li>
            </ul>
          </nav> */}
      <ReactPaginate
        className="pagination pagination-sm justify-content-end"
        previousLabel="«"
        nextLabel="»"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={numberPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        // forcePage={pageOffset} // lay trang hien tai
      />





    </div>
  );
}

export default ProductList;