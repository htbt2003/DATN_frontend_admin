import TopicServices from "../../../services/TopicServices"
import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import { useEffect, useState } from 'react';

function TopicUpdate() {
    const {id} = useParams();
    const [topics, setTopics] = useState([]);
    const navigator = useNavigate();
    const [name, setName] = useState("");
    const [metakey, setMetakey] = useState("");
    const [metadesc, setMetadesc] = useState("");
    const [parent_id, setParentId] = useState(0);
    const [status, setStatus] = useState(1);

    function TopicEdit(event)
    {
        event.preventDefault();//không load lại trang
        var topic = new FormData();
        topic.append("name", name)
        topic.append("metakey", metakey)
        topic.append("metadesc", metadesc)
        topic.append("parent_id", parent_id)
        topic.append("status", status)
        TopicServices.update(topic, id)
        .then(function(result) {
            alert(result.message);
            navigator("/admin/topic", {replace:true})
        });
    }
    useEffect (function(){
          (async function(){
            await TopicServices.getAll()
            .then(function(result){
                setTopics(result.topics)
            });
          })();
    },[]);
    useEffect (function(){
        (async function(){
          await TopicServices.getById(id)
          .then(function(result){
              const tmp = result.topic
              setName(tmp.name);
              setMetakey(tmp.metakey);
              setMetadesc(tmp.metadesc);
              setParentId(tmp.parent_id);
              setStatus(tmp.status);
          });
        })();
    },[]);
    return (
        // <form method='post' onSubmit={BrandEdit}>

        <form method='post' >
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Cập nhật chủ đề</h1>
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
                                    <strong>Tên chủ đề (*)</strong>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Nhập tên chủ đề"
                                    className="form-control"
                                    required=""
                                />
                            </div>
                            <div className="mb-3">
                                <label>
                                    <strong>Slug</strong>
                                </label>
                                <input
                                    type="text"
                                    name="slug"
                                    id="slug"
                                    placeholder="Nhập slug"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label>
                                    <strong>Mô tả</strong>
                                </label>
                                <textarea
                                    name="description"
                                    rows={6}
                                    className="form-control"
                                    placeholder="Nhập mô tả"
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="box-container mt-4 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Đăng</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select name="status" className="form-select">
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
                            <div className="box-container mt-4 bg-white">
                                <div className="box-header py-1 px-2 border-bottom">
                                    <strong>Thứ tự</strong>
                                </div>
                                <div className="box-body p-2 border-bottom">
                                    <select name="sort_order" className="form-select">
                                        <option value="">Sau</option>
                                        <option value={2}>sau</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
}

export default TopicUpdate;