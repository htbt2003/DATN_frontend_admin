import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomerServices from '../../../services/CustomerServices';

function CustomerCreate() {
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(1);
  const [gender, setGender] = useState(1);

  function UserStore(event) {
    event.preventDefault();//không load lại trang
    const image = document.querySelector("#image");
    var user = new FormData();
    user.append("name", name)
    user.append("email", email)
    user.append("phone", phone)
    user.append("address", address)
    user.append("roles", 'customer')
    user.append("gender", gender)
    if (image.files.length === 0) {
      user.append("image", "")
    }
    else {
      user.append("image", image.files[0])
    }
    CustomerServices.create(user)
      .then(function (result) {
        alert(result.message);
        navigator("/admin/customer", { replace: true })
      });
  }
  return (
    <form method="post" onSubmit={UserStore}>
      <div className="content">
        <section className="content-header my-2">
          <strong className="inline-block text-3xl text-navy-700 dark:text-white">Thêm khách hàng</strong>
          <div className="row mt-2 align-items-center">
            <div className="col-md-12 text-right">
              <button type="submit" className="linear mb-4 rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" name="THEM">
                <i className="fa fa-save" /> Lưu [Thêm]
              </button>
              <Link className="linear ml-2 mb-4 rounded bg-brand-500 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" to={"/admin/product"}>
                Về danh sách
              </Link>
            </div>
          </div>
        </section>
        <section className="content-body my-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <div className="bg-white p-5 rounded-xl">
                <div className="mb-3">
                  <label><strong>Họ tên (*)</strong></label>
                  <input
                    value={name} onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    placeholder="Họ tên"
                  />
                </div>
                <div className="mb-3">
                  <label><strong>Địa chỉ</strong></label>
                  <input
                    value={address} onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    name="address"
                    className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    placeholder="Địa chỉ"
                  />
                </div>
                <div className="mb-3">
                  <label><strong>Email (*)</strong></label>
                  <input
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    name="email"
                    className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <label><strong>Điện thoại (*)</strong></label>
                  <input
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    name="phone"
                    className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    placeholder="Điện thoại"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {/* <div className="bg-white shadow p-4 rounded">
                <div className="py-1 px-2 border-b rounded">
                  <strong>Đăng</strong>
                </div>
                <div className="p-2 border-b">
                  <select
                    name="status"
                    className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={1}>Xuất bản</option>
                    <option value={2}>Chưa xuất bản</option>
                  </select>
                </div>
                <div className="text-right px-2 py-2">
                  <button type="submit" className="linear rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    Đăng
                  </button>
                </div>
              </div> */}
              <div className="bg-white shadow p-4 rounded">
                <div className="py-1 px-2 border-b">
                  <strong>Giới tính</strong>
                </div>
                <div className="p-2">
                  <select
                    name="category_id"
                    className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>Chọn giới tính</option>
                    <option value={1}>Nam</option>
                    <option value={0}>Nữ</option>
                  </select>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow">
                <div className="py-1 px-2 border-b rounded">
                  <strong>Hình (*)</strong>
                </div>
                <div className="p-2 border-b">
                  <input type="file" id="image" className="form-input mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}

export default CustomerCreate;