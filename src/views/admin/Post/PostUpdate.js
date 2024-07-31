import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import PostServices from '../../../services/PostServices';
import TopicServices from '../../../services/TopicServices';
import TinyMCE from 'components/tiny';

function PostUpdate() {
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
                setTopics(result.topicsAll)
            });
          })();
    },[]);
    useEffect (function(){
        (async function(){
          await PostServices.getById(id)
          .then(function(result){
              const tmp = result.post
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
    function PostEdit(event)
    {
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
        if(image.files.length === 0)
        {
            post.append("image", "")
        }
        else
        {
            post.append("image", image.files[0])
        }
       PostServices.update(post, id)
        .then(function(result) {
            alert(result.message);
            navigator("/admin/post", {replace:true})
        }); 
    }
console.log(detail)
    return (
<form method='post' onSubmit={PostEdit} className="mt-8">
      <div className="content">
        <section className="content-header my-2">
          <strong className="inline-block text-3xl text-navy-700 dark:text-white">Cập nhật bài viết</strong>
          <div className="mt-1 text-right">
            <Link className="linear mb-4 rounded bg-brand-500 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" to="/admin/product">
              <i className="fa fa-arrow-left" /> Về danh sách
            </Link>
          </div>
        </section>
        <section className="content-body my-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <div className="bg-white p-5 rounded-xl">
                <div className="mb-3">
                  <label>
                    <strong>Tiêu đề trang đơn (*)</strong>
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    placeholder="Nhập tiêu đề"
                  />
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Chi tiết (*)</strong>
                  </label>
                  <TinyMCE setValue={setDetail} placeholder={detail} />
                  {/* <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    name="detail"
                    rows={7}
                    className="form-textarea mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    placeholder="Nhập chi tiết"
                  /> */}
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Mô tả (*)</strong>
                  </label>
                  <textarea
                    value={metadesc}
                    onChange={(e) => setMetadesc(e.target.value)}
                    name="description"
                    rows={4}
                    className="form-textarea mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    placeholder="Mô tả"
                  />
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Từ khoá (*)</strong>
                  </label>
                  <input
                    value={metakey}
                    onChange={(e) => setMetakey(e.target.value)}
                    name="keywords"
                    className="form-input mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    placeholder="Từ khoá"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl shadow">
                <div className="py-1 px-2 border-b rounded">
                  <strong>Đăng</strong>
                </div>
                <div className="p-2 border-b">
                  <select
                    name="status"
                    className="form-select w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={1}>Xuất bản</option>
                    <option value={2}>Chưa xuất bản</option>
                  </select>
                </div>
                <div className="text-right px-2 py-2">
                  <button
                    type="submit"
                    className="linear rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                  >
                    <i className="fa fa-save" aria-hidden="true" /> Đăng
                  </button>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow">
                <div className="py-1 px-2 border-b rounded">
                  <strong>Chủ đề (*)</strong>
                </div>
                <div className="p-2 border-b">
                  <select
                    name="topic_id"
                    className="form-select w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                    value={topic_id}
                    onChange={(e) => setTopicId(e.target.value)}
                  >
                    <option value="">None</option>
                    {topics.map((topic, index) => (
                      <option key={index} value={topic.id}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow">
                <div className="py-1 px-2 border-b rounded">
                  <strong>Hình đại diện</strong>
                </div>
                <div className="p-2 border-b">
                  <input
                    type="file"
                    id="image"
                    // onChange={handleImageChange}
                    className="form-input mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
    );
}

export default PostUpdate;