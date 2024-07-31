import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import MenuServices from '../../../services/MenuServices';

function MenuUpdate() {
  const {id} = useParams();
  const [menus, setMenus] = useState([]);
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [parent_id, setParentId] = useState(0);
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState(1);

  function MenuEdit(event)
  {
      event.preventDefault();//không load lại trang
      var menu = new FormData();
      menu.append("name", name)
      menu.append("link", link)
      menu.append("parent_id", parent_id)
      menu.append("position", position)
      menu.append("status", status)
      MenuServices.update(menu, id)
      .then(function(result) {
          alert(result.message);
          navigator("/admin/menu", {replace:true})
      });
  }
  useEffect(function(){
    (async function(){
      await MenuServices.getAll()
      .then(function(result){
          setMenus(result.menusAll)
      });
    })();
  },[])
  useEffect (function(){
      (async function(){
        await MenuServices.getById(id)
        .then(function(result){
            const tmp = result.menu
            setName(tmp.name);
            setLink(tmp.link);
            setParentId(tmp.parent_id);
            setPosition(tmp.position);
            setStatus(tmp.status);
        });
      })();
  },[]);
  return (
<form method='post' onSubmit={MenuEdit}>
      <div className="content">
        <section className="content-header my-2">
          <h1 className="inline-block text-3xl text-navy-700 dark:text-white">Cập nhật menu</h1>
          <div className="mt-1 text-right">
            <Link className="linear mb-4 rounded bg-brand-500 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" to={"/admin/product"}>
              <i className="fa fa-arrow-left" /> Về danh sách
            </Link>
          </div>
        </section>
        <section className="content-body my-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <div className="bg-white p-5 rounded-xl">
                <div className="mb-3">
                  <label>
                    <strong>Tên menu (*)</strong>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    name="name"
                    className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                  />
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Liên kết (*)</strong>
                  </label>
                  <input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    type="text"
                    placeholder="Nhập liên kết"
                    name="link"
                    className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
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
                  <strong>Cấp cha</strong>
                </div>
                <div className="p-2 border-b">
                  <select
                    name="parent_id"
                    className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                    value={parent_id}
                    onChange={(e) => setParentId(e.target.value)}
                  >
                    <option value="">None</option>
                    {menus && menus.length > 0 && menus.map((menu, index) => (
                      <option key={index} value={menu.id}>{menu.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow">
                <div className="py-1 px-2 border-b rounded">
                  <strong>Vị trí</strong>
                </div>
                <div className="p-2 border-b">
                  <select value={position} className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none" onChange={(e)=>setPosition(e.target.value)}>
                    <option value="">Chọn vị trí</option>
                    <option value="mainmenu">mainmenu</option>
                    <option value='footermenu'>footermenu</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
    
  );
}

export default MenuUpdate;