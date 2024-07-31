import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuServices from "../../../services/MenuServices"

function MenuShow() {
    const navigator = useNavigate();
    const {id} = useParams();
    const [menu, setMenu] = useState([])
    useEffect (function(){
          (async function(){
            await MenuServices.getById(id)
            .then(function(result){
                setMenu(result.menu)
            });
          })();
    },[]);
    async function MenuDelete(id)
    {
      await MenuServices.remove(id)
            .then(function(result){
                alert(result.message)
                navigator("/admin/menu", {replace:true})
            });
    }
    return (
        <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="text-danger text-uppercase">
                Chi tiết danh mục
              </strong>
            </div>
            <div className="col-6 text-end">
                <Link to="/admin/menu" className="btn btn-info btn-sm me-2">
                    <FaPlus/> Về danh sách
                </Link>
                <Link className="btn btn-sm btn-primary me-1" to={"/admin/menu/update/" + menu.id}>
                      <FaEdit/>Sửa
                </Link>
                <button onClick={()=>MenuDelete(menu.id)} className="btn btn-sm btn-danger">
                    <FaTrash/>Xóa
                </button>
            </div>
          </div>
        </div>
        <div className="card-body">
            <table className="table table-border">
                <thead>
                    <tr>
                        <th className="text-center" style={{ width:200 }}>Tên trường</th>
                        <th>Giá trị</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <th className="text-center">Id</th>
                      <td>{menu.id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tên menu</th>
                      <td>{menu.name}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Link</th>
                      <td>{menu.link}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mã cấp cha</th>
                      <td>{menu.parent_id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Loại</th>
                      <td>{menu.type}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Trạng thái</th>
                      <td>{menu.status}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default MenuShow;