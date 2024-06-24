import OrderServices from "../../../services/OrderServices"
import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import UserServices from "../../../services/UserServices"

function OrderUpdate() {
    const [users, setUsers] = useState([]);
    const {id} = useParams();
    const navigator = useNavigate();
    const [user_id, setUserId] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [status, setStatus] = useState(1);

    function OrderEdit(event)
    {
        event.preventDefault();//không load lại trang
        var order = new FormData();
        order.append("user_id", user_id)
        order.append("name", name)
        order.append("email", email)
        order.append("phone", phone)
        order.append("address", address)
        order.append("note", note)
        order.append("status", status)
        OrderServices.update(order, id)
        .then(function(result) {
            alert(result.data.message);
            navigator("/admin/order", {replace:true})
        });
    }
    useEffect(function(){
        (async function(){
          await UserServices.getAll()
          .then(function(result){
              setUsers(result.data.users)
          });
        })();
      },[])
    useEffect (function(){
        (async function(){
          await OrderServices.getById(id)
          .then(function(result){
              const tmp = result.data.order
              setUserId(tmp.user_id);
              setName(tmp.name);
              setEmail(tmp.email);
              setPhone(tmp.phone);
              setAddress(tmp.address);
              setNote(tmp.note);
              setStatus(tmp.status);
          });
        })();
    },[]);
    return (
    <form method='post' onSubmit={OrderEdit}>
        <div className="card">
            <div className="card-header">
            <div className="row">
                <div className="col-6">
                <strong className="text-danger text-uppercase">
                    Cập nhật liên hệ
                </strong>
                </div>
                <div className="col-6 text-end">
                <Link to="/admin/order" className="btn btn-info btn-sm me-2">
                    <FaPlus/> Về danh sách
                </Link>
                <button type='submit' className='btn btn-success btn-sm'>Lưu</button>
                </div>
            </div>
            </div>
            <div className="card-body">
                <div className='row'>
                    <div className='col-md-9'>
                        <div className='mb-3'>
                            <label>
                                <strong>Tên hóa đơn(*)</strong>
                            </label>
                            <input value={name} onChange={(e)=> setName(e.target.value)} className='form-control' type='text'/>
                        </div>
                        <div className='mb-3'>
                            <label>
                                <strong>Email(*)</strong>
                            </label>
                            <input  value={email} onChange={(e)=> setEmail(e.target.value)}  className='form-control' type='text'/>
                        </div>
                        
                        <div className='mb-3'>
                            <label>
                                <strong>Địa chỉ(*)</strong>
                            </label>
                            <input  value={address} onChange={(e)=> setAddress(e.target.value)}  className='form-control' type='text'/>
                        </div>
                        <div className='mb-3'>
                            <label>
                                <strong>Ghi chú</strong>
                            </label>
                            <textarea  value={note} onChange={(e)=> setNote(e.target.value)}  className='form-control'></textarea>
                        </div>
                    </div>
                    <div className='col-md-3'>
                    <div className='mb-3'>
                            <label>
                                <strong>Mã người dùng(*)</strong>
                            </label>
                            <select  value={user_id} onChange={(e)=> setUserId(e.target.value)} className='form-control'>
                                {users.map(function(user, index){
                                    return <option key={index} value={user.id}>{user.name}</option>
                                })}
                            </select> 
                    </div>
                        <div className='mb-3'>
                            <label>
                                <strong>Điện thoại(*)</strong>
                            </label>
                            <input  value={phone} onChange={(e)=> setPhone(e.target.value)}  className='form-control' type='text'/>
                        </div>
                        <div className='mb-3'>
                            <label>
                                <strong>Trạng thái</strong>
                            </label>
                            <select  value={status} onChange={(e)=> setStatus(e.target.value)} className='form-control'>
                                <option value="1">Xuất bản</option>
                                <option value="2">Chưa xuất bản</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    );
}

export default OrderUpdate;