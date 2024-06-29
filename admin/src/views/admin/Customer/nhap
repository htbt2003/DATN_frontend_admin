import { Link } from 'react-router-dom';
import {FaEdit, FaPlus, FaRegEye, FaTrash} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import CustomerServices from '../../../services/CustomerServices';
import { urlImage } from '../../../config';
import { IoIosSearch } from "react-icons/io";
import Loading from '../../../Loading';
import ReactPaginate from "react-paginate";
import { TbRestore } from "react-icons/tb";

function CustomerTrashList() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [load, setLoad] = useState(false)
  const [reLoad, setReLoad] = useState();
    const [users, setUsers] = useState([]);
    useEffect(function(){
      (async function(){
        setLoad(true)
        const result = await CustomerServices.trash(page);
        setUsers(result.users.data);
        setTotal(result.total);
        setLoad(false)
      })();
    },[reLoad,page])
    async function UserDelete(id)
    {
      await CustomerServices.remove(id)
            .then(function(result){
                alert(result.message)
                setReLoad(id)
            });
    }
    async function handleRestore(id) {
      const result = await CustomerServices.restore(id)
      alert(result.message)
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
          <h1 className='ml-4 mr-3'>Khách hàng</h1>
          <Link to="/admin/customer/create"><button className='btn-primary' style={{ height: 30, background: "rgb(182, 109, 255)", border: "none", borderRadius: 5, color: "black" }}>Thêm mới</button></Link>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to='/admin/customer'>Tất cả()</Link></li>
            <li className="breadcrumb-item active" aria-current="page" >Xuất bản()</li>
            <li className="breadcrumb-item active" aria-current="page"><Link to='/admin/customer/trash'>Rác()</Link></li>
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
        <div className="search-field d-none d-md-block m-1" style={{height:50}}>
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
                      <th> Họ tên khách hàng </th>
                      <th> Điện thoại </th>
                      <th> Email </th>
                      <th> Id </th>
                    </tr>
                  </thead>
                  <tbody>
                  {users && users.length > 0 && users.map(function (user, index) {
                      return (
                        <tr className="datarow" key={index}>
                          <td className="" style={{ width: 26 }}>
                            <input style={{ width: 16 }} type="checkbox" id="checkboxID" />
                          </td>
                          <td className="py-1">
                          <img className="img-fluid" src={urlImage + "user/" + user.image} alt="hinh"/>
                          </td>
                          <td>
                            <div className='row'>
                              <div className='col-7 pt-2'>{user.name}</div>
                              <div className="col- 2 function_style">
                                <button onClick={()=>handleRestore(user.id)} className="btn btn-success btn-sm">
                                  <TbRestore />
                                </button>
                                <Link to={"/admin/customer/update/"+ user.id} className="btn btn-primary btn-sm">
                                  <i className="fa fa-edit" />
                                </Link>
                                <Link to={"/admin/customer/show/" + user.id} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye" />
                                </Link>
                                <button href="#" className="btn btn-danger btn-sm" onClick={()=>UserDelete(user.id)}>
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td> {user.phone} </td>
                          <td> {user.email} </td>
                          <td> {user.id} </td>
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

export default CustomerTrashList;