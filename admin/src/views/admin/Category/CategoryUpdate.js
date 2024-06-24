import CategoryServices from "../../../services/CategoryServices"
import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import { useEffect, useState } from 'react';

function CategoryUpdate() {
    const [categories, setCategories] = useState([]);
    const {id} = useParams();
    const navigator = useNavigate();
    const [name, setName] = useState("");
    const [metakey, setMetakey] = useState("");
    const [metadesc, setMetadesc] = useState("");
    const [parent_id, setParentId] = useState(0);
    const [sort_order, setSortOrder] = useState(0);
    const [status, setStatus] = useState(1);

    function CategoryEdit(event)
    {
        event.preventDefault();//không load lại trang
        const image = document.querySelector("#image");
        var category = new FormData();
        category.append("name", name)
        category.append("metakey", metakey)
        category.append("metadesc", metadesc)
        category.append("parent_id", parent_id)
        category.append("sort_order", sort_order)
        category.append("status", status)
        if(image.files.length === 0)
        {
            category.append("image", "")
        }
        else
        {
            category.append("image", image.files[0])
        }
        (async function () {
          const result = await CategoryServices.update(category, id)
          alert(result.message);
          navigator("/admin/category", { replace: true })
        })();
    }
    useEffect (function(){
          (async function(){
            await CategoryServices.getAll()
            .then(function(result){
                setCategories(result.categoriesAll)
            });
          })();
    },[]);
    useEffect (function(){
        (async function(){
          await CategoryServices.getById(id)
          .then(function(result){
              const tmp = result.category
              setName(tmp.name);
              setMetakey(tmp.metakey);
              setMetadesc(tmp.metadesc);
              setParentId(tmp.parent_id);
              setSortOrder(tmp.sort_order);
              setStatus(tmp.status);
          });
        })();
    },[]);
    
    return (
    <form method='post' onSubmit={CategoryEdit}>
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">Cập nhật danh mục</h1>
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
                  <strong>Tên danh mục (*)</strong>
                </label>
                <input
                  value={name} onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nhập tên danh mục"
                  className="form-control"
                  required=""
                />
              </div>
              <div className='mb-3'>
                <label>
                  <strong>Từ khóa(*)</strong>
                </label>
                <textarea placeholder="Nhập từ khoá" value={metakey} onChange={(e) => setMetakey(e.target.value)} className='form-control'></textarea>
              </div>
              <div className='mb-3'>
                <label>
                  <strong>Mô tả(*)</strong>
                </label>
                <textarea placeholder="Nhập mô tả" value={metadesc} onChange={(e) => setMetadesc(e.target.value)} className='form-control'></textarea>
              </div>

            </div>
            <div className="col-md-3">
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Đăng</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <select name="status" className="form-select" value={status} onChange={(e)=> setStatus(e.target.value)}>
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
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Danh mục cha (*)</strong>
                </div>
                <div className="box-body p-2">
                  <select name="parent_id" className="form-control"  value={parent_id} onChange={(e)=> setParentId(e.target.value)}>
                    <option value={0}>None</option>
                    {categories.map(function(cat, index){
                                    return <option key={index} value={cat.id}>{cat.name}</option>
                                })}
                  </select>
                </div>
              </div>
              <div className="box-container mt-4 bg-white">
        <div className="box-header py-1 px-2 border-bottom">
          <strong>Sắp xếp</strong>
        </div>
        <div className="box-body p-2">
          <select name="sort_order" className="form-control" value={sort_order} onChange={(e)=> setSortOrder(e.target.value)}>
            <option value="">Sau</option>
            <option value={2}>sau</option>
          </select>
        </div>
      </div>
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Hình (*)</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <input id="image" type="file" name="image" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
    );
}

export default CategoryUpdate;