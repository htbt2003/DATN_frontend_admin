import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BrandServices from '../../../services/BrandServices';
import { IoIosSearch } from "react-icons/io";
import { urlImage } from '../../../config';
import Loading from '../../../Loading';
import ReactPaginate from "react-paginate";
import { TbRestore } from "react-icons/tb";


function BrandTrashList() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [load, setLoad] = useState(false);
  const [reLoad, setReLoad] = useState();
  const [brands, setBrands] = useState([]);
  const [publish, setPublish] = useState();
  const [trash, setTrash] = useState();

  useEffect(function () {
    (async function () {
      setLoad(true)
      const result = await BrandServices.trash(page);
      setBrands(result.brands.data);
      setTotal(result.total);
      setPublish(result.publish)
      setTrash(result.trash)
      setLoad(false)
    })();
  }, [reLoad,page])
  async function BrandDelete(id) {
    await BrandServices.remove(id)
      .then(function (result) {
        alert(result.message)
        setReLoad(id)
      });
  }
  async function handleReStore(id) {
    const result = await BrandServices.restore(id)
    // alert(result.message)
    setReLoad(Date.now)
  }
    //------------pagination-------------
    const numberPage = Math.ceil(total / 5);
    const handlePageChange = (event) => {
      setPage(event.selected+1);
    };
  
  return (
    <div>
      {load ? (<Loading />) : (<></>)}
      <div className="page-header">
        <div className='row'>
          <h1 className='ml-4 mr-3'>Thương hiệu</h1>
          <Link to="/admin/brand/create"><button className='btn-primary' style={{ height: 30, background: "rgb(182, 109, 255)", border: "none", borderRadius: 5, color: "black" }}>Thêm mới</button></Link>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to='/admin/brand'>Tất cả({total})</Link></li>
            <li className="breadcrumb-item active" aria-current="page" >Xuất bản({publish})</li>
            <li className="breadcrumb-item active" aria-current="page"><Link to='/admin/brand/trash'>Rác({trash})</Link></li>
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
                      <th> Tên thương hiệu </th>
                      <th> Slug </th>
                      <th> Id </th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands && brands.length > 0 && brands.map(function (brand, index) {
                      return (
                        <tr className="datarow" key={index}>
                          <td className="" style={{ width: 26 }}>
                            <input style={{ width: 16 }} type="checkbox" id="checkboxID" />
                          </td>
                          <td className="py-1">
                          <img className="img-fluid" src={urlImage + "brand/" + brand.image} alt="hinh"/>
                          </td>
                          <td>
                            <div className='row'>
                              <div className='col-7 pt-2'>{brand.name}</div>
                              <div className="col- 2 function_style">
                              <button onClick={()=>handleReStore(brand.id)} className="btn btn-success btn-sm">
                                  <TbRestore />
                                </button>
                                <Link to={"/admin/brand/update/"+ brand.id} className="btn btn-primary btn-sm">
                                  <i className="fa fa-edit" />
                                </Link>
                                <Link to={"/admin/brand/show/" + brand.id} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye" />
                                </Link>
                                <button href="#" className="btn btn-danger btn-sm" onClick={()=>BrandDelete(brand.id)}>
                                  <i className="fa fa-trash" />
                                </button>
                              </div>

                            </div>

                          </td>
                          <td> {brand.slug} </td>
                          <td> {brand.id} </td>
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

export default BrandTrashList;