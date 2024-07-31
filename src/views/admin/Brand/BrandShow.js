import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import BrandServices from "../../../services/BrandServices"

function BrandShow() {
    const navigator = useNavigate();
    const {id} = useParams();
    const [brand, setBrand] = useState([])
    useEffect (function(){
          (async function(){
            await BrandServices.getById(id)
            .then(function(result){
                setBrand(result.brand)
            });
          })();
    },[]);
    async function BrandDelete(id)
    {
      await BrandServices.remove(id)
            .then(function(result){
                alert(result.message)
                navigator("/admin/brand", {replace:true})
            });
    }
    return (
        <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="text-danger text-uppercase">
                Chi tiết thương hiệu
              </strong>
            </div>
            <div className="col-6 text-end">
                <Link to="/admin/brand" className="btn btn-info btn-sm me-2">
                    <FaPlus/> Về danh sách
                </Link>
                <Link className="btn btn-sm btn-primary me-1" to={"/admin/brand/update/" + brand.id}>
                      <FaEdit/>Sửa
                </Link>
                <button onClick={()=>BrandDelete(brand.id)} className="btn btn-sm btn-danger">
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
                      <td>{brand.id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tên Thương hiệu</th>
                      <td>{brand.name}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Slug</th>
                      <td>{brand.slug}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Thứ tự</th>
                      <td>{brand.sort_order}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Từ khóa</th>
                      <td>{brand.metakey}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mô tả</th>
                      <td>{brand.metadesc}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày tạo</th>
                      <td>{brand.created}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày cập nhật</th>
                      <td>{brand.updated_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Trạng thái</th>
                      <td>{brand.status}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default BrandShow;