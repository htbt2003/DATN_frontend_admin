import Dashboard from "../views/admin/Dashboard";

import BrandList from '../views/admin/Brand/BrandList';
import BrandTrashList from '../views/admin/Brand/BrandTrashList';
import BrandShow from '../views/admin/Brand/BrandShow';
import BrandCreate from '../views/admin/Brand/BrandCreate';
import BrandUpdate from '../views/admin/Brand/BrandUpdate';

import CategoryList from '../views/admin/Category/CategoryList';
import CategoryShow from '../views/admin/Category/CategoryShow';
import CategoryCreate from '../views/admin/Category/CategoryCreate';
import CategoryUpdate from '../views/admin/Category/CategoryUpdate';

import ProductList from '../views/admin/Product/ProductList';
// import ProductShow from '../views/admin/Product/ProductShow';
import ProductCreate from '../views/admin/Product/ProductCreate';
import ProductUpdate from '../views/admin/Product/ProductUpdate';

import ContactList from '../views/admin/Contact/ContactList';
import ContactShow from '../views/admin/Contact/ContactShow';
import ContactUpdate from '../views/admin/Contact/ContactUpdate';

import MenuList from '../views/admin/Menu/MenuList';
import MenuShow from '../views/admin/Menu/MenuShow';
import MenuCreate from '../views/admin/Menu/MenuCreate';
import MenuUpdate from '../views/admin/Menu/MenuUpdate';

import OrderList from '../views/admin/Order/OrderList';
import OrderShow from '../views/admin/Order/OrderShow';
import OrderUpdate from '../views/admin/Order/OrderUpdate';

import PostList from '../views/admin/Post/PostList';
import PostShow from '../views/admin/Post/PostShow';
import PostCreate from '../views/admin/Post/PostCreate';
import PostUpdate from '../views/admin/Post/PostUpdate';

import PageList from '../views/admin/Page/PageList';
import PageShow from '../views/admin/Page/PageShow';
import PageCreate from '../views/admin/Page/PageCreate';
import PageUpdate from '../views/admin/Page/PageUpdate';

import BannerList from '../views/admin/Banner/BannerList';
import BannerShow from '../views/admin/Banner/BannerShow';
import BannerCreate from '../views/admin/Banner/BannerCreate';
import BannerUpdate from '../views/admin/Banner/BannerUpdate';

import TopicList from '../views/admin/Topic/TopicList';
import TopicShow from '../views/admin/Topic/TopicShow';
import TopicCreate from '../views/admin/Topic/TopicCreate';
import TopicUpdate from '../views/admin/Topic/TopicUpdate';

import UserList from '../views/admin/User/UserList';
import UserShow from '../views/admin/User/UserShow';
import UserCreate from '../views/admin/User/UserCreate';
import UserUpdate from '../views/admin/User/UserUpdate';

import CustomerList from '../views/admin/Customer/CustomerList';
import CustomerShow from '../views/admin/Customer/CustomerShow';
import CustomerCreate from '../views/admin/Customer/CustomerCreate';
import CustomerUpdate from '../views/admin/Customer/CustomerUpdate';

import ContactResponse from "../views/admin/Contact/ContactResponse";

import Config from '../views/admin/Config';

import CustomerTrashList from "../views/admin/Customer/CustomerTrashList";
import CategoryTrashList from "../views/admin/Category/CategoryTrashList";
import ProductTrashList from "../views/admin/Product/ProductTrashList";
import ContactTrashList from "../views/admin/Contact/ContactTrashList";
import MenuTrashList from "../views/admin/Menu/MenuTrashList";
import OrderTrashList from "../views/admin/Order/OrderTrashList";
import PostTrashList from "../views/admin/Post/PostTrashList";
import PageTrashList from "../views/admin/Page/PageTrashList";
import BannerTrashList from "../views/admin/Banner/BannerTrashList";
import TopicTrashList from "../views/admin/Topic/TopicTrashList";
import UserTrashList from "../views/admin/User/UserTrashList";
import ProductStoreList from "../views/admin/ProductStore/ProductStoreList";
import PromotionList from "../views/admin/ProductSale/PromotionList";
import ProductDelivery from "../views/admin/ProductDelivery/ProductDelivery";
import ImportInvoiceList from "views/admin/ImportInvoice.jsx/ImportInvoiceList";
import ImportInvoiceCreate from "views/admin/ImportInvoice.jsx/ImportInvoiceCreate";
import ImportInvoiceUpdate from "views/admin/ImportInvoice.jsx/ImportInvoiceUpdate";
import PromotionCreate from "views/admin/ProductSale/PromotionCreate";
import PromotionUpdate from "views/admin/ProductSale/PromotionUpdate";
import AttributeList from "views/admin/Attribute/AttributeList";
import AttributeTrashList from "views/admin/Attribute/AttributeTrashList";
import AttributeValueList from "views/admin/AttributeValue/AttributeValueList";

const RouterPrivate = [
  { path: "/admin", component: Dashboard, name:'Dashboard' },

  { path: "/admin/config", component: Config, name:'Cấu hình', parent:'hethong' },

  { path: "/admin/brand", component: BrandList, name:'Thương hiệu', parent:'sanpham' },
  { path: "/admin/brand/trash", component: BrandTrashList },
  { path: "/admin/brand/show/:id", component: BrandShow },
  { path: "/admin/brand/create", component: BrandCreate },
  { path: "/admin/brand/update/:id", component: BrandUpdate },

  { path: "/admin/category", component: CategoryList, name:'Danh mục', parent:'sanpham' },
  { path: "/admin/category/trash", component: CategoryTrashList },
  { path: "/admin/category/show/:id", component: CategoryShow },
  { path: "/admin/category/create", component: CategoryCreate },
  { path: "/admin/category/update/:id", component: CategoryUpdate },

  { path: "/admin/product", component: ProductList, name:'Danh sách sản phẩm', parent:'sanpham' },
  { path: "/admin/product/trash", component: ProductTrashList },
  // { path: "/admin/product/show/:id", component: ProductShow },
  { path: "/admin/product/create", component: ProductCreate },
  { path: "/admin/product/update/:id", component: ProductUpdate },

{ path: "/admin/ProductStore", component:ProductStoreList, name:'Kho hàng', parent:'sanpham' },

{ path: "/admin/promotion", component: PromotionList, name:'Khuyến mãi', parent:'sanpham' },
{ path: "/admin/promotion/create", component: PromotionCreate},
{ path: "/admin/promotion/update/:id", component: PromotionUpdate},

{ path: "/admin/importInvoice", component: ImportInvoiceList, name:'Nhập hàng', parent:'sanpham' },
{ path: "/admin/importInvoice/create", component: ImportInvoiceCreate, },
{ path: "/admin/importInvoice/update/:id", component: ImportInvoiceUpdate, },

  { path: "/admin/contact", component: ContactList },
  { path: "/admin/contact/trash", component: ContactTrashList },
  { path: "/admin/contact/show/:id", component: ContactShow },
//   { path: "/admin/contact/response/:id", component: ContactResponse },


  { path: "/admin/menu", component: MenuList, name:'Menu', parent:'giaodien' },
  { path: "/admin/menu/trash", component: MenuTrashList },
  { path: "/admin/menu/show/:id", component: MenuShow },
  { path: "/admin/menu/create", component: MenuCreate },
  { path: "/admin/menu/update/:id", component: MenuUpdate },

  { path: "/admin/order", component: OrderList, name:'Hóa đơn', parent:'QLBH' },
  { path: "/admin/order/trash", component: OrderTrashList },
  { path: "/admin/order/show", component: OrderShow },
  { path: "/admin/order/update/:id", component: OrderUpdate },

  { path: "/admin/post", component: PostList, name:'Bài viết', parent:'baiviet' },
  { path: "/admin/post/trash", component: PostTrashList },
  { path: "/admin/post/show/:id", component: PostShow },
  { path: "/admin/post/create", component: PostCreate },
  { path: "/admin/post/update/:id", component: PostUpdate },

  { path: "/admin/page", component: PageList, name:'Trang đơn', parent:'baiviet' },
  { path: "/admin/page/trash", component: PageTrashList },
  { path: "/admin/page/show/:id", component: PageShow },
  { path: "/admin/page/create", component: PageCreate },
  { path: "/admin/page/update/:id", component: PageUpdate },

  { path: "/admin/banner", component: BannerList, name:'Banner', parent:'giaodien' },
  { path: "/admin/banner/trash", component: BannerTrashList },
  { path: "/admin/banner/show/:id", component: BannerShow },
  { path: "/admin/banner/create", component: BannerCreate },
  { path: "/admin/banner/update/:id", component: BannerUpdate },
  
    { path: "/admin/topic", component: TopicList, name:'Chủ đề', parent:'baiviet' },
    { path: "/admin/topic/trash", component: TopicTrashList },
  { path: "/admin/topic/show/:id", component: TopicShow },
  { path: "/admin/topic/create", component: TopicCreate },
  { path: "/admin/topic/update/:id", component: TopicUpdate },

  { path: "/admin/user", component: UserList, name:'Thành viên', parent:'hethong' },
  { path: "/admin/user/trash", component: UserTrashList },
  { path: "/admin/user/show/:id", component: UserShow },
  { path: "/admin/user/create", component: UserCreate },
  { path: "/admin/user/update/:id", component: UserUpdate },
  
  // { path: "/admin/config", component: Config },

  { path: "/admin/customer", component: CustomerList, name:'khachhang' },
  { path: "/admin/customer/show/:id", component: CustomerShow },
  { path: "/admin/customer/create", component: CustomerCreate },
  { path: "/admin/customer/update/:id", component: CustomerUpdate },
  { path: "/admin/customer/trash", component: CustomerTrashList },

  { path: "/admin/delivery", component: ProductDelivery, name:'Xuất hàng', parent:'QLBH' },

  { path: "/admin/attribute", component: AttributeList, name:'Thuộc tính', parent:'sanpham' },
  // { path: "/admin/customer/show/:id", component: CustomerShow },
  // { path: "/admin/customer/create", component: CustomerCreate },
  // { path: "/admin/customer/update/:id", component: CustomerUpdate },
  { path: "/admin/attribute/trash", component: AttributeTrashList },

  { path: "/admin/attributeValue/:id", component: AttributeValueList},


  
];
export default RouterPrivate;
