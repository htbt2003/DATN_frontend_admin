// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import MenuServices from '../../../services/MenuServices';

// function RowMenu(prop) {
//     async function MenuDelete(id) {
//         await MenuServices.remove(id)
//           .then(function (result) {
//             alert(result.message)
//             setReLoad(id)
//           });
//       }
    
//     return (
//         <tr className="datarow" key ={index}>
//         <td className="" style={{ width: 26 }}>
//           <input style={{ width: 16 }} type="checkbox" id="checkboxID" />
//         </td>
//         <td>
//           <div className='row'>
//             <div className='col-7 pt-2'>{menu.name}</div>
//             <div className="col-2 function_style">
//               <button onClick={() => handleStatus(menu.id)} className={menu.status === 1 ? "btn btn-success btn-sm" : "btn btn-danger btn-sm"}>
//                 <i className={menu.status === 1 ? "fa fa-toggle-on" : "fa fa-toggle-off"} />
//               </button>
//               <Link to={"/admin/menu/update/" + menu.id} className="btn btn-primary btn-sm">
//                 <i className="fa fa-edit" />
//               </Link>
//               <Link to={"/admin/menu/show/" + menu.id} className="btn btn-info btn-sm">
//                 <i className="fa fa-eye" />
//               </Link>
//               <Link href="#" className="btn btn-danger btn-sm" onClick={() => MenuDelete(menu.id)}>
//                 <i className="fa fa-trash" />
//               </Link>
//             </div>
//           </div>
//         </td>
//         <td> {menu.link} </td>
//         <td> {menu.position} </td>
//         <td> {menu.id} </td>
//       </tr>

                    {/* {menus && menus.length > 0 && menus.map(function (menu, index) {
                      return (
                        <tr className="datarow" key={index}>
                          <td className="" style={{ width: 26 }}>
                            <input style={{ width: 16 }} type="checkbox" id="checkboxID" />
                          </td>
                          <td>
                            <div className='row'>
                              <div className='col-7 pt-2'>{menu.name}</div>
                              <div className="col- 2 function_style">
                                <button onClick={() => handleStatus(menu.id)} className={menu.status === 1 ? "btn btn-success btn-sm" : "btn btn-danger btn-sm"}>
                                      <i className={menu.status === 1 ? "fa fa-toggle-on" : "fa fa-toggle-off"} />
                                </button>
                                <Link to={"/admin/menu/update/"+ menu.id} className="btn btn-primary btn-sm">
                                  <i className="fa fa-edit" />
                                </Link>
                                <Link to={"/admin/menu/show/" + menu.id} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link href="#" className="btn btn-danger btn-sm" onClick={()=>MenuDelete(menu.id)}>
                                  <i className="fa fa-trash" />
                                </Link>
                              </div>

                            </div>
                          </td>
                          <td> {menu.link} </td>
                          <td> {menu.position} </td>
                          <td> {menu.id} </td>
                        </tr>
                      );
                    })} */}

// );
// }

// export default RowMenu;
const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(menus.map(li => li.id));
    if (!isCheckAll) {
      setIsCheck([]);
    }
  };
  const handleSelectOne = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };
  <input id={menu.id} isChecked={isCheck.includes(menu.id)} onClick={(e) => handleSelectOne(e)} style={{ width: 16 }} type="checkbox" id="checkboxID" />
  <th><div style={{ width: 26 }}><input isChecked={isCheckAll} onChange={(e) => handleSelectAll(e)} style={{ width: 16 }} type="checkbox" id="checkboxAll" /></div> </th>

  const [menus, setMenus] = useState([]);
  useEffect(function () {
    (async function () {
      try {
        const result = await MenuServices.getAll();
        setMenus(result.menus)
      }
      catch (error) {
        console.log(error)
      }
    })();
  }, [])
