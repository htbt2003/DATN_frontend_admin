import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import { MdHome, MdOutlineShoppingCart, MdBarChart, MdPerson, MdLock } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Links from "./components/Links";
import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "router/RouterPrivate";
import { FaChartBar, FaChartLine, FaGlassMartiniAlt  } from "react-icons/fa";
const Sidebar = ({ open, onClose }) => {
  let location = useLocation();
  const [SanPham, setSanPham] = useState(false);
  const [QLBH, setQLBH] = useState(false);
  const [BaiViet, setBaiViet] = useState(false);
  const [GiaoDien, setGiaoDien] = useState(false);
  const [HeThong, setHeThong] = useState(false);
  const activeRoute = (routeName) => {
    return location.pathname === routeName;
  };
  return (
    <div
      className={` sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
        }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Bao <span className="font-medium">Tran</span>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1 max-h-[600px] overflow-y-auto">
        <Link className="relative mb-3 flex hover:cursor-pointer" to={'/admin'}>
          <li className="my-[3px] flex cursor-pointer items-center px-8">
            <span className={`${activeRoute('/admin') ? "font-bold text-brand-500 dark:text-white" : "font-medium text-gray-600"}`}>
              <MdHome size='23' />
            </span>
            <p className={`leading-1 ml-4 flex ${activeRoute('/admin') ? "font-bold text-navy-700 dark:text-white" : "font-medium text-gray-600"}`}>Bảng điều khiển</p>
            {activeRoute('/admin') && (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            )}
          </li>
        </Link>

        <div className="relative mb-3 hover:cursor-pointer" >
          <li className="my-[3px] cursor-pointer items-center px-8">
              <div className="flex items-center justify-between" onClick={() => setSanPham(prevState => !prevState)}>
                <span className={`${SanPham ? "font-bold text-brand-500 dark:text-white" : "font-medium text-gray-600"}`}>
                  <MdOutlineShoppingCart size='23' />
                </span>
                <p className={`leading-1 ml-4 flex ${SanPham ? "font-bold text-navy-700 dark:text-white" : "font-medium text-gray-600"}`}>Sản phẩm</p>
                {SanPham ? (
                  <svg
                    data-accordion-icon=""
                    className="w-3 h-3 shrink-0 ml-auto font-bold text-navy-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ transition: 'transform 0.4s ease-in-out', transform: 'rotate(180deg)' }}
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                  </svg>
                ) : (
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0 ml-auto text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ transition: 'transform 0.3s ease-in-out', transform: 'rotate(0deg)' }}
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                  </svg>
                )}
              {/* </div> */}
            </div>
            <ul className={`mb-auto pt-1 ${SanPham ? 'max-h-[500px] transition-max-h duration-700 ease-in-out' : 'max-h-0 overflow-hidden transition-max-h duration-700 ease-in-out'}`}>
              <Links routes={routes} parent={'sanpham'}/>
            </ul>
          </li>
        </div>
        <div className="relative mb-3 hover:cursor-pointer" >
          <li className="my-[3px] cursor-pointer items-center px-8">
              <div className="flex items-center justify-between" onClick={() => setQLBH(prevState => !prevState)}>
                <span className={`${QLBH ? "font-bold text-brand-500 dark:text-white" : "font-medium text-gray-600"}`}>
                  <MdBarChart size='23' />
                </span>
                <p className={`leading-1 ml-4 flex ${QLBH ? "font-bold text-navy-700 dark:text-white" : "font-medium text-gray-600"}`}>Quản lý bán hàng</p>
                {QLBH ? (
                  <svg
                    data-accordion-icon=""
                    className="w-3 h-3 shrink-0 ml-auto font-bold text-navy-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ transition: 'transform 0.4s ease-in-out', transform: 'rotate(180deg)' }}
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                  </svg>
                ) : (
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0 ml-auto text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ transition: 'transform 0.3s ease-in-out', transform: 'rotate(0deg)' }}
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                  </svg>
                )}
              {/* </div> */}
            </div>
            <ul className={`mb-auto pt-1 ${QLBH ? 'max-h-[500px] transition-max-h duration-700 ease-in-out' : 'max-h-0 overflow-hidden transition-max-h duration-700 ease-in-out'}`}>
              <Links routes={routes} parent={'QLBH'} />
            </ul>
          </li>
        </div>
        <Link className="relative mb-3 flex hover:cursor-pointer" to={'/admin/customer'}>
          <li className="my-[3px] flex cursor-pointer items-center px-8">
            <span className={`${activeRoute('/admin/customer') ? "font-bold text-brand-500 dark:text-white" : "font-medium text-gray-600"}`}>
              <FaChartBar size='23' />
            </span>
            <p className={`leading-1 ml-4 flex ${activeRoute('/admin/customer') ? "font-bold text-navy-700 dark:text-white" : "font-medium text-gray-600"}`}>Khách hàng</p>
            {activeRoute('/admin/customer') && (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            )}
          </li>
        </Link>
        <Link className="relative mb-3 flex hover:cursor-pointer" to={'/admin/contact'}>
          <li className="my-[3px] flex cursor-pointer items-center px-8">
            <span className={`${activeRoute('/admin/contact') ? "font-bold text-brand-500 dark:text-white" : "font-medium text-gray-600"}`}>
              <FaChartLine size='23' />
            </span>
            <p className={`leading-1 ml-4 flex ${activeRoute('/admin/contact') ? "font-bold text-navy-700 dark:text-white" : "font-medium text-gray-600"}`}>Liên hệ</p>
            {activeRoute('/admin/contact') && (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            )}
          </li>
        </Link>

        <div className="relative mb-3 hover:cursor-pointer" >
          <li className="my-[3px] cursor-pointer items-center px-8">
              <div className="flex items-center justify-between" onClick={() => setBaiViet(prevState => !prevState)}>
                <span className={`${BaiViet ? "font-bold text-brand-500 dark:text-white" : "font-medium text-gray-600"}`}>
                  <FaGlassMartiniAlt size='23' />
                </span>
                <p className={`leading-1 ml-4 flex ${BaiViet ? "font-bold text-navy-700 dark:text-white" : "font-medium text-gray-600"}`}>Bài viết</p>
                {BaiViet ? (
                  <svg
                    data-accordion-icon=""
                    className="w-3 h-3 shrink-0 ml-auto font-bold text-navy-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ transition: 'transform 0.4s ease-in-out', transform: 'rotate(180deg)' }}
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                  </svg>
                ) : (
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0 ml-auto text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ transition: 'transform 0.3s ease-in-out', transform: 'rotate(0deg)' }}
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                  </svg>
                )}
              {/* </div> */}
            </div>
            <ul className={`mb-auto pt-1 ${BaiViet ? 'max-h-[500px] transition-max-h duration-700 ease-in-out' : 'max-h-0 overflow-hidden transition-max-h duration-700 ease-in-out'}`}>
              <Links routes={routes} parent={'baiviet'} />
            </ul>
          </li>
        </div>

        <div className="relative mb-3 hover:cursor-pointer" >
          <li className="my-[3px] cursor-pointer items-center px-8">
              <div className="flex items-center justify-between" onClick={() => setGiaoDien(prevState => !prevState)}>
                <span className={`${GiaoDien ? "font-bold text-brand-500 dark:text-white" : "font-medium text-gray-600"}`}>
                  <MdLock size='23' />
                </span>
                <p className={`leading-1 ml-4 flex ${GiaoDien ? "font-bold text-navy-700 dark:text-white" : "font-medium text-gray-600"}`}>Giao diện</p>
                {GiaoDien ? (
                  <svg
                    data-accordion-icon=""
                    className="w-3 h-3 shrink-0 ml-auto font-bold text-navy-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ transition: 'transform 0.4s ease-in-out', transform: 'rotate(180deg)' }}
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                  </svg>
                ) : (
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0 ml-auto text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ transition: 'transform 0.3s ease-in-out', transform: 'rotate(0deg)' }}
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                  </svg>
                )}
              {/* </div> */}
            </div>
            <ul className={`mb-auto pt-1 ${GiaoDien ? 'max-h-[500px] transition-max-h duration-700 ease-in-out' : 'max-h-0 overflow-hidden transition-max-h duration-700 ease-in-out'}`}>
              <Links routes={routes} parent={'giaodien'} />
            </ul>
          </li>
        </div>

        <div className="relative mb-3 hover:cursor-pointer" >
          <li className="my-[3px] cursor-pointer items-center px-8">
              <div className="flex items-center justify-between" onClick={() => setHeThong(prevState => !prevState)}>
                <span className={`${HeThong ? "font-bold text-brand-500 dark:text-white" : "font-medium text-gray-600"}`}>
                  <MdPerson size='23' />
                </span>
                <p className={`leading-1 ml-4 flex ${HeThong ? "font-bold text-navy-700 dark:text-white" : "font-medium text-gray-600"}`}>Hệ thống</p>
                {HeThong ? (
                  <svg
                    data-accordion-icon=""
                    className="w-3 h-3 shrink-0 ml-auto font-bold text-navy-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ transition: 'transform 0.4s ease-in-out', transform: 'rotate(180deg)' }}
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                  </svg>
                ) : (
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0 ml-auto text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ transition: 'transform 0.3s ease-in-out', transform: 'rotate(0deg)' }}
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                  </svg>
                )}
              {/* </div> */}
            </div>
            <ul className={`mb-auto pt-1 ${HeThong ? 'max-h-[500px] transition-max-h duration-700 ease-in-out' : 'max-h-0 overflow-hidden transition-max-h duration-700 ease-in-out'}`}>
              <Links routes={routes} parent={'hethong'} />
            </ul>
          </li>
        </div>

      </ul>


      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
