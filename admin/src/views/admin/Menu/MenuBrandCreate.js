import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuServices from '../../../services/MenuServices';
import BrandServices from '../../../services/BrandServices';

function MenuBrandCreate(prop) {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [brands, setBrands] = useState([]);
    const navigator = useNavigate();
    useEffect(function () {
        (async function () {
            const result = await BrandServices.getAll();
            setBrands(result.brandsAll);
        })();
    }, []);
    const handleCheckboxChange = (brandId) => {
      const isSelected = selectedBrands.includes(brandId);
      if (isSelected) {
        setSelectedBrands(prevSelected => prevSelected.filter(id => id !== brandId));
      } else {
        setSelectedBrands(prevSelected => [...prevSelected, brandId]);
      }
    };  
    function MenuBrandStore(event) {
        event.preventDefault();//không load lại trang
        const stringid = selectedBrands.join('');
        const position=prop.position
        const listid=stringid
        const type= "thuong-hieu"
        MenuServices.tao(position, type, listid)
        .then((result) => {
        alert(result.message);
        navigator('/admin/menu', { replace: true });
        })
    }

    return (
        <form onSubmit={MenuBrandStore}>
            <li className="list-group-item mb-2 border nav-item">
                <a
                    className="nav-link menu-expanded"
                    href="#multiCollapseBrand"
                    data-toggle="collapse"
                //aria-expanded="false"
                >
                    Thương hiệu
                </a>
                <div
                    className="multi-collapse border-top mt-2 collapse"
                    id="multiCollapseBrand"
                >
                    {brands && brands.length > 0 && brands.map(function (brand, index) {
                        return (
                            <div className="form-check" key={index}>
                                <input
                                    name="brandid[]"
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultValue=""
                                    id={"brand"+brand.id}
                                    style={{ width: 17, margin: " -13px 16px" }}
                                    onChange={() => handleCheckboxChange(brand.id)}
                                    checked={selectedBrands.includes(brand.id)}
                  
                                />
                                <label className="form-check-label" htmlFor={"brand"+brand.id}>
                                    {brand.name}
                                </label>
                            </div>
                        );
                    })}

                    <div className="my-3">
                        <button
                            name="ADDbrand"
                            type="submit"
                            className="btn btn-sm btn-success form-control"
                        >
                            Thêm menu thương hiệu
                        </button>
                    </div>
                </div>
            </li>
        </form>
    );
}

export default MenuBrandCreate;