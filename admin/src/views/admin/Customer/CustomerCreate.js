import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomerServices from '../../../services/CustomerServices';

function CustomerCreate() {
    const navigator = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [roles, setRoles] = useState("customer");
    const [status, setStatus] = useState(1);
    const [gender, setGender] = useState(1);

    function UserStore(event)
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
        user.append("roles", roles)
        user.append("status", status)
        user.append("gender", gender)
        if(image.files.length === 0)
        {
            user.append("image", "")
        }
        else
        {
            user.append("image", image.files[0])
        }
        CustomerServices.create(user)
        .then(function(result) {
            alert(result.message);
            navigator("/admin/customer", {replace:true})
        });
    }
    return (
    <form method='post' onSubmit={UserStore}>
<div className="content">
  <section className="content-header my-2">
    <h1 className="d-inline">Thêm khách hàng</h1>
    <div className="row mt-2 align-items-center">
      <div className="col-md-12 text-right">
        <button className="btn btn-success btn-sm" name="THEM">
          <i className="fa fa-save" /> Lưu [Thêm]
        </button>
        <Link  className="btn btn-primary btn-sm">
          <i className="fa fa-arrow-left" /> Về danh sách
        </Link>
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
              value={username} onChange={(e)=> setUsername(e.target.value)}
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
            value={password} onChange={(e)=> setPassword(e.target.value)}
              type="password"
              name="password"
              className="form-control"
              placeholder="Mật khẩu"
            />
          </div>
          {/* <div className="mb-3">
            <label>
              <strong>Xác nhận mật khẩu(*)</strong>
            </label>
            <input
              type="password"
              name="re_password"
              className="form-control"
              placeholder="Xác nhận mật khẩu"
            />
          </div> */}
          <div className="mb-3">
            <label>
              <strong>Email(*)</strong>
            </label>
            <input
            value={email} onChange={(e)=> setEmail(e.target.value)}
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
          {/* <div className="mb-3">
            <label>
              <strong>Xác nhận email(*)</strong>
            </label>
            <input
              type="text"
              name="re_email"
              className="form-control"
              placeholder="Xác nhận email"
            />
          </div> */}
          <div className="mb-3">
            <label>
              <strong>Điện thoại(*)</strong>
            </label>
            <input
            value={phone} onChange={(e)=> setPhone(e.target.value)}
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
            value={name} onChange={(e)=> setName(e.target.value)}
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
            <select name="gender" id="gender" className="form-select" value={gender} onChange={(e)=> setGender(e.target.value)}>
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
              value={address} onChange={(e)=> setAddress(e.target.value)}
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
            <input type="file" id="image" className="form-control" />
          </div>
          <div className="mb-3">
            <label>
              <strong>Trạng thái</strong>
            </label>
            <select name="status" className="form-select" value={status} onChange={(e)=> setStatus(e.target.value)}>
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

export default CustomerCreate;