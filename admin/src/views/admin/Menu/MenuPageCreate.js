import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuServices from '../../../services/MenuServices';
import PageServices from '../../../services/PageServices';

function MenuPageCreate(prop) {
  const [pages, setPages] = useState([]);
  const navigator = useNavigate();
  const [selectedPages, setSelectedPages] = useState([]);

  useEffect(function () {
    (async function () {
      const result = await PageServices.getAll();
      setPages(result.pagesAll);
    })();
  }, []);

  const handleCheckboxChange = (pageId) => {
    const isSelected = selectedPages.includes(pageId);
    if (isSelected) {
      setSelectedPages(prevSelected => prevSelected.filter(id => id !== pageId));
    } else {
      setSelectedPages(prevSelected => [...prevSelected, pageId]);
    }
  };
  function MenuPageStore(event) {
    event.preventDefault();//không load lại trang
    const menu ={
      position:prop.position,
      listid:selectedPages,
      type: "trang-don"
    }
    MenuServices.create(menu)
    .then((result) => {
      alert(result.message);
      navigator('/admin/menu', { replace: true });
    })
  }

  // function MenuPageStore(event) {
  //   event.preventDefault();//không load lại trang
  //   const stringid = selectedPages.join('');
  //   const position=prop.position
  //   const listid=stringid
  //   const type= "trang-don"
  //   MenuServices.tao(position, type, listid)
  //   .then((result) => {
  //     alert(result.message);
  //     navigator('/admin/menu', { replace: true });
  //   })
  // }

  return (
    <form method='post' onSubmit={MenuPageStore}>
      <li className="list-group-item mb-2 border nav-item">
        <a
          className="nav-link menu-expanded"
          href="#multiCollapsePost"
          data-toggle="collapse"
        //aria-expanded="false"
        >
          Trang đơn
        </a>
        <div
          className="multi-collapse border-top mt-2 collapse"
          id="multiCollapsePost"
        >
          {pages && pages.length > 0 && pages.map(function (page, index) {
            return (
              <div className="form-check" key={index}>
                <input
                  name="pageid[]"
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id={"page" + page.id}
                  style={{ width: 17, margin: " -13px 16px" }}
                  onChange={() => handleCheckboxChange(page.id)}
                  checked={selectedPages.includes(page.id)}

                />
                <label className="form-check-label" htmlFor={"page" + page.id}>
                  {page.title}
                </label>
              </div>
            );
          })}

          <div className="my-3">
            <button
              name="ADDpage"
              type="submit"
              className="btn btn-sm btn-success form-control"
            >
              Thêm menu trang đơn
            </button>
          </div>
        </div>
      </li>
    </form>
  );
}

export default MenuPageCreate;