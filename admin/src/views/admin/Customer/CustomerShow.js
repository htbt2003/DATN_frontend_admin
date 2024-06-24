import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomerServices from "../../../services/CustomerServices"

function CustomerShow() {
    const navigator = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState([])
    useEffect (function(){
          (async function(){
            await CustomerServices.getById(id)
            .then(function(result){
                setUser(result.user)
            });
          })();
    },[]);
    async function UserDelete(id)
    {
      await CustomerServices.remove(id)
            .then(function(result){
                alert(result.message)
                navigator("/admin/user", {replace:true})
            });
    }
    return (
        <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="text-danger text-uppercase">
                Chi tiết khách hàng
              </strong>
            </div>
            <div className="col-6 text-end">
                <Link to="/admin/user" className="btn btn-info btn-sm me-2">
                    <FaPlus/> Về danh sách
                </Link>
                <Link className="btn btn-sm btn-primary me-1" to={"/admin/user/update/" + user.id}>
                      <FaEdit/>Sửa
                </Link>
                <button onClick={()=>UserDelete(user.id)} className="btn btn-sm btn-danger">
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
                      <td>{user.id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tên người dùng</th>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Email</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Điện thoại</th>
                      <td>{user.phone}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Username</th>
                      <td>{user.username}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mật khẩu</th>
                      <td>{user.password}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Địa chỉ</th>
                      <td>{user.address}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Vai trò</th>
                      <td>{user.roles}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày tạo</th>
                      <td>{user.created_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày cập nhật</th>
                      <td>{user.updated_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tình trạng</th>
                      <td>{user.status}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default CustomerShow;