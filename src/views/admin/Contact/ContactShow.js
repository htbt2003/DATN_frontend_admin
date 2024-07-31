import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContactServices from "../../../services/ContactServices"

function ContactShow() {
    const navigator = useNavigate();
    const {id} = useParams();
    const [contact, setContact] = useState([])
    useEffect (function(){
          (async function(){
            await ContactServices.getById(id)
            .then(function(result){
                setContact(result.contact)
            });
          })();
    },[]);
    async function ContactDelete(id)
    {
      await ContactServices.remove(id)
            .then(function(result){
                alert(result.message)
                navigator("/admin/contact", {replace:true})
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
                <Link to="/admin/contact" className="btn btn-info btn-sm me-2">
                    <FaPlus/> Về danh sách
                </Link>
                <Link className="btn btn-sm btn-primary me-1" to={"/admin/contact/update/" + contact.id}>
                      <FaEdit/>Sửa
                </Link>
                <button onClick={()=>ContactDelete(contact.id)} className="btn btn-sm btn-danger">
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
                      <td>{contact.id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Replay Id</th>
                      <td>{contact.replay_id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mã người dùng</th>
                      <td>{contact.user_id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tên danh mục</th>
                      <td>{contact.name}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Email</th>
                      <td>{contact.email}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Điện thoại</th>
                      <td>{contact.phone}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tiêu đề</th>
                      <td>{contact.title}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Nội dung</th>
                      <td>{contact.content}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày tạo</th>
                      <td>{contact.created_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày cập nhật</th>
                      <td>{contact.update_at}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default ContactShow;