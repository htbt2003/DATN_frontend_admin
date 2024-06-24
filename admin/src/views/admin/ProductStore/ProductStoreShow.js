import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductServices from "../../../services/ProductServices"

function ProductStoreShow() {
    const navigator = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState([])
    useEffect (function(){
          (async function(){
            await ProductServices.getById(id)
            .then(function(result){
                setProduct(result.data.product)
            });
          })();
    },[]);
    async function ProductDelete(id)
    {
      await ProductServices.remove(id)
            .then(function(result){
                alert(result.data.message)
                navigator("/admin/product", {replace:true})
            });
    }
    return (
        <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="text-danger text-uppercase">
                Chi tiết sản phẩm
              </strong>
            </div>
            <div className="col-6 text-end">
                <Link to="/admin/product" className="btn btn-info btn-sm me-2">
                    <FaPlus/> Về danh sách
                </Link>
                <Link className="btn btn-sm btn-primary me-1" to={"/admin/product/update/" + product.id}>
                      <FaEdit/>Sửa
                </Link>
                <button onClick={()=>ProductDelete(product.id)} className="btn btn-sm btn-danger">
                    <FaTrash/>Xóa
                </button>
            </div>
          </div>
        </div>
        <div className="card-body">
            <table className="table table-border">
                <thead>
                    <tr>
                        <th className="text-center" style={{ width:200 }}>Tên trường</th>
                        <th>Giá trị</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <th className="text-center">Id</th>
                      <td>{product.id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mã danh mục</th>
                      <td>{product.category_id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mã thương hiệu</th>
                      <td>{product.brand_id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tên sản phẩm</th>
                      <td>{product.name}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Slug</th>
                      <td>{product.slug}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Giá</th>
                      <td>{product.price}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Khuyến mãi</th>
                      <td>{product.price_sale}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Số lượng</th>
                      <td>{product.qty}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Chi tiết</th>
                      <td>{product.detail}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Từ khóa</th>
                      <td>{product.metakey}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mô tả</th>
                      <td>{product.metadesc}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày tạo</th>
                      <td>{product.created_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày cập nhật</th>
                      <td>{product.updated_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tình trạng</th>
                      <td>{product.status}</td>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default ProductStoreShow;