import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuServices from '../../../services/MenuServices';
import MenuCategoryCreate from './MenuCategoryCreate';
import MenuBrandCreate from './MenuBrandCreate';
import MenuTopicCreate from './MenuTopicCreate';
import MenuPageCreate from './MenuPageCreate';
import MenuCreateTuy from './MenuCreateTuy';

function MenuCreate() {
    const [position, setPosition] = useState("");
    const [typeMenu, setTypeMenu] = useState("0");

    const renderMenu = () => {
        switch (typeMenu) {
            case '0':
                return <MenuCategoryCreate position={position} />;
            case '1':
                return <MenuBrandCreate position={position} />;
            case '2':
                return <MenuTopicCreate position={position} />;
            case '3':
                return <MenuPageCreate position={position} />;
            case '4':
                return <MenuCreateTuy position={position} />;
            default:
                return null;
        }
    }

    return (
        <div>
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="inline-block text-3xl text-navy-700 dark:text-white">Tạo menu</h1>
                    <div className="mt-1 text-right">
                        <Link className="linear mb-4 rounded bg-brand-500 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" to={"/admin/product"}>
                            <i className="fa fa-arrow-left" /> Về danh sách
                        </Link>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                        <div className="md:col-span-2">
                            <div className="bg-white p-5 rounded-xl">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        value="0"
                                         checked={typeMenu === "0"}
                                        onChange={(e) => setTypeMenu(e.target.value)}
                                    />
                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">Danh mục</label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input id="push-everything2"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="1" 
                                        checked={typeMenu === "1"}
                                        onChange={(e) => setTypeMenu(e.target.value)}
                                    />
                                    <label htmlFor="push-everything2" className="block text-sm font-medium leading-6 text-gray-900">Thương hiệu</label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input id="push-everything3"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="2" checked={typeMenu === "2"}
                                        onChange={(e) => setTypeMenu(e.target.value)}
                                    />
                                    <label htmlFor="push-everything3" className="block text-sm font-medium leading-6 text-gray-900">Chủ đề</label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input id="push-everything4"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="3" 
                                        checked={typeMenu === "3"}
                                        onChange={(e) => setTypeMenu(e.target.value)}
                                    />
                                    <label htmlFor="push-everything4" className="block text-sm font-medium leading-6 text-gray-900">Trang đơn</label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input id="push-everything5"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="4" 
                                        checked={typeMenu === "4"}
                                        onChange={(e) => setTypeMenu(e.target.value)}
                                    />
                                    <label htmlFor="push-everything5" className="block text-sm font-medium leading-6 text-gray-900">Tùy biến</label>
                                </div>

                            </div>
                        </div>
                        <div className="space-y-4 md:col-span-4">
                                <select
                                    name="postion"
                                    className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                >
                                    <option>Chọn vị trí đặt menu</option>
                                    <option value="mainmenu">Main Menu</option>
                                    <option value="footermenu">Footer Menu</option>
                                </select>

                            {renderMenu()}

                        </div>
                    </div>
                </section>
            </div>

            {/* <div className="">
                <ul className="list-group">
                    <li className="list-group-item mb-2">
                        <select
                            name="postion"
                            className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        >
                            <option>Chọn vị trí đặt menu</option>
                            <option value="mainmenu">Main Menu</option>
                            <option value="footermenu">Footer Menu</option>
                        </select>
                    </li>
                    {renderMenu()}
                </ul>
            </div> */}
        </div>

    );
}

export default MenuCreate;