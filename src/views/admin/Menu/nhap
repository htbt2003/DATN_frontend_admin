import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuServices from '../../../services/MenuServices';
import { IoIosSearch } from "react-icons/io";
import Loading from '../../../Loading';
import ReactPaginate from "react-paginate";
import { TbRestore } from "react-icons/tb";


function MenuTrashList() {
  const [page, setPage] = useState(1);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [load, setLoad] = useState(false)
  const [reLoad, setReLoad] = useState();
  const [total, setTotal] = useState();
  const [menus, setMenus] = useState([]);
  const [filter, setFilter] = useState(0);
  const [key, setKey] = useState(0);
  const [search_data, setSearchData] = useState([]);
  const [publish, setPublish] = useState();
  const [trash, setTrash] = useState();

  useEffect(function () {
    (async function () {
      try {
        setLoad(true)
        const result = await MenuServices.trash(page);
        setTotal(result.total)
        setMenus(result.menus.data)
        setPublish(result.publish)
        setTrash(result.trash)
        setLoad(false)
      }
      catch (error) {
        console.log(error)
      }
    })();
  }, [reLoad,page])
  async function MenuDelete(id) {
    await MenuServices.remove(id)
      .then(function (result) {
        alert(result.message)
        setReLoad(id)
      });
  }
  async function handleReStore(id) {
    const result = await MenuServices.restore(id)
    // alert(result.message)
    setReLoad(Date.now)
  }
  function handleFilter(filter) {
    setFilter(filter);
  }
  const handleSearch = (event) => {
    const key = event.target.value;
    setKey(key);
    if (key !== 0) {
      const searchdata = menus.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(key.toLowerCase());
      });
      setSearchData(searchdata);
    } else {
      setSearchData(menus);
    }
  };
    //------------pagination-------------
    const numberPage = Math.ceil(total / 5);
    const handlePageChange = (event) => {
      setPage(event.selected+1);
    };
  // ------------------
  const handleSelectAll = (e) => {
    setIsCheckAll(prevState => !prevState);
    setIsCheck(isCheckAll ? [] : menus.map(li => li.name));
  };

  const handleSelectOne = e => {
    const { name, checked } = e.target;
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== name));
    }
    else
    {
      setIsCheck([...isCheck, name]);
    }
    setIsCheckAll(isCheck.length === menus.length);
  };
  const RowMenu = ({ menu }) => {
    return (
      <tr className="datarow">
        <td className="" style={{ width: 26 }}>
          <input id={menu.id} checked={isCheck.includes(menu.name)} onChange={(e) => handleSelectOne(e)} name={menu.name} style={{ width: 16 }} type="checkbox" />
        </td>
        <td>
          <div className='row'>
            <div className='col-7 pt-2'>{menu.name}</div>
            <div className="col-2 function_style">
            <button onClick={()=>handleReStore(menu.id)} className="btn btn-success btn-sm">
                                  <TbRestore />
                                </button>
              <Link to={"/admin/menu/update/" + menu.id} className="btn btn-primary btn-sm">
                <i className="fa fa-edit" />
              </Link>
              <Link to={"/admin/menu/show/" + menu.id} className="btn btn-info btn-sm">
                <i className="fa fa-eye" />
              </Link>
              <Link href="#" className="btn btn-danger btn-sm" onClick={() => MenuDelete(menu.id)}>
                <i className="fa fa-trash" />
              </Link>
            </div>
          </div>
        </td>
        <td> {menu.link} </td>
        <td> {menu.position} </td>
        <td> {menu.id} </td>
      </tr>
    );
  };
  
  return (
    <div>
      {load ? (<Loading />) : (<></>)}
      <div className="page-header">
        <div className='row'>
          <h1 className='ml-4 mr-3'>Mennu</h1>
          <Link to="/admin/menu/create"><button className='btn-primary' style={{ height: 30, background: "rgb(182, 109, 255)", border: "none", borderRadius: 5, color: "black" }}>Thêm mới</button></Link>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/admin/menu">Tất cả({total})</Link></li>
            <li className="breadcrumb-item active" aria-current="page" >Xuất bản({publish})</li>
            <li className="breadcrumb-item active" aria-current="page"><Link to="/admin/menu/trash">Rác({trash})</Link></li>
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
              <option value={0}>Tất cả</option>
              <option value={"danh-muc-san-pham"}>Danh mục sản phẩm</option>
              <option value={"thuong-hieu"}>Thương hiệu</option>
              <option value={"chu-de-bai-viet"}>Chủ đề bài viết</option>
              <option value={"trang-don"}>Trang đơn</option>
              <option value={"tuy-bien"}>Tuỳ biến</option>
            </select>
          </div>
          {/* <div className="mr-2">
          <select name="" className="border border-dark rounded">
            <option value="">Hành động</option>
            <option value="">Bỏ vào thùng rác</option>
          </select>
        </div> */}
          <div className=" p-2 mr-4 btn-secondary" style={{ height: 35, background: "#bfbfbf", border: "none", borderRadius: 2, color: "black", textAlign: "center" }}>Lọc</div>
        </div>
        <div className="search-field d-none d-md-block m-1" style={{ height: 50 }}>
          <form className="d-flex align-items-center h-100 bg-white rounded" >
            <div className="input-group">
              <div className="input-group-prepend bg-transparent">
                <i onClick={() => handleSearch(key)} className="border-0 " style={{ marginTop: '11px', marginLeft: '10px' }}> <IoIosSearch size={20} color="#595959" /></i>
              </div>
              <input
                onChange={(e) => handleSearch(e)}
                type="text"
                className="form-control bg-transparent border-0"
                placeholder="Search projects" />
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
                      <th><div style={{ width: 26 }}><input checked={isCheck.length === menus.length} onChange={(e) => handleSelectAll(e)} style={{ width: 16 }} name="checkboxAll" type="checkbox" id="checkboxAll" /></div> </th>
                      <th> Tên menu </th>
                      <th> Liên kết </th>
                      <th> vị trí </th>
                      <th> Id </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                       (menus && menus.length > 0 && menus.map(function (menu, index) {
                        return (
                          <RowMenu menu={menu} key={index} />
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
        // forcePage={pageOffset} // lay trang hien tai
      />

    </div>
  );
}

export default MenuTrashList;