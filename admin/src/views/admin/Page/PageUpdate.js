import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import PageServices from '../../../services/PageServices';
import TopicServices from '../../../services/TopicServices';

function PageUpdate() {
    const {id} = useParams();
    const [topics, setTopics] = useState([]);
    const navigator = useNavigate();
    const [topic_id, setTopicId] = useState("");
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [type, setType] = useState("");
    const [metakey, setMetakey] = useState("");
    const [metadesc, setMetadesc] = useState("");
    const [status, setStatus] = useState(1);

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
          await PageServices.getById(id)
          .then(function(result){
              const tmp = result.page
              setTopicId(tmp.topic_id);
              setTitle(tmp.title);
              setDetail(tmp.detail);
              setType(tmp.type);
              setMetakey(tmp.metakey);
              setMetadesc(tmp.metadesc);
              setStatus(tmp.status);
          });
        })();
    },[]);
    function PageEdit(event)
    {
        event.preventDefault();//không load lại trang
        const image = document.querySelector("#image");
        var page = new FormData();
        page.append("topic_id", topic_id)
        page.append("title", title)
        page.append("detail", detail)
        page.append("type", type) 
        page.append("metakey", metakey)
        page.append("metadesc", metadesc)
        page.append("status", status)
        if(image.files.length === 0)
        {
            page.append("image", "")
        }
        else
        {
            page.append("image", image.files[0])
        }
       PageServices.update(page, id)
        .then(function(result) {
            alert(result.message);
            navigator("/admin/page", {replace:true})
        }); 
    }

    return (
    <form method='page' onSubmit={PageEdit}>
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">Cập nhật trang đơn</h1>
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
                  <strong>Tiêu đề trang đơn (*)</strong>
                </label>
                <input
                  value={title} onChange={(e)=> setTitle(e.target.value)}
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Nhập tiêu đề"
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Chi tiết (*)</strong>
                </label>
                <textarea
                  value={detail} onChange={(e)=> setDetail(e.target.value)}
                  name="detail"
                  rows={7}
                  className="form-control"
                  placeholder="Nhập chi tiết"
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
                  rows={4}
                  className="form-control"
                  placeholder="Mô tả"
                  defaultValue={""}
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Từ khoá (*)</strong>
                </label>
                <input
                value={metakey} onChange={(e)=> setMetakey(e.target.value)}
                  name="description"
                  rows={4}
                  className="form-control"
                  placeholder="Mô tả"
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
                  <select name="status" className="form-select" value={status} onChange={(e)=> setStatus(e.target.value)}>
                    <option value={1}>Xuất bản</option>
                    <option value={2}>Chưa xuất bản</option>
                  </select>
                </div>
                <div className="box-footer text-end px-2 py-2 text-right">
                  <button type="submit" className="btn btn-success btn-sm">
                    <i className="fa fa-save" aria-hidden="true" /> Cập nhật
                  </button>
                </div>
              </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Chủ đề (*)</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <select name="topic_id" className="form-select" value={topic_id} onChange={(e)=> setTopicId(e.target.value)}>
                    <option value="">None</option>
                    {topics.map(function(topic, index){
                        return <option key={index} value={topic.id}>{topic.name}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Hình đại diện</strong>
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

export default PageUpdate;