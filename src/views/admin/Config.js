import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import ConfigServices from '../../services/ConfigServices';
import TinyMCE from 'components/tiny';
import { urlImage } from "config";

const Config = () => {
  const User = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zalo, setZalo] = useState("");
  const [facebook, setfacebook] = useState("");
  const [youtube, setyoutube] = useState("");
  const [metadesc, setmetadesc] = useState("");
  const [metakey, setmetakey] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState();
  const [logo, setLogo] = useState("");
  function UserEdit(event) {
    event.preventDefault();//không load lại trang
    var user = new FormData();
    user.append("author", User.id)
    user.append("email", email)
    user.append("phone", phone)
    user.append("zalo", zalo)
    user.append("facebook", facebook)
    user.append("youtube", youtube)
    user.append("metadesc", metadesc)
    user.append("metakey", metakey)
    user.append("address", address)
    user.append("status", status)
    user.append("logo", logo)
    ConfigServices.update(user)
      .then(function (result) {
        alert(result.message);
        navigator("/admin/user", { replace: true })
      });
  }
  useEffect(function () {
    (async function () {
      await ConfigServices.show()
        .then(function (result) {
          const tmp = result.config
          setEmail(tmp.email);
          setPhone(tmp.phone);
          setZalo(tmp.zalo);
          setfacebook(tmp.facebook);
          setmetadesc(tmp.metadesc);
          setmetakey(tmp.metakey);
          setStatus(tmp.status);
          setyoutube(tmp.youtube);
          setAddress(tmp.address);
          setLogo(tmp.logo);
        });
    })();
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };
console.log(logo)
  return (
    <form method="post" onSubmit={UserEdit}>
      <div className="card">
        <section className="content-header my-2">
          <div className="col-md-12 flex justify-between items-center">
            <strong className="text-3xl text-navy-700 dark:text-white">Cấu hình trang web</strong>
            <div className="flex space-x-2">
              <button type="submit" className="linear rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" name="THEM">
                <i className="fa fa-save" /> Lưu [Thêm]
              </button>
              {/* <Link className="linear rounded bg-brand-500 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" to={"/admin/product"}>
                  Về danh sách
                </Link> */}
            </div>
          </div>
        </section>
        <div className="card-body bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="bg-white p-5 rounded-xl">
                <div className="mb-3">
                  <label className="block">
                    <strong>Zalo</strong>
                  </label>
                  <input
                    value={zalo}
                    onChange={(e) => setZalo(e.target.value)}
                    type="text"
                    className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                  />
                </div>
                <div className="mb-3">
                  <label className="block">
                    <strong>Facebook</strong>
                  </label>
                  <input
                    value={facebook}
                    onChange={(e) => setfacebook(e.target.value)}
                    type="text"
                    className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                  />
                </div>
                <div className="mb-3">
                  <label className="block">
                    <strong>Youtube</strong>
                  </label>
                  <input
                    value={youtube}
                    onChange={(e) => setyoutube(e.target.value)}
                    type="text"
                    className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                  />
                </div>
                <div className="mb-3">
                  <label className="block">
                    <strong>Địa chỉ (*)</strong>
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                  />
                </div>
                <div className="mb-3">
                  <label className="block">
                    <strong>Mô tả (*)</strong>
                  </label>
                  <TinyMCE setValue={setmetadesc} placeholder={metadesc}/>
                  {/* <input
                    value={metadesc}
                    onChange={(e) => setmetadesc(e.target.value)}
                    type="text"
                    className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                  /> */}
                </div>

              </div>
            </div>
            <div>
              <div className="md:col-span-1 bg-white p-5 rounded-xl">
                <div className="mb-3">
                  <label className="block">
                    <strong>Số điện thoại (*)</strong>
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                  />
                </div>
                <div className="mb-3">
                  <label className="block">
                    <strong>Email (*)</strong>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                  />
                </div>
                <div className="mb-3">
                  <label className="block">
                    <strong>Từ khóa (*)</strong>
                  </label>
                  <input
                    value={metakey}
                    onChange={(e) => setmetakey(e.target.value)}
                    type="text"
                    className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                  />
                </div>
                <div className="mb-3">
                  <label className="block">
                    <strong>Trạng thái</strong>
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-2 block w-full h-12 px-3 border rounded-xl border-gray-300 text-sm outline-none"
                  >
                    <option value={1}>Online</option>
                    <option value={2}>Offline</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="block">
                    <strong>Logo</strong>
                  </label>
                  <div className="mt-1 relative ml-3 w-[200px] h-[200px] bg-white rounded-lg">
                      <input
                        id={`image`}
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleImageChange(e)}
                      />
                      <label htmlFor={`image`} className="flex justify-center items-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                        {logo ? (
                          <img
                            src={urlImage + "config/" + logo}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center bg-white rounded-lg">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-300"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="mt-2 block text-sm font-medium text-gray-600">Tải lên</span>
                          </div>
                        )}
                      </label>
                    </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

  );
}

export default Config;


