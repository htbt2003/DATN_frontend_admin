import ProductSaleServices from '../../../services/ProductSaleServices';
import ProductServices from '../../../services/ProductServices';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { urlImage } from '../../../config';
import { IoIosSearch } from "react-icons/io";
import Loading from '../../../Loading';
import ReactPaginate from "react-paginate";

function ProductSaleList() {
  const [page, setPage] = useState(1);
  const [pageSale, setPageSale] = useState(1);
  const [totalSale, setTotalSale] = useState();
  const [total, setTotal] = useState();
  const [load, setLoad] = useState(false)
  const [reLoad, setReLoad] = useState();
  const [prosales, setProsales] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(function(){
    (async function(){
      setLoad(true)

      const resultSale = await ProductSaleServices.getAll(pageSale);
      setProsales(resultSale.prosales.data)
      setTotalSale(resultSale.total);

      const result = await ProductServices.getProducts(page);
      setProducts(result.products.data)
      setTotal(result.total);

      setLoad(false)
    })();
  },[reLoad,page, pageSale])
    //------------pagination-------------
    const numberPageSale = Math.ceil(totalSale / 5);
    const handlePageSaleChange = (event) => {
      setPageSale(event.selected+1);
    };
  const numberPage = Math.ceil(total / 5);
  const handlePageChange = (event) => {
    setPage(event.selected+1);
  };
  //--------add product------
  async function ProductAdd(id) {
    const pricesale = document.querySelector("#pricesale" + id)
    const qty = document.querySelector("#qty" + id)
    const datebegin = document.querySelector("#date_begin" + id)
    const dateend = document.querySelector("#date_end" + id)
    const prosale = {
      product_id: id,
      price_sale: pricesale.value,
      qty: qty.value,
      date_begin: datebegin.value,
      date_end: dateend.value,
    }
    const result = await ProductSaleServices.create(prosale)
    alert(result.message)
    setReLoad(Date.now)
  }

  return (
    <div>
      {load ? (<Loading />) : (<></>)}
      <div className="page-header">
        <div className='row'>
          <h1 className='ml-4 mr-3'>Khuyến mãi</h1>
          <>
            {/* Button trigger modal */}
            <button
              type="button"
              className="btn-primary"
              data-toggle="modal"
              data-target="#staticBackdrop"
              style={{ height: 30, background: "rgb(182, 109, 255)", border: "none", borderRadius: 5, color: "black" }}
            >
              Nhập hàng
            </button>
            {/* Modal */}
            <div
              className="modal fade"
              id="staticBackdrop"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Nhập hàng
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  {/* modal body */}
                  <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card" >
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
                                  <th> Giá sale </th>
                                  <th> Số lượng </th>
                                  <th> Ngày bắt đầu </th>
                                  <th> Ngày kết thúc </th>
                                  <th> </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  (products && products.length > 0 && products.map(function (product, index) {
                                    return (
                                      <tr className="datarow" key={index}>
                                        <td className="" style={{ width: 26 }}>
                                          <input style={{ width: 16 }} type="checkbox" id="checkboxID" />
                                        </td>
                                        <td className="py-1">
                                          <img className="img-fluid" src={urlImage + "product/" + product.image} alt="hinh" />
                                        </td>
                                        <td>
                                          <div className='row'>
                                            <div className=''>{product.name}</div>
                                          </div>
                                        </td>
                                        <td> {product.category_name} </td>
                                        <td> {product.brand_name} </td>
                                        <td> 
                                          <input type='text' id={"pricesale" + product.id}/>
                                        </td>
                                        <td>
                                          <input type='text' id={"qty" + product.id}/>
                                        </td>
                                        <td> 
                                          <input type='date' id={"date_begin" + product.id}/>
                                        </td>
                                        <td>
                                          <input type='date' id={"date_end" + product.id}/>
                                        </td>
                                        <td>               
                                          <button className="btn btn-success btn-sm" onClick={() => ProductAdd(product.id)}>
                                            <i className="fa fa-plus" />
                                          </button>
                                        </td>
                                      </tr>

                                    );
                                  }))
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  />
                  {/* end modal body */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn-secondary"
                      data-dismiss="modal"
                      style={{ height: 30, border: "none", borderRadius: 5, color: "black" }}
                    >
                      Close
                    </button>
                    <button type="button" className="btn-primary" style={{ height: 30, border: "none", borderRadius: 5, color: "black" }}>
                      Understood
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>

        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="!#">Tất cả({total})</Link></li>
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
            <select name="" className="border border-dark rounded">
              <option value="">Hành động</option>
              <option value="">Bỏ vào thùng rác</option>
            </select>
          </div>
          <div className="mr-2">
            <select name="" className="border border-dark rounded">
              <option value="">Hành động</option>
              <option value="">Bỏ vào thùng rác</option>
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
              <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
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
                      <th> Số lượng </th>
                      <th> Giá </th>
                      <th> Ngày bắt đầu </th>
                      <th> Ngày kết thúc </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prosales && prosales.length > 0 && prosales.map(function (prosale, index) {
                      return (
                        <tr className="datarow" key={index}>
                          <td className="" style={{ width: 26 }}>
                            <input style={{ width: 16 }} type="checkbox" id="checkboxID" />
                          </td>
                          <td className="py-1">
                            <img className="img-fluid" src={urlImage + "product/" + prosale.product.image} alt="hinh" />
                          </td>
                          <td>
                            <div className='row'>
                              <div className='col-7 pt-2'>{prosale.product.name}</div>
                              <div className="col-2 function_style">
                                <Link to={"/admin/prosale/show/" + prosale.product_id} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td> {prosale.product.category.name} </td>
                          <td> {prosale.product.brand.name} </td>
                          <td> {prosale.qty} </td>
                          <td> {prosale.price_sale} </td>
                          <td> {prosale.date_begin} </td>
                          <td> {prosale.date_end} </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        pageCount={numberPageSale}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageSaleChange}
        containerClassName="pagination"
        activeClassName="active"
      // forcePage={pageOffset} // lay trang hien tai
      />






    </div>
  );
}

export default ProductSaleList;