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
    MenuServices.tao(menu)
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
                  <div className="bg-white p-5 rounded">
                <div>
                {pages && pages.length > 0 && pages.map(function (page, index) {
                        return (
                            <div className="form-check flex items-center gap-3 mb-2" key={index}>
                                <input
                                    className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
            justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s]
            checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
                                    type="checkbox"
                                    id={"page" + page.id}
                  onChange={() => handleCheckboxChange(page.id)}
                  checked={selectedPages.includes(page.id)}

                                />
                               <label className="form-check-label" htmlFor={"page" + page.id}>
                  {page.title}
                </label>
                            </div>
                        );
                    })}
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

export default MenuPageCreate;