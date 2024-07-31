import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MenuServices from '../../../services/MenuServices';

function MenuCreateTuy(prop) {
    const navigator = useNavigate();
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function MenuStore(event) {
      event.preventDefault();//không load lại trang
      const menu = new FormData();
      menu.append("name", name)
      menu.append("link", link)
      menu.append("position", prop.position)
      menu.append("type", 'tuy-bien')
      MenuServices.tao(menu)
      .then(function(result) {
          alert(result.message);
          navigator("/admin/menu", {replace:true})
      });
}
    
    return (
        <form method='POST' onSubmit={MenuStore} >
                        <div className="bg-white p-5 rounded">
                <div>
                <div className="mb-3">
              <label>
                <strong>Tên (*)</strong>
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
                <strong>Liên kết (*)</strong>
              </label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                type="text"
                name="name"
                className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                placeholder="Nhập tên banner"
              />
            </div>

                </div>
                <hr className='my-3'></hr>
                <div className="text-center px-2 py-2">
                    <button type="submit" className="linear rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                        <i className="fa fa-save" aria-hidden="true" /> Tạo meu
                    </button>
                </div>
            </div>
        </form>
);
}

export default MenuCreateTuy;