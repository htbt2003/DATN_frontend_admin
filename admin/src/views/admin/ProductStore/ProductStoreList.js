import ProductStoreServices from '../../../services/ProductStoreServices';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { urlImage } from '../../../config';
import { IoIosSearch } from "react-icons/io";
import Loading from '../../../Loading';
import ReactPaginate from "react-paginate";
import ProductServices from '../../../services/ProductServices';

function ProductStoreList() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [pageStore, setPageStore] = useState(1);
  const [totalStore, setTotalStore] = useState();
  const [load, setLoad] = useState(false)
  const [reLoad, setReLoad] = useState();
  const [prostores, setProstores] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(function () {
    (async function () {
      setLoad(true)
      
      const resultStore = await ProductStoreServices.getAll(pageStore);
      setProstores(resultStore.prostores.data)
      setTotal(resultStore.total);

      const result = await ProductServices.getAll(page);
      setProducts(result.products.data)
      setTotalStore(result.total)
      setTotal(result.total);

      setLoad(false)
    })();
  }, [reLoad, pageStore, page])
  //------------pagination-------------
  const numberPageStore = Math.ceil(totalStore / 5);
  const handlePageStoreChange = (event) => {
    setPageStore(event.selected + 1);
  };
  const numberPage = Math.ceil(total / 5);
  const handlePageChange = (event) => {
    setPage(event.selected + 1);
  };
  console.log(totalStore)
  //--------add product------
  async function ProductAdd(id) {
    const priceroot = document.querySelector("#priceroot" + id)
    const qty = document.querySelector("#qty" + id)
    const prostore = {
      product_id: id,
      price_root: priceroot.value,
      qty: qty.value,
    }
    const result = await ProductStoreServices.create(prostore)
    alert(result.message)
    setReLoad(Date.now)
  }

  return (
    <div>
      {load ? (<Loading />) : (<></>)}
      <div className="page-header">
        <div className='row'>
          <h1 className='ml-4 mr-3'>Kho hàng</h1>
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
                                  <th> Giá nhập </th>
                                  <th> Số lượng </th>
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
                                        <td> {product.category.name} </td>
                                        <td> {product.brand.name} </td>
                                        <td> 
                                          <input type='text' id={"priceroot" + product.id}/>
                                        </td>
                                        <td>
                                          <input type='text' id={"qty" + product.id}/>
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
            <li className="breadcrumb-item"><Link href="!#">Tất cả({totalStore})</Link></li>
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
                      <th> Id </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prostores && prostores.length > 0 && prostores.map(function (prostore, index) {
                      return (
                        <tr className="datarow" key={index}>
                          <td className="" style={{ width: 26 }}>
                            <input style={{ width: 16 }} type="checkbox" id="checkboxID" />
                          </td>
                          <td className="py-1">
                            <img className="img-fluid" src={urlImage + "product/" + prostore.product.image} alt="hinh" />
                          </td>
                          <td>
                            <div className='row'>
                              <div className='col-7 pt-2'>{prostore.product.name}</div>
                              <div className="col-2 function_style">
                                <Link to={"/admin/category/show/" + prostore.product_id} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td> {prostore.product.category.name} </td>
                          <td> {prostore.product.brand.name} </td>
                          <td> {prostore.sum_qty} </td>
                          <td> {prostore.avg_price} </td>
                          <td> {prostore.product_id} </td>
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
        pageCount={numberPageStore}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageStoreChange}
        containerClassName="pagination"
        activeClassName="active"
      // forcePage={pageOffset} // lay trang hien tai
      />






    </div>
  );
}

export default ProductStoreList;