import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ConfigServices from '../../services/ConfigServices';

const Config = ({User}) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [zalo, setZalo] = useState("");
    const [facebook, setfacebook] = useState("");
    const [youtube, setyoutube] = useState("");
    const [metadesc, setmetadesc] = useState("");
    const [metakey, setmetakey] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState();
    function UserEdit(event)
    {
        event.preventDefault();//không load lại trang
        const image = document.querySelector("#image");
        var user = new FormData();
        user.append("email", email)
        user.append("phone", phone)
        user.append("zalo", zalo)
        user.append("facebook", facebook)
        user.append("youtube", youtube)
        user.append("metadesc", 'metadesc')
        user.append("metakey", metakey)
        user.append("address", address)
        user.append("status", status)
        if(image.files.length === 0)
        {
            user.append("image", "")
        }
        else
        {
            user.append("image", image.files[0])
        }
        ConfigServices.update(user)
        .then(function(result) {
            alert(result.message);
            navigator("/admin/user", {replace:true})
        });
    }
    useEffect (function(){
        (async function(){
          await ConfigServices.show()
          .then(function(result){
              const tmp = result.config
              setEmail(tmp.name);
              setPhone(tmp.email);
              setZalo(tmp.phone);
              setfacebook(tmp.username);
              setmetadesc(tmp.password);
              setmetakey(tmp.address);
              setStatus(tmp.status);
              setyoutube(tmp.name);
              setAddress(tmp.name);
          });
        })();
    },[]);
    return ( 
        <div className="content">
  <section className="content-header my-2">
    <h1 className="d-inline">Cấu hình website</h1>
  </section>
  <section className="content-body my-3">
    <form action="" method="post">
      <input type="hidden" name="id" defaultValue="" />
      <div className="mb-3">
        <label htmlFor="author">
          <strong>Tác giả(*)</strong>
        </label>
        <input
          value={User.name}
          type="text"
          name="author"
          defaultValue=""
          id="author"
          className="form-control"
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email">
          <strong>Email(*)</strong>
        </label>
        <input
         value={email} onChange={(e)=> setEmail(e.target.value)}
          type="text"
          name="email"
          defaultValue=""
          id="email"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone">
          <strong>Điện thoại(*)</strong>
        </label>
        <input
         value={phone} onChange={(e)=> setPhone(e.target.value)}
          type="text"
          name="phone"
          defaultValue=""
          id="phone"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="zalo">
          <strong>Zalo(*)</strong>
        </label>
        <input
         value={zalo} onChange={(e)=> setZalo(e.target.value)}
          type="text"
          name="zalo"
          defaultValue=""
          id="zalo"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="facebook">
          <strong>Facebook cá nhân(*)</strong>
        </label>
        <input
         value={facebook} onChange={(e)=> setfacebook(e.target.value)}
          type="text"
          name="facebook"
          defaultValue=""
          id="facebook"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address">
          <strong>Địa chỉ(*)</strong>
        </label>
        <input
         value={address} onChange={(e)=> setAddress(e.target.value)}
          type="text"
          name="address"
          defaultValue=""
          id="address"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="youtube">
          <strong>Kênh Youtube(*)</strong>
        </label>
        <input
         value={youtube} onChange={(e)=> setyoutube(e.target.value)}
          type="text"
          name="youtube"
          defaultValue=""
          id="youtube"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="metadesc">
          <strong>Mô tả seo(*)</strong>
        </label>
        <textarea
         value={metadesc} onChange={(e)=> setmetadesc(e.target.value)}
          name="metadesc"
          id="metadesc"
          className="form-control"
          defaultValue={""}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="metakey">
          <strong>Từ khoa seo(*)</strong>
        </label>
        <textarea
         value={metakey} onChange={(e)=> setmetakey(e.target.value)}
          name="metakey"
          id="metakey"
          className="form-control"
          defaultValue={""}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status">
          <strong>Trạng thái</strong>
        </label>
        <select name="status" id="status" className="form-control"  value={status} onChange={(e)=> setStatus(e.target.value)}>
          <option value={1}>Online</option>
          <option value={2}>Offline</option>
        </select>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-success">
          <i className="fa fa-save" aria-hidden="true" /> Lưu cấu hình
        </button>
      </div>
    </form>
  </section>
</div>

     );
}
const mapStateToProps = state => {
    return {
      User: state._todoUser.user,
    }
  }
  
export default connect(mapStateToProps)(Config);
 

