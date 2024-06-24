import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import PostServices from '../../../services/PostServices';
import TopicServices from '../../../services/TopicServices';

function PostCreate() {
  const [topics, setTopics] = useState([]);
  const navigator = useNavigate();
  const [topic_id, setTopicId] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [type, setType] = useState("post");
  const [metakey, setMetakey] = useState("");
  const [metadesc, setMetadesc] = useState("");
  const [status, setStatus] = useState(1);
  useEffect(function () {
    (async function () {
      await TopicServices.getAll()
        .then(function (result) {
          setTopics(result.topicsAll)
        });
    })();
  }, []);
  function PostStore(event) {
    event.preventDefault();//không load lại trang
    const image = document.querySelector("#image");
    var post = new FormData();
    post.append("topic_id", topic_id)
    post.append("title", title)
    post.append("detail", detail)
    post.append("type", type)
    post.append("metakey", metakey)
    post.append("metadesc", metadesc)
    post.append("status", status)
    if (image.files.length === 0) {
      post.append("image", "")
    }
    else {
      post.append("image", image.files[0])
    }
    (async function () {
      const result = await PostServices.create(post)
      alert(result.message);
      navigator("/admin/post", { replace: true })
    })();
  }

  return (
    <form method='post' onSubmit={PostStore}>
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">Thêm bài viết</h1>
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
                  <strong>Tiêu đề bài viết (*)</strong>
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
                    <i className="fa fa-save" aria-hidden="true" /> Đăng
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

export default PostCreate;