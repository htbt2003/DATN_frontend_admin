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
<form method="post" onSubmit={CategoryEdit}>
  <div className="content">
    <section className="content-header my-2">
    <strong className="inline-block text-3xl text-navy-700 dark:text-white">Thêm danh mục</strong>
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
              <label><strong>Tên danh mục (*)</strong></label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                placeholder="Nhập tên danh mục"
                className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                required
              />
            </div>
            <div className="mb-3">
              <label><strong>Từ khóa (*)</strong></label>
              <textarea
                placeholder="Nhập từ khóa"
                value={metakey}
                onChange={(e) => setMetakey(e.target.value)}
                className="form-textarea mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
              ></textarea>
            </div>
            <div className="mb-3">
              <label><strong>Mô tả (*)</strong></label>
              <textarea
                placeholder="Nhập mô tả"
                value={metadesc}
                onChange={(e) => setMetadesc(e.target.value)}
                className="form-textarea mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="py-1 px-2 border-b rounded"><strong>Đăng</strong></div>
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
            <div className="py-1 px-2 border-b rounded"><strong>Danh mục cha (*)</strong></div>
            <div className="p-2 border-b">
              <select
                name="parent_id"
                className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                value={parent_id}
                onChange={(e) => setParentId(e.target.value)}
              >
                <option value={0}>None</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="py-1 px-2 border-b rounded"><strong>Sắp xếp</strong></div>
            <div className="p-2 border-b">
              <select
                name="sort_order"
                className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                value={sort_order}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Sau</option>
                <option value={2}>sau</option>
              </select>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="py-1 px-2 border-b rounded"><strong>Hình (*)</strong></div>
            <div className="p-2 border-b">
              <input id="image" type="file" name="image" className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none" />
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