import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import OrderServices from "../../../services/OrderServices"
import { urlImage } from "../../../config";

function OrderShow() {
    // const navigator = useNavigate();
    // const {id} = useParams();
    // const [order, setOrder] = useState([])
    // const [products, setProduct] = useState([])
    // let total = 0
    // useEffect (function(){
    //       (async function(){
    //         await OrderServices.getById(id)
    //         .then(function(result){
    //             setOrder(result.data.order)
    //             setProduct(result.data.products)
    //         });
    //       })();
    // },[]);
    // console.log(products)
    // async function OrderDelete(id)
    // {
    //   await OrderServices.remove(id)
    //         .then(function(result){
    //             alert(result.data.message)
    //             navigator("/admin/order", {replace:true})
    //         });
    // }
    return (
      <>
    <div>
      <div className="page-header">
        <div className='row'>
          <h1 className='ml-4 mr-3'>Chi tiết đơn hàng</h1>
        </div>
        {/* <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="!#" onClick={event => event.preventDefault()}>Tất cả()</Link></li>
            <li className="breadcrumb-item active" aria-current="page" >Xuất bản()</li>
            <li className="breadcrumb-item active" aria-current="page">Rác()</li>
          </ol>
        </nav> */}
      </div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="text-danger text-uppercase">
                Thông tin đơn hàng
              </strong>
            </div>
            <div className="col-6 text-end">
                <Link to="/admin/order" className="btn btn-info btn-sm me-2">
                    <FaPlus/> Về danh sách
                </Link>
                <Link className="btn btn-sm btn-primary me-1" to={"/admin/order/update"}>
                      <FaEdit/>Sửa
                </Link>
                <button  className="btn btn-sm btn-danger">
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
                      <th className="text-center">Mã hóa đơn</th>
                      <td>sgrg</td>
                    </tr>
                    <tr>
                      <th className="text-center">Tên hóa đơn</th>
                      <td>ẻtrrtg</td>
                    </tr>
                    <tr>
                      <th className="text-center">Điện thoại</th>
                      <td>fgtgr</td>
                    </tr>
                    <tr>
                      <th className="text-center">Email</th>
                      <td>rgrt</td>
                    </tr>
                    <tr>
                      <th className="text-center">Đại chỉ</th>
                      <td>gfth</td>
                    </tr>
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div className="card mt-3">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="text-danger text-uppercase">
                Chi tiết giỏ hàng
              </strong>
            </div>
          </div>
        </div>

        <div className='m-3'>
        <div className="row">
            <div className="col-md-12">
            <table className="table ">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Hình</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                {/* {
                    products.map((item,key)=>{
                       total += item.price*item.quantity
                        return(
                            <tr key={key}>   
                            <td>{item.name}</td>
                            <td><img src={urlImage + "product/" + item.image} style={{width:'100px',height:'80px'}}/></td>
                            <td>{(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </td>
                            <td>
                                    <span className="btn btn-info">{item.quantity}</span>
                            </td>
                            <td>{ (item.price*item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }</td>
                        </tr>
                        )
                    })
                } */}
                                            <tr >   
                            <td>dgf</td>
                            <td><img src="" style={{width:'100px',height:'80px'}}/></td>
                            <td>{("fdg").toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </td>
                            <td>
                                    <span className="btn btn-info">fgf</span>
                            </td>
                            <td>{ ("gjg").toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }</td>
                        </tr>

                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>Tổng hóa đơn</strong></td>
                    <td>{2353}</td>
                </tr>
                </tbody>
               
            </table>
            </div>
        </div>
    </div>

    </div>

    </div>

    </>
    );
}

export default OrderShow;