import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import BrandServices from '../../../services/BrandServices';

function BrandUpdate() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [metakey, setMetakey] = useState("");
  const [metadesc, setMetadesc] = useState("");
  const [sort_order, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);

  function BrandEdit(event) {
    event.preventDefault();//không load lại trang
    const image = document.querySelector("#image");
    var brand = new FormData();
    brand.append("name", name)
    brand.append("metakey", metakey)
    brand.append("metadesc", metadesc)
    brand.append("sort_order", sort_order)
    brand.append("status", status)
    if (image.files.length === 0) {
      brand.append("image", "")
    }
    else {
      brand.append("image", image.files[0])
    }
    BrandServices.update(brand, id)
      .then(function (result) {
        alert(result.message);
        navigator("/admin/brand", { replace: true })
      });
  }
  useEffect(function () {
    (async function () {
      const result = await BrandServices.getById(id)
      const tmp = result.brand
      setName(tmp.name);
      setMetakey(tmp.metakey);
      setMetadesc(tmp.metadesc);
      setSortOrder(tmp.sort_order);
      setStatus(tmp.status);
      setImg(tmp.image);
    })();
  }, []);
  return (
<form method="post" onSubmit={BrandEdit}>
  <div className="content">
    <section className="content-header my-2">
      <strong className="inline-block text-3xl text-navy-700 dark:text-white">Cập nhật thương hiệu</strong>
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
                <strong>Tên thương hiệu (*)</strong>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Nhập tên sản phẩm"
                className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
              />
            </div>
            <div className="mb-3">
              <label>
                <strong>Từ khóa (*)</strong>
              </label>
              <input
                value={metakey}
                onChange={(e) => setMetakey(e.target.value)}
                type="text"
                placeholder="Nhập tên sản phẩm"
                name="name"
                className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
              />
            </div>
            <div className="mb-3">
              <label>
                <strong>Mô tả (*)</strong>
              </label>
              <textarea
                value={metadesc}
                onChange={(e) => setMetadesc(e.target.value)}
                name="description"
                rows={3}
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
              <strong>Sắp xếp</strong>
            </div>
            <div className="p-2 border-b">
              <select
                name="category_id"
                className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                value={sort_order}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Chọn danh mục</option>
                <option value={1}>Tên danh mục</option>
              </select>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="py-1 px-2 border-b rounded">
              <strong>Hình đại diện (*)</strong>
            </div>
            <div className="p-2 border-b">
              <input type="file" id="image" name="image" className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</form>
  );
}

export default BrandUpdate;