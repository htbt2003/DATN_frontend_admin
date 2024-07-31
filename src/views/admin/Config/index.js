import { Link, useNavigate } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import { useState } from 'react';
import BrandServices from '../../../services/BrandServices';

function BrandCreate() {
    return (
<div className="">
  {/*CONTENT  */}
  <div className="content">
    <section className="content-header my-2">
      <h1 className="d-inline">Cấu hình website</h1>
    </section>
    <section className="content-body my-3">
      <form action="" method="post">
        <input type="hidden" name="id" defaultValue="" />
        <div className="mb-3">
          <label htmlFor="author">
            <strong>Tác giả(*)</strong>
          </label>
          <input
            type="text"
            name="author"
            defaultValue=""
            id="author"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Email(*)</strong>
          </label>
          <input
            type="text"
            name="email"
            defaultValue=""
            id="email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone">
            <strong>Điện thoại(*)</strong>
          </label>
          <input
            type="text"
            name="phone"
            defaultValue=""
            id="phone"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="zalo">
            <strong>Zalo(*)</strong>
          </label>
          <input
            type="text"
            name="zalo"
            defaultValue=""
            id="zalo"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="facebook">
            <strong>Facebook cá nhân(*)</strong>
          </label>
          <input
            type="text"
            name="facebook"
            defaultValue=""
            id="facebook"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address">
            <strong>Địa chỉ(*)</strong>
          </label>
          <input
            type="text"
            name="address"
            defaultValue=""
            id="address"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="youtube">
            <strong>Kênh Youtube(*)</strong>
          </label>
          <input
            type="text"
            name="youtube"
            defaultValue=""
            id="youtube"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="metadesc">
            <strong>Mô tả seo(*)</strong>
          </label>
          <textarea
            name="metadesc"
            id="metadesc"
            className="form-control"
            defaultValue={""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="metakey">
            <strong>Từ khoa seo(*)</strong>
          </label>
          <textarea
            name="metakey"
            id="metakey"
            className="form-control"
            defaultValue={""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status">
            <strong>Trạng thái</strong>
          </label>
          <select name="status" id="status" className="form-control">
            <option value={1}>Online</option>
            <option value={2}>Offline</option>
          </select>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success">
            <i className="fa fa-save" aria-hidden="true" /> Lưu cấu hình
          </button>
        </div>
      </form>
    </section>
  </div>
  {/*END CONTENT*/}
</div>
    );
}

export default BrandCreate;