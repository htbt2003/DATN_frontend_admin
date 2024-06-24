import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import BannerServices from "../../../services/BannerServices"

function BannerShow() {
    const navigator = useNavigate();
    const {id} = useParams();
    const [banner, setBanner] = useState([])
    useEffect (function(){
          (async function(){
            await BannerServices.getById(id)
            .then(function(result){
                setBanner(result.banner)
            });
          })();
    },[]);
    async function BannerDelete(id)
    {
      await BannerServices.remove(id)
            .then(function(result){
                alert(result.message)
                navigator("/admin/banner", {replace:true})
            });
    }
    return (
        <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="text-danger text-uppercase">
                Chi tiết banner
              </strong>
            </div>
            <div className="col-6 text-end">
                <Link to="/admin/banner" className="btn btn-info btn-sm me-2">
                    <FaPlus/> Về danh sách
                </Link>
                <Link className="btn btn-sm btn-primary me-1" to={"/admin/banner/update/" + banner.id}>
                      <FaEdit/>Sửa
                </Link>
                <button onClick={()=>BannerDelete(banner.id)} className="btn btn-sm btn-danger">
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
                      <td>{banner.id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tên banner</th>
                      <td>{banner.name}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Vị trí</th>
                      <td>{banner.position}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày tạo</th>
                      <td>{banner.created_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày cập nhật</th>
                      <td>{banner.updated_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tình trạng</th>
                      <td>{banner.status}</td>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default BannerShow;