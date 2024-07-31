import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostServices from "../../../services/PostServices"

function PostShow() {
    const navigator = useNavigate();
    const {id} = useParams();
    const [post, setPost] = useState([])
    useEffect (function(){
          (async function(){
            await PostServices.getById(id)
            .then(function(result){
                setPost(result.post)
            });
          })();
    },[]);
    async function PostDelete(id)
    {
      await PostServices.remove(id)
            .then(function(result){
                alert(result.message)
                navigator("/admin/post", {replace:true})
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
                <Link to="/admin/post" className="btn btn-info btn-sm me-2">
                    <FaPlus/> Về danh sách
                </Link>
                <Link className="btn btn-sm btn-primary me-1" to={"/admin/post/update/" + post.id}>
                      <FaEdit/>Sửa
                </Link>
                <button onClick={()=>PostDelete(post.id)} className="btn btn-sm btn-danger">
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
                      <td>{post.id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mã chủ đề</th>
                      <td>{post.topic_id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tiêu đề</th>
                      <td>{post.title}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Chi tiết</th>
                      <td>{post.detail}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Loại</th>
                      <td>{post.type}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Từ khóa</th>
                      <td>{post.metakey}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mô tả</th>
                      <td>{post.metadesc}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày tạo</th>
                      <td>{post.created_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày cập nhật</th>
                      <td>{post.updated_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tình trạng</th>
                      <td>{post.status}</td>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default PostShow;