import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuServices from '../../../services/MenuServices';
import CategoryServices from '../../../services/CategoryServices';

function MenuCategoryCreate(prop) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigator = useNavigate();
  useEffect(function () {
    (async function () {
      const result = await CategoryServices.getAll();
      setCategories(result.categoriesAll);
    })();
  }, []);
  console.log(categories)
  const handleCheckboxChange = (categoryId) => {
    const isSelected = selectedCategories.includes(categoryId);
    if (isSelected) {
      setSelectedCategories(prevSelected => prevSelected.filter(id => id !== categoryId));
    } else {
      setSelectedCategories(prevSelected => [...prevSelected, categoryId]);
    }
  };
  function MenuCategoryStore(event) {
    event.preventDefault();//không load lại trang
    const menu ={
      position:prop.position,
      listid:selectedCategories,
      type: "danh-muc-san-pham"
    }
    MenuServices.create(menu)
    .then((result) => {
      alert(result.message);
      navigator('/admin/menu', { replace: true });
    })
  }
  return (
    <form onSubmit={MenuCategoryStore} >
      <li className="list-group-item mb-2 border nav-item">
        <a
          className="nav-link menu-expanded"
          href="#multiCollapseCategory"
          data-toggle="collapse"
        //aria-expanded="false"
        >
          Danh mục sản phẩm
        </a>
        <div
          className="multi-collapse border-top mt-2 collapse"
          id="multiCollapseCategory"
        >
          {categories && categories.length > 0 && categories.map(function (category, index) {
            return (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id={"category"+category.id}
                  style={{ width: 17, margin: " -13px 16px" }}
                  onChange={() => handleCheckboxChange(category.id)}
                  checked={selectedCategories.includes(category.id)}
                />
                <label className="form-check-label" htmlFor={"category"+category.id}>
                  {category.name}
                </label>
              </div>
            );
          })}


          <div className="my-3">
            <button
              type="submit"
              className="btn btn-sm btn-success form-control"
            >
              Thêm menu danh mục
            </button>
          </div>
        </div>
      </li>
    </form>
  );
}

export default MenuCategoryCreate;