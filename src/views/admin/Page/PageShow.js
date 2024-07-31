import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageServices from "../../../services/PageServices"

function PageShow() {
    const navigator = useNavigate();
    const {id} = useParams();
    const [page, setpage] = useState([])
    useEffect (function(){
          (async function(){
            await PageServices.getById(id)
            .then(function(result){
                setpage(result.page)
            });
          })();
    },[]);
    async function PageDelete(id)
    {
      await PageServices.remove(id)
            .then(function(result){
                alert(result.message)
                navigator("/admin/page", {replace:true})
            });
    }
    return (
        <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="text-danger text-uppercase">
                Chi tiết trang đơn
              </strong>
            </div>
            <div className="col-6 text-end">
                <Link to="/admin/page" className="btn btn-info btn-sm me-2">
                    <FaPlus/> Về danh sách
                </Link>
                <Link className="btn btn-sm btn-primary me-1" to={"/admin/page/update/" + page.id}>
                      <FaEdit/>Sửa
                </Link>
                <button onClick={()=>PageDelete(page.id)} className="btn btn-sm btn-danger">
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
                      <td>{page.id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mã chủ đề</th>
                      <td>{page.topic_id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tiêu đề</th>
                      <td>{page.title}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Chi tiết</th>
                      <td>{page.detail}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Loại</th>
                      <td>{page.type}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Từ khóa</th>
                      <td>{page.metakey}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mô tả</th>
                      <td>{page.metadesc}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày tạo</th>
                      <td>{page.created_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày cập nhật</th>
                      <td>{page.updated_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tình trạng</th>
                      <td>{page.status}</td>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default PageShow;