import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import TopicServices from "../../../services/TopicServices"

function TopicShow() {
    const navigator = useNavigate();
    const {id} = useParams();
    const [topic, setTopic] = useState([])
    useEffect (function(){
          (async function(){
            await TopicServices.getById(id)
            .then(function(result){
                setTopic(result.data.topic)
            });
          })();
    },[]);
    async function TopicDelete(id)
    {
      await TopicServices.remove(id)
            .then(function(result){
                alert(result.data.message)
                navigator("/admin/topic", {replace:true})
            });
    }
    return (
        <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="text-danger text-uppercase">
                Chi tiết chủ đề
              </strong>
            </div>
            <div className="col-6 text-end">
                <Link to="/admin/topic" className="btn btn-info btn-sm me-2">
                    <FaPlus/> Về danh sách
                </Link>
                <Link className="btn btn-sm btn-primary me-1" to={"/admin/topic/update/" + topic.id}>
                      <FaEdit/>Sửa
                </Link>
                <button onClick={()=>TopicDelete(topic.id)} className="btn btn-sm btn-danger">
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
                      <td>{topic.id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tên chủ đề</th>
                      <td>{topic.name}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Slug</th>
                      <td>{topic.slug}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Cấp cha</th>
                      <td>{topic.parent_id}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Từ khóa</th>
                      <td>{topic.metakey}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Mô tả</th>
                      <td>{topic.metadesc}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày tạo</th>
                      <td>{topic.created_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Ngày cập nhật</th>
                      <td>{topic.updated_at}</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tình trạng</th>
                      <td>{topic.status}</td>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default TopicShow;