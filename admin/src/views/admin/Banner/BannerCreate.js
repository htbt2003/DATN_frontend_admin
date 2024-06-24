import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BannerServices from '../../../services/BannerServices';

function BannerCreate() {
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  // const [link, setLink] = useState("");
  const [status, setStatus] = useState(1);

  function BannerStore(event) {
    event.preventDefault();//không load lại trang
    const image = document.querySelector("#image");
    var banner = new FormData();
    banner.append("name", name)
    banner.append("description", description)
    banner.append("position", position)
    // banner.append("link", link)
    banner.append("status", status)
    banner.append("image", image.files[0])
    BannerServices.create(banner)
      .then(function (result) {
        alert(result.message);
        navigator("/admin/banner", { replace: true })
      });

  }
  return (
    <form method='post' onSubmit={BannerStore}>
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">Thêm banner</h1>
          <div className="mt-1 text-right">
            <Link className="btn btn-sm btn-primary" href="product_index.html">
              <i className="fa fa-arrow-left" /> Về danh sách
            </Link>
          </div>
        </section>
        <section className="content-body my-2">
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label>
                  <strong>Tên banner (*)</strong>
                </label>
                <input
                  value={name} onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Nhập tên banner"
                />
              </div>
              {/* <div className="mb-3">
                <label>
                  <strong>Liên kết</strong>
                </label>
                <input
                  value={link} onChange={(e) => setLink(e.target.value)}
                  type="text"
                  name="link"
                  className="form-control"
                  placeholder="Nhập liên kết"
                />
              </div> */}
              <div className="mb-3">
                <label>
                  <strong>Mô tả (*)</strong>
                </label>
                <textarea
                value={description} onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  rows={5}
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
                  <p>Chọn trạng thái đăng</p>
                  <select name="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value={1}>Xuất bản</option>
                    <option value={2}>Chưa xuất bản</option>
                  </select>
                </div>
                <div className="box-footer text-end px-2 py-3">
                  <button type="submit" className="btn btn-success btn-sm text-end">
                    <i className="fa fa-save" aria-hidden="true" /> Đăng
                  </button>
                </div>
              </div>
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Vị trí (*)</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <select name="position" className="form-select" value={position} onChange={(e) => setPosition(e.target.value)}>
                    <option>Chọn vị trí</option>
                    <option value="slideshow">Slide Show</option>
                    <option value="advertisement">Quảng cáo</option>
                  </select>
                  <p className="pt-2">Vị trí hiển thị banner</p>
                </div>
              </div>
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Hình (*)</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <input type="file" id="image" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}

export default BannerCreate;
