import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { urlImage } from '../../../config';
// import { IoIosSearch } from "react-icons/io";
import Loading from '../../../Loading';
import ReactPaginate from "react-paginate";
import ProductServices from '../../../services/ProductServices';
import CustomerServices from '../../../services/CustomerServices';
import OrderServices from '../../../services/OrderServices';
import swal from 'sweetalert';

function ProductDelivery() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [pageCustomer, setPageCustomer] = useState(1);
  const [totalCustomer, setTotalCustomer] = useState();
  const [load, setLoad] = useState(false)
  const [reLoad, setReLoad] = useState();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [productselecteds, setProductSelecteds] = useState([]);
  useEffect(function () {
    (async function () {
      setLoad(true)

      const result = await ProductServices.getProducts(page);
      setProducts(result.products.data)
      setTotal(result.total);

      const resultCustomer = await CustomerServices.getAll(pageCustomer);
      setCustomers(resultCustomer.users.data)
      setTotalCustomer(resultCustomer.total)

      setLoad(false)
    })();
  }, [reLoad, pageCustomer, page])
  //------------pagination-------------
  const numberPageCustomer = Math.ceil(totalCustomer / 5);
  const handlePageCustomerChange = (event) => {
    setPageCustomer(event.selected + 1);
  };
  const numberPage = Math.ceil(total / 5);
  const handlePageChange = (event) => {
    setPage(event.selected + 1);
  };
  //--------add customer------
  async function CustomerAdd(customer) {
    setCustomer(customer);
  }
  
  //--------add product------
  async function ProductAdd(product) {
    setProductSelecteds(prevSelected => [...prevSelected, product]);
  }
  //--------bỏ chọn sản phẩm----
  const handleDeleteProduct = (product) => {
    const isSelected = productselecteds.includes(product);
    if (isSelected) {
      productselecteds(prevSelected => prevSelected.filter(item => item.id !== product.id));
    } 
    setReLoad(Date.now)
  };
  var ListCart = [];
    const listProductId = document.querySelectorAll("#productid");
    listProductId.forEach((prouductid)=>{
      var id = prouductid.value
      var qty = (document.querySelector("#qty" + id)).value;
      var gia = (document.querySelector("#price" + id)).value;
      ListCart = [...ListCart, 
                  { id: id, 
                    quantity:qty*1, 
                    price:(gia)*(qty)}
                  ]
    });
    console.log(ListCart)
  //------ nhấn xuất hoá đơn--------------------------
  const ExportOrder = () => {
    const order = {
      user_id: customer.id,
      name: customer.name,
      email: customer.email,
      address: customer.address,
      phone: customer.phone,
      note: 'no',
  };
    var ListCart = [];
    const listProductId = document.querySelectorAll("#productid");
    listProductId.forEach((prouductid)=>{
      var id = prouductid.value
      // var qty = (document.querySelector("#qty" + id)).value;
      // var gia = (document.querySelector("#price" + id)).value;
      ListCart = [...ListCart, 
                  { id: id, 
                    quantity:1, 
                    price:123000}
                  ]
    });
    console.log()
    const data = {
      order:order,
      ListCart: ListCart,
    };
    (async function(){
      OrderServices.doCheckout(data)
      .then(function (result) {
          if(result.status == true)
          {
              swal("Success", result.message, "success");
          }
      });
    })();
    setCustomer("");
    setProductSelecteds([]);
    setReLoad(Date.now);
  };
  return (
    <div>
      {load ? (<Loading />) : (<></>)}
      <div className="page-header">
        <div className='row'>
          <h1 className='ml-4 mr-3'>Xuất hàng</h1>
        </div>
        <nav aria-label=" breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="!#"></Link></li>
          </ol>
        </nav>
      </div>
      <div className='mb-4'>
      <>
            {/* Button trigger modal */}
            <button
              type="button"
              className="btn-primary"
              data-toggle="modal"
              data-target="#staticBackdrop"
              style={{ height: 30, background: "rgb(182, 109, 255)", border: "none", borderRadius: 5, color: "black" }}
            >
             Chọn khách hàng
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
                    Khách hàng
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
                                  <th> Tên khách hàng </th>
                                  <th> Điện thoại </th>
                                  <th> Eamil </th>
                                  <th> Địa chỉ </th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  (customers && customers.length > 0 && customers.map(function (user, index) {
                                    return (
                                      <tr className="datarow" key={index}>
                                        <td className="" style={{ width: 26 }}>
                                          <input style={{ width: 16 }} type="checkbox" id="checkboxID" />
                                        </td>
                                        <td className="py-1">
                                          <img className="img-fluid" src={urlImage + "user/" + user.image} alt="hinh" />
                                        </td>
                                        <td>
                                          <div className='row'>
                                            <div className=''>{user.name}</div>
                                          </div>
                                        </td>
                                        <td> {user.phone} </td>
                                        <td> {user.email} </td>
                                        <td> {user.address} </td>
                                        <td>
                                          <button className="btn btn-success btn-sm" onClick={() => CustomerAdd(user)}>
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
                    pageCount={numberPageCustomer}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageCustomerChange}
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

        <div className="row" id="rowshowcustome">
          <div className="col-md">
            <label>Họ tên (*)</label>
            <input type="text" value={customer.name} className="form-control" readOnly  style={{background:'white'}}/>
          </div>
          <div className="col-md">
            <label>Email (*)</label>
            <input type="text" value={customer.email} className="form-control" readOnly style={{background:'white'}}/>
          </div>
          <div className="col-md">
            <label>Điện thoại (*)</label>
            <input type="text" value={customer.phone} className="form-control" readOnly style={{background:'white'}}/>
          </div>
          <div className="col-md-5">
            <label>Địa chỉ (*)</label>
            <input type="text" value={customer.address} className="form-control" readOnly style={{background:'white'}}/>
          </div>
          {/* <input type="hidden" name="user_id" /> */}
        </div>

      </div>
      <>
            {/* Button trigger modal */}
            <button
              type="button"
              className="btn-primary mb-2"
              data-toggle="modal"
              data-target="#product"
              style={{ height: 30, background: "rgb(182, 109, 255)", border: "none", borderRadius: 5, color: "black" }}
            >
              Chọn sản phẩm
            </button>
            {/* Modal */}
            <div
              className="modal fade"
              id="product"
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
                      Xuất hàng
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
                                  <th><div style={{ width: 26 }}>
                                    <input style={{ width: 16 }} type="checkbox" id="checkboxAll" />
                                    </div> </th>
                                  <th> Hình ảnh </th>
                                  <th> Tên sản phẩm </th>
                                  <th> Tên danh mục </th>
                                  <th> Tên thương hiệu </th>
                                  <th> Giá </th>
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
                                        <td> {product.price} </td>
                                        <td>
                                          <button className="btn btn-success btn-sm" onClick={() => ProductAdd(product)}>
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

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th> Hình ảnh </th>
                      <th> Tên sản phẩm </th>
                      <th> Tên danh mục </th>
                      <th> Tên thương hiệu </th>
                      <th> Số lượng </th>
                      <th> Giá </th>
                      {/* <th> Thành tiền </th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productselecteds && productselecteds.length > 0 && productselecteds.map(function (product, index) {
                      return (
                        <tr className="datarow" key={index}>
                          <td className="py-1">
                            <img className="img-fluid" src={urlImage + "product/" + product.image} alt="hinh" />
                            <input type="text" value={product.id} id='productid' hidden/>
                          </td>
                          <td>{product.name}</td>
                          <td> {product.category_name} </td>
                          <td> {product.brand_name} </td>
                          <td> <input style={{ width: 50, background:"white" }} type="number" id={"qty" + product.id}/></td>
                          <td> {product.price} <input style={{ width: 16 }} type="number" value={product.price} id={"price" + product.id} hidden/>
                          </td>
                          {/* <td> {product.price} <input style={{ width: 16 }} type="text" value={1} id={'qty'+product.id} hidden/></td> */}
                          <td><button className=" btn btn-danger btn-xs px-2" onClick={handleDeleteProduct(product)}>X</button></td>
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
      <div className='text-right'><button className="btn btn-success btn-xs px-2 " onClick={ExportOrder}>Xuất hàng</button></div>





    </div>
  );
}

export default ProductDelivery;