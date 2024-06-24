import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductServices from '../../../services/ProductServices';
import BrandServices from '../../../services/BrandServices';
import CategoryServices from '../../../services/CategoryServices';

function ProductCreate() {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigator = useNavigate();
    const [category_id, setCategoryId] = useState(0);
    const [brand_id, setBrandId] = useState(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [detail, setDetail] = useState("");
    const [metakey, setMetakey] = useState("");
    const [metadesc, setMetadesc] = useState("");
    const [status, setStatus] = useState(1);

    function ProductStore(event) {
        event.preventDefault();//không load lại trang
        const image = document.querySelector("#image");
        var product = new FormData();
        product.append("category_id", category_id)
        product.append("brand_id", brand_id)
        product.append("name", name)
        product.append("price", price)
        product.append("detail", detail)
        product.append("metakey", metakey)
        product.append("metadesc", metadesc)
        product.append("status", status)
        if (image.files.length === 0) {
            product.append("image", "")
          }
          else {
            product.append("image", image.files[0])
          }
        ProductServices.create(product)
            .then(function (result) {
                alert(result.message);
                navigator("/admin/product", { replace: true })
            });
    }
    useEffect(function () {
        (async function () {
            await BrandServices.getAll()
                .then(function (result) {
                    setBrands(result.brandsAll)
                });
        })();
    }, []);
    useEffect(function () {
        (async function () {
            await CategoryServices.getAll()
                .then(function (result) {
                    setCategories(result.categoriesAll)
                });
        })();
    }, []);
    return (
        <form method='product' onSubmit={ProductStore}>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Thêm sản phẩm</h1>
                    <div className="mt-1 text-right">
                        <a className="btn btn-sm btn-primary" href="product_index.html">
                            <i className="fa fa-arrow-left" /> Về danh sách
                        </a>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label>
                                    <strong>Tên sản phẩm (*)</strong>
                                </label>
                                <input
                                value={name} onChange={(e)=> setName(e.target.value)}
                                    type="text"
                                    placeholder="Nhập tên sản phẩm"
                                    name="name"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label>
                                    <strong>Chi tiết (*)</strong>
                                </label>
                                <textarea
                                value={detail} onChange={(e)=> setDetail(e.target.value)} 
                                    name="detail"
                                    placeholder="Nhập chi tiết sản phẩm"
                                    rows={7}
                                    className="form-control"
                                    defaultValue={""}
                                />
                            </div>
                            <div className="mb-3">
                                <label>
                                    <strong>Mô tả (*)</strong>
                                </label>
                                <textarea
                                value={metadesc} onChange={(e)=> setMetadesc(e.target.value)} 
                                    name="description"
                                    rows={3}
                                    className="form-control"
                                    placeholder="Nhập mô tả"
                                    defaultValue={""}
                                />
                            </div>
                            <div className="mb-3">
                                <label>
                                    <strong>Từ khoá (*)</strong>
                                </label>
                                <input
                                value={metakey} onChange={(e)=> setMetakey(e.target.value)}
                                    type="text"
                                    placeholder="Nhập tên sản phẩm"
                                    name="name"
                                    className="form-control"
                                />
                            </div>

                        </div>
                        <div className="col-md-3">
                            <div className="box-container mt-4 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Đăng</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select name="status" className="form-select" value={status} onChange={(e)=> setStatus(e.target.value)} >
                                        <option value={1}>Xuất bản</option>
                                        <option value={2}>Chưa xuất bản</option>
                                    </select>
                                </div>
                                <div className="box-footer text-end px-2 py-2 text-right">
                                    <button type="submit" className="btn btn-success btn-sm">
                                        <i className="fa fa-save" aria-hidden="true" /> Đăng
                                    </button>
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Danh mục(*)</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select name="category_id" className="form-select" value={category_id} onChange={(e)=> setCategoryId(e.target.value)}>
                                        <option value="">Chọn danh mục</option>
                                        {categories.map(function(category, index){
                                    return <option key={index} value={category.id}>{category.name}</option>
                                })}
                                    </select>
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Thương hiệu(*)</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select name="brand_id" className="form-select" value={brand_id} onChange={(e)=> setBrandId(e.target.value)}>
                                        <option value="">Chọn thương hiêu</option>
                                        {brands.map(function(brand, index){
                                    return <option key={index} value={brand.id}>{brand.name}</option>
                                })}
                                    </select>
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Giá bán(*)</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <div className="mb-3">
                                        <input
                                        value={price} onChange={(e)=> setPrice(e.target.value)}
                                            type="number"
                                            defaultValue={10000}
                                            min={10000}
                                            name="price"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="box-container mt-2 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Hình đại diện(*)</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <input type="file" id="image" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
}

export default ProductCreate;