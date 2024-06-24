import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import UserServices from '../../../services/UserServices';

function CustomerUpdate() {
    const {id} = useParams();
    const navigator = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState(1);

    function UserEdit(event)
    {
        event.preventDefault();//không load lại trang
        const image = document.querySelector("#image");
        var user = new FormData();
        user.append("name", name)
        user.append("email", email)
        user.append("phone", phone)
        user.append("username", username)
        user.append("password", password)
        user.append("address", address)
        user.append("roles", 1)
        user.append("status", status)
        if(image.files.length === 0)
        {
            user.append("image", "")
        }
        else
        {
            user.append("image", image.files[0])
        }
        UserServices.update(user, id)
        .then(function(result) {
            alert(result.message);
            navigator("/admin/user", {replace:true})
        });
        
    }
    useEffect (function(){
        (async function(){
          await UserServices.getById(id)
          .then(function(result){
              const tmp = result.user
              setName(tmp.name);
              setEmail(tmp.email);
              setPhone(tmp.phone);
              setUsername(tmp.username);
              setPassword(tmp.password);
              setAddress(tmp.address);
              setStatus(tmp.status);
          });
        })();
    },[]);
    return (
    <form method='post' onSubmit={UserEdit}>
<div className="content">
  <section className="content-header my-2">
    <h1 className="d-inline">Cập nhật khách hàng</h1>
    <div className="row mt-2 align-items-center">
      <div className="col-md-12 text-right">
        <button className="btn btn-success btn-sm" name="THEM">
          <i className="fa fa-save" /> Lưu [Thêm]
        </button>
        <a href="user_index.html" className="btn btn-primary btn-sm">
          <i className="fa fa-arrow-left" /> Về danh sách
        </a>
      </div>
    </div>
  </section>
  <section className="content-body my-2">
    <form action="" method="post" encType="multipart/form-data">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label>
              <strong>Tên đăng nhập(*)</strong>
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Tên đăng nhập"
            />
          </div>
          <div className="mb-3">
            <label>
              <strong>Mật khẩu(*)</strong>
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Mật khẩu"
            />
          </div>
          <div className="mb-3">
            <label>
              <strong>Xác nhận mật khẩu(*)</strong>
            </label>
            <input
              type="password"
              name="re_password"
              className="form-control"
              placeholder="Xác nhận mật khẩu"
            />
          </div>
          <div className="mb-3">
            <label>
              <strong>Email(*)</strong>
            </label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <label>
              <strong>Xác nhận email(*)</strong>
            </label>
            <input
              type="text"
              name="re_email"
              className="form-control"
              placeholder="Xác nhận email"
            />
          </div>
          <div className="mb-3">
            <label>
              <strong>Điện thoại(*)</strong>
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Điện thoại"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label>
              <strong>Họ tên (*)</strong>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Họ tên"
            />
          </div>
          <div className="mb-3">
            <label>
              <strong>Giới tính</strong>
            </label>
            <select name="gender" id="gender" className="form-select">
              <option>Chọn giới tinh</option>
              <option value={1}>Nam</option>
              <option value={0}>Nữ</option>
            </select>
          </div>
          <div className="mb-3">
            <label>
              <strong>Địa chỉ</strong>
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Địa chỉ"
            />
          </div>
          <div className="mb-3">
            <label>
              <strong>Hình đại diện</strong>
            </label>
            <input type="file" name="image" className="form-control" />
          </div>
          <div className="mb-3">
            <label>
              <strong>Trạng thái</strong>
            </label>
            <select name="status" className="form-select">
              <option value={1}>Xuất bản</option>
              <option value={2}>Chưa xuất bản</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  </section>
</div>
    </form>
    );
}

export default CustomerUpdate;