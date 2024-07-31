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
                setTopics(result.topicsAll)
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

<form method='post' onSubmit={TopicEdit}>
      <div className="content">
        <section className="content-header my-2">
          <strong className="inline-block text-3xl text-navy-700 dark:text-white">Thêm chủ đề</strong>
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
                    <strong>Tên chủ đề (*)</strong>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nhập tên chủ đề"
                    className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Mô tả (*)</strong>
                  </label>
                  <textarea
                    value={metadesc}
                    onChange={(e) => setMetadesc(e.target.value)}
                    name="description"
                    rows={6}
                    className="form-textarea mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    placeholder="Nhập mô tả"
                  />
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Từ khoá (*)</strong>
                  </label>
                  <textarea
                    value={metakey}
                    onChange={(e) => setMetakey(e.target.value)}
                    name="keywords"
                    rows={6}
                    className="form-textarea mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    placeholder="Nhập từ khoá"
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
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
              <div className="bg-white p-5 rounded-xl shadow mt-4">
                <div className="py-1 px-2 border-b rounded">
                  <strong>Cấp cha</strong>
                </div>
                <div className="p-2 border-b">
                  <select
                    name="parent_id"
                    className="form-select w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                    value={parent_id}
                    onChange={(e) => setParentId(e.target.value)}
                  >
                    <option value={0}>None</option>
                    {topics.map((topic, index) => (
                      <option key={index} value={topic.id}>
                        {topic.name}
                      </option>
                    ))}
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