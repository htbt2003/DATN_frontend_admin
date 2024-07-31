import ContactServices from "../../../services/ContactServices"
import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import UserServices from "../../../services/UserServices"

function ContactUpdate() {
    const [users, setUsers] = useState([]);
    const {id} = useParams();
    const navigator = useNavigate();
    const [user_id, setUserId] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [replay_id, setReplayId] = useState(0);
    const [status, setStatus] = useState(1);

    function contactEdit(event)
    {
        event.preventDefault();//không load lại trang
        var contact = new FormData();
        contact.append("user_id", user_id)
        contact.append("name", name)
        contact.append("email", email)
        contact.append("phone", phone)
        contact.append("title", title)
        contact.append("content", content)
        contact.append("replay_id", replay_id)
        contact.append("status", status)
        ContactServices.update(contact, id)
        .then(function(result) {
            alert(result.data.message);
            navigator("/admin/contact", {replace:true})
        });
    }
    useEffect(function(){
      (async function(){
        await UserServices.getAll()
        .then(function(result){
            setUsers(result.users)
        });
      })();
    },[])
    useEffect (function(){
        (async function(){
          await ContactServices.getById(id)
          .then(function(result){
              const tmp = result.data.contact
              setUserId(tmp.user_id);
              setName(tmp.name);
              setEmail(tmp.email);
              setPhone(tmp.phone);
              setTitle(tmp.title);
              setContent(tmp.content);
              setReplayId(tmp.replay_id);
              setStatus(tmp.status);
          });
        })();
    },[]);
    return (
<form method="post" onSubmit={contactEdit}>
  <div className="content">
    <section className="content-header my-2">
      <strong className="inline-block text-3xl text-navy-700 dark:text-white">Cập nhật liên hệ</strong>
      <div className="mt-1 text-right">
        <Link to="/admin/contact" className="linear mb-4 rounded bg-brand-500 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          <FaPlus /> Về danh sách
        </Link>
        <button type="submit" className="linear ml-2 rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Lưu
        </button>
      </div>
    </section>
    <section className="content-body my-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="bg-white p-5 rounded-xl">
            <div className="mb-3">
              <label><strong>Tên liên hệ (*)</strong></label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
              />
            </div>
            <div className="mb-3">
              <label><strong>Email (*)</strong></label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
              />
            </div>
            <div className="mb-3">
              <label><strong>Chủ đề (*)</strong></label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
              />
            </div>
            <div className="mb-3">
              <label><strong>Nội dung (*)</strong></label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-textarea mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="py-1 px-2 border-b rounded"><strong>Mã khách hàng (*)</strong></div>
            <div className="p-2 border-b">
              <select
                value={user_id}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
              >
                {users.map((user, index) => (
                  <option key={index} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="py-1 px-2 border-b rounded"><strong>Relpay id (*)</strong></div>
            <div className="p-2 border-b">
              <input
                value={replay_id}
                onChange={(e) => setReplayId(e.target.value)}
                type="text"
                className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
              />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="py-1 px-2 border-b rounded"><strong>Điện thoại (*)</strong></div>
            <div className="p-2 border-b">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
              />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="py-1 px-2 border-b rounded"><strong>Trạng thái</strong></div>
            <div className="p-2 border-b">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
              >
                <option value="1">Xuất bản</option>
                <option value="2">Chưa xuất bản</option>
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

export default ContactUpdate;