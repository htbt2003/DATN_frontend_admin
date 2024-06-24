import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuServices from '../../../services/MenuServices';
import MenuCategoryCreate from './MenuCategoryCreate';
import MenuBrandCreate from './MenuBrandCreate';
import MenuTopicCreate from './MenuTopicCreate';
import MenuPageCreate from './MenuPageCreate';
import MenuCreateTuy from './MenuCreateTuy';

function MenuCreate() {
//     const navigator = useNavigate();
//     const [name, setName] = useState("");
//     const [link, setLink] = useState("");
    const [position, setPosition] = useState("");

//     function MenuStore(event) {
//       event.preventDefault();//không load lại trang
//       const menu = new FormData();
//       menu.append("name", name)
//       menu.append("link", link)
//       menu.append("position", position)
//       menu.append("type", 'tuy-bien')
//       MenuServices.create(menu)
//       .then(function(result) {
//           alert(result.message);
//           navigator("/admin/menu", {replace:true})
//       });
// }
    
    return (
            <div>
                <div className="">
                    <ul className="list-group">
                        <li className="list-group-item mb-2">
                            <select name="postion" className="form-control" value={position} onChange={(e)=> setPosition(e.target.value)}>
                                <option>Chọn vị trí đặt menu</option>
                                <option value="mainmenu">Main Menu</option>
                                <option value="footermenu">Footer Menu</option>
                            </select>
                        </li>
                        <MenuCategoryCreate position={position}/>
                        <MenuBrandCreate position={position}/>
                        <MenuTopicCreate position={position}/>
                        <MenuPageCreate position={position}/>
                        <MenuCreateTuy position={position}/>
                    </ul>
                </div>
            </div>
    );
}

export default MenuCreate;