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
    <form method='post' onSubmit={BrandEdit}>
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">Cập nhật thương hiệu</h1>
          <div className="mt-1 text-right">
            <a className="btn btn-sm btn-primary" href="product_index.html">
              <i className="fa fa-arrow-left" /> Về danh sách
            </a>
          </div>
        </section>
        <section className="content-body my-2">
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label>
                  <strong>Tên thương hiệu (*)</strong>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Từ khóa(*)</strong>
                </label>
                <input
                  value={metakey}
                  onChange={(e) => setMetakey(e.target.value)}
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  name="name"
                  className="form-control"
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
                  className="form-control"
                  placeholder="Nhập mô tả"
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Đăng</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <select name="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value={1}>Xuất bản</option>
                    <option value={2}>Chưa xuất bản</option>
                  </select>
                </div>
                <div className="box-footer text-end px-2 py-2 text-right">
                  <button type="submit" className="btn btn-success btn-sm">
                    <i className="fa fa-save" aria-hidden="true" /> Đăng
                  </button>
                </div>
              </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Sắp xếp</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <select name="category_id" className="form-select" value={sort_order} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="">Chọn danh mục</option>
                    <option value={1}>Tên danh mục</option>
                  </select>
                </div>
              </div>

              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Hình đại diện(*)</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <input id="image" type="file" name="image" className="form-control" />
                </div>
              </div>
              {/* <div className="box-container mt-2 bg-white">
          <div className="box-header py-1 px-2 border-bottom">
            <strong>Thứ tự</strong>
          </div>
          <div className="box-body p-2 border-bottom">
            <select name="category_id" className="form-select">
              <option value="">Chọn danh mục</option>
              <option value={1}>Tên danh mục</option>
            </select>
          </div>
        </div> */}

            </div>
          </div>
        </section>
      </div>
    </form>
  );
}

export default BrandUpdate;