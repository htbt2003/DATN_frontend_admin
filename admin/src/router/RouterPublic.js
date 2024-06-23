import Search from "../pages/frontend/Search";
import Cart from "../pages/frontend/Cart";
import checkout from "../pages/frontend/Cart/checkout";
// import confirm from "../pages/frontend/Cart/confirm";
import Contact from "../pages/frontend/Contact";
import Home from "../pages/frontend/Home";
import Post from "../pages/frontend/Post";
import PostDetail from "../pages/frontend/Post/PostDetail";
import PageDetail from "../pages/frontend/Post/PageDetail";
import PostTopic from "../pages/frontend/Post/PostTopic";
import Product from "../pages/frontend/Product";
import ProductDetail from "../pages/frontend/Product/ProductDetail";
import ProductBrand from "../pages/frontend/Product/ProductBrand";
import ProductCategory from "../pages/frontend/Product/ProductCategory";
import Account from "../pages/frontend/Account";

const RouterPublic = [
    {path:'/',component:Home},
    {path:'/san-pham',component:Product},
    {path:'/bai-viet',component:Post},
    {path:'/chi-tiet-san-pham/:slug',component:ProductDetail},
    {path:'/danh-muc-san-pham/:slug',component:ProductCategory},
    {path:'/chu-de-bai-viet/:slug',component:PostTopic},
    {path:'/thuong-hieu/:slug',component:ProductBrand},
    {path:'/chi-tiet-bai-viet/:slug',component:PostDetail},
    {path:'/trang-don/:slug',component:PageDetail},
    {path:'/lien-he',component:Contact},
    {path:'/tim-kiem/:key?',component:Search},
    {path:'/gio-hang',component:Cart},
    {path:'/thanh-toan',component:checkout},
    {path:'/tai-khoan',component:Account},

];

export default RouterPublic;