import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import BannerServices from '../../../services/BannerServices';

function BannerUpdate() {
    const { id } = useParams();
    const navigator = useNavigate();
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    // const [link, setLink] = useState("");
    const [status, setStatus] = useState(1);

    function BannerEdit(event) {
        event.preventDefault();//không load lại trang
        const image = document.querySelector("#image");
        var banner = new FormData();
        banner.append("name", name)
        banner.append("position", position)
        // banner.append("link", link)
        banner.append("description", description)
        banner.append("status", status)
        banner.append("image", image.files[0])
        BannerServices.update(banner, id)
            .then(function (result) {
                alert(result.message);
                navigator("/admin/banner", { replace: true })
            });
    }
    useEffect(function () {
        (async function () {
            await BannerServices.getById(id)
                .then(function (result) {
                    const tmp = result.banner
                    setName(tmp.name);
                    setPosition(tmp.position);
                    setDescription(tmp.description);
                    // setLink(tmp.link);
                    setStatus(tmp.status);
                });
        })();
    }, []);
    return (
<form method="post" onSubmit={BannerEdit}>
  <div className="content">
    <section className="content-header my-2">
      <h1 className="inline-block text-3xl text-navy-700 dark:text-white">Thêm banner</h1>
      <div className="mt-1 text-right">
      <Link className="linear mb-4 rounded bg-brand-500 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" to={"/admin/product"}>
                Về danh sách
              </Link>
      </div>
    </section>
    <section className="content-body my-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="bg-white p-5 rounded-xl">
            <div className="mb-3">
              <label>
                <strong>Tên banner (*)</strong>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                placeholder="Nhập tên banner"
              />
            </div>
            <div className="mb-3">
              <label>
                <strong>Mô tả (*)</strong>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                rows={5}
                className="form-textarea mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                placeholder="Nhập mô tả"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="py-1 px-2 border-b rounded">
              <strong>Đăng</strong>
            </div>
            <div className="p-2 border-b">
              <p>Chọn trạng thái đăng</p>
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
                <i className="fa fa-save" aria-hidden="true" /> Đăng
              </button>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="py-1 px-2 border-b rounded">
              <strong>Vị trí (*)</strong>
            </div>
            <div className="p-2 border-b">
              <select
                name="position"
                className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option>Chọn vị trí</option>
                <option value="slideshow">Slide Show</option>
                <option value="advertisement">Quảng cáo</option>
              </select>
              <p className="pt-2">Vị trí hiển thị banner</p>
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

export default BannerUpdate;
