import ContactServices from "../../../services/ContactServices"
import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import UserServices from "../../../services/UserServices"

function ContactResponse() {
    const [users, setUsers] = useState([]);
    const {id} = useParams();
    const navigator = useNavigate();
    const [user_id, setUserId] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState(1);

    function ContactStore(event)
    {
        event.preventDefault();//không load lại trang
        var contact = new FormData();
        contact.append("user_id", user_id)
        contact.append("name", name)
        contact.append("email", email)
        contact.append("phone", phone)
        contact.append("title", title)
        contact.append("content", content)
        contact.append("replay_id", id)
        contact.append("status", status)
        ContactServices.create(contact)
        .then(function(result) {
            alert(result.data.message);
            navigator("/admin/contact", {replace:true})
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
    return (
    <form method='post' onSubmit={ContactStore}>
        <div className="card">
            <div className="card-header">
            <div className="row">
                <div className="col-6">
                <strong className="text-danger text-uppercase">
                    Trả lời liên hệ
                </strong>
                </div>
                <div className="col-6 text-end">
                <Link to="/admin/contact" className="btn btn-info btn-sm me-2">
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
                                <strong>Tên liên hệ(*)</strong>
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
                                <strong>Chủ đề(*)</strong>
                            </label>
                            <input  value={title} onChange={(e)=> setTitle(e.target.value)}  className='form-control' type='text'/>
                        </div>
                        <div className='mb-3'>
                            <label>
                                <strong>Nội dung(*)</strong>
                            </label>
                            <textarea  value={content} onChange={(e)=> setContent(e.target.value)}  className='form-control'></textarea>
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

export default ContactResponse;