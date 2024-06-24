import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContactServices from '../../../services/ContactServices';
import { IoIosSearch } from "react-icons/io";
import Loading from '../../../Loading';
import ReactPaginate from "react-paginate";


function ContactList() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [load, setLoad] = useState(false)
  const [reLoad, setReLoad] = useState();
  const [contacts, setContacts] = useState([]);
  const [trash, setTrash] = useState();

    useEffect(function(){
      (async function(){
        setLoad(true)
        const result = await ContactServices.getAll(page);
        setContacts(result.contacts.data);
        setTotal(result.total);
        setTrash(result.trash)
        setLoad(false)
      })();
    },[reLoad, page])
    async function ContactDelete(id)
    {
      await ContactServices.delete(id)
            .then(function(result){
                alert(result.message)
                setReLoad(id)
     });
    }
    async function handleStatus(id) {
      const result = await ContactServices.changeStatus(id)
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
          <h1 className='ml-4 mr-3'>Liên hệ</h1>
          {/* <Link to="/admin/brand/create"><button className='btn-primary' style={{ height: 30, background: "rgb(182, 109, 255)", border: "none", borderRadius: 5, color: "black" }}>Thêm mới</button></Link> */}
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to='/admin/contact'>Tất cả({total})</Link></li>
            <li className="breadcrumb-item active" aria-current="page"><Link to='/admin/contact/trash'>Rác({trash})</Link></li>
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
                      <th> Họ tên </th>
                      <th> Email </th>
                      <th> Điện thoại </th>
                      <th> Tiêu đề </th>
                      <th> Id </th>
                    </tr>
                  </thead>
                  <tbody>
                  {contacts && contacts.length > 0 && contacts.map(function (contact, index) {
                      return (
                        <tr className="datarow" key={index}>
                          <td className="" style={{ width: 26 }}>
                            <input style={{ width: 16 }} type="checkbox" id="checkboxID" />
                          </td>
                          <td className="py-1">
                          <div className='row'>
                              <div className='col-7 pt-2'>{contact.name}</div>
                              <div className="col-2 function_style">
                                <Link to={"/admin/contact/update/"+ contact.id} className="btn btn-primary btn-sm">
                                  <i className="fa fa-edit" />
                                </Link>
                                <Link to={"/admin/contact/show/" + contact.id} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye" />
                                </Link>
                                <button href="#" className="btn btn-danger btn-sm" onClick={()=>ContactDelete(contact.id)}>
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                          {contact.email}

                          </td>
                          <td> {contact.phone} </td>
                          <td> {contact.title} </td>
                          <td> {contact.id} </td>
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

export default ContactList;