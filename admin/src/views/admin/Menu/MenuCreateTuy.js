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
      MenuServices.create(menu)
      .then(function(result) {
          alert(result.message);
          navigator("/admin/menu", {replace:true})
      });
}
    
    return (
        <form method='POST' onSubmit={MenuStore} >
        <li className="list-group-item mb-2 border nav-item">
            <a
                className="nav-link menu-expanded"
                href="#multiCollapseLink"
                data-toggle="collapse"
            //aria-expanded="false"
            >
               Tùy biến liên kết
            </a>
            <div
                className="multi-collapse border-top mt-2 collapse"
                id="multiCollapseLink"
            >
                <div className="mb-3">
                    <label>Tên menu</label>
                    <input value={name} onChange={(e)=> setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label>Liên kết</label>
                    <input value={link} onChange={(e)=> setLink(e.target.value)} type="text" className="form-control" />
                </div>

                <div className="my-3">
                    <button
                        type="submit"
                        className="btn btn-sm btn-success form-control"
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </li>
        </form>
);
}

export default MenuCreateTuy;