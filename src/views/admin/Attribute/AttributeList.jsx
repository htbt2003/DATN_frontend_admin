import { Link } from 'react-router-dom';
import { FaEdit, FaPlus, FaRegEye, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import AttributeServices from '../../../services/AttributeServices';
import { urlImage } from '../../../config';
import { IoIosSearch } from "react-icons/io";
import Loading from '../../../Loading';
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from 'components/card';
import { IoToggle } from "react-icons/io5";
import { LiaToggleOffSolid } from "react-icons/lia";
import swal from 'sweetalert';
import { toast } from 'react-toastify';


function AttributeList() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [load, setLoad] = useState(false)
  const [reLoad, setReLoad] = useState();
  const [attributes, setAttributes] = useState([]);
  const [trash, setTrash] = useState();
  const [keySearch, setKeyearch] = useState("");
  const [selecteditems, setSelecteditems] = useState([]);
  const [action, setAction] = useState();

  const [name, setName] = useState("");

  document.title = "Danh sách thuộc tính";
  
  var condition = {
    keySearch: keySearch,
  }

  useEffect(function () {
    (async function () {
      setLoad(true)
      const result = await AttributeServices.getAll(page, condition);
      setAttributes(result.attributes.data)
      setTotal(result.total);
      setTrash(result.trash)
      setLoad(false)
    })();
  }, [reLoad, page])

  function AttributeStore(event) {
    event.preventDefault();//không load lại trang
    var banner = new FormData();
    banner.append("name", name)
    AttributeServices.create(banner)
      .then(function (result) {
        setName("")
        toast.success(result.message);
        setReLoad(Date.now)
      });
  }


  function itemDelete(id) {
    swal({
      title: "Cảnh báo",
      text: "Chuyển vào thùng rác?",
      icon: "warning",
      buttons: {
        cancel: "Không",
        confirm: {
          text: "Có",
          value: true,
          visible: true,
          className: "btn-delete",
          closeModal: true
        }
      }
    }).then(async (result) => {
      if (result) {
        try {
          const result = await AttributeServices.delete(id)
          setReLoad(id)
        }
        catch (error) {
          console.log(error)
        }
      }
    });
  }

  //restore---------------------
  function handleStatus(item) {
    swal({
      title: "Cảnh báo",
      text: item.status == 1 ? "Tạm thời ngưng hiển thị?" : "Mở đăng lại?",
      icon: "warning",
      buttons: {
        cancel: "Không",
        confirm: {
          text: "Có",
          value: true,
          visible: true,
          className: "btn-delete",
          closeModal: true
        }
      }
    }).then(async (result) => {
      if (result) {
        try {
          const result = await AttributeServices.changeStatus(item.id)
          setReLoad(Date.now)
        }
        catch (error) {
          console.log(error)
        }
      }
    });
  }
  //------------pagination-------------
  const numberPage = Math.ceil(total / 5);
  const handlePageChange = (event) => {
    setPage(event.selected + 1);
  };
  //chọn sản phẩm---------
  const handleCheckbox = (itemId) => {
    if (selecteditems.includes(itemId)) {
      setSelecteditems(prevSelected => prevSelected.filter(id => id !== itemId));
    } else {
      setSelecteditems(prevSelected => [...prevSelected, itemId]);
    }
  };
  //bỏ vào thùng rác--------------
  const handleAction = () => {
    const data = {
      listId: selecteditems
    }
    swal({
      title: "Cảnh báo",
      text: "Bạn có chắc muốn bỏ những mục này vào thùng rác?",
      icon: "warning",
      buttons: {
        cancel: "Không",
        confirm: {
          text: "Có",
          value: true,
          visible: true,
          className: "btn-delete",
          closeModal: true
        }
      }
    }).then(async (result) => {
      if (result) {
        if (action === "trash") {
          try {
            const result = await AttributeServices.action_trash(data);
            setReLoad(Date.now)
            console.log(true)
          }
          catch (error) {
            console.log(error)
          }
        }
      }
    });

  };
  //search enter------------------
  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      setReLoad(Date.now())
    }
  };
  //search time----------------
  let time;
  const handleChange = (event) => {
    setKeyearch(event.target.value);

    // clearTimeout(time);
    // time = setTimeout(setReLoad(Date.now()), 10000);
  };
  const RowMenu = ({ item, index }) => {
    return (
      <tr key={index} className="row group hover:bg-gray-100 dark:hover:bg-gray-800 relative ">
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2">
          <input
            type="checkbox"
            className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
     justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s]
     checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
            id={"attribute" + item.id}
            onChange={() => handleCheckbox(item.id)}
            checked={selecteditems.includes(item.id)}
          />
          <div className="flex  h-16 w-16 items-center justify-center rounded-xl">{item.name}</div>
        </td>
        <td className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white relative">
          <div className=''>
            <Link to={"/admin/attributeValue/" + item.id} className='text-[#078ae8]'>Cấu hình giá trị thuộc tính</Link>
            <div className="absolute top-200 right-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-wrap flex-row ml-2 mt-2">
              <button onClick={() => handleStatus(item)} className='mr-2'>
                {item.status === 1 ? <IoToggle color='green' /> : <LiaToggleOffSolid />}
              </button>
              {/* <Link to={"/admin/attribute/update/" + item.id} className="text-blue-500 mr-2">
                <FaEdit />
              </Link> */}
              <button href="#" className="text-[#ef4444]" onClick={() => itemDelete(item.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      {load ? (<Loading />) : (<></>)}
      <div className='mt-5'>
        <div className='flex flex-row flex-wrap items-center gap-2 mb-2'>
          <div className='flex flex-row flex-wrap'>
            <p className="shrink text-[33px]  text-navy-700 dark:text-white">
              <a className="font-bold  hover:text-navy-700 dark:hover:text-white" href="/admin/item">
                Danh sách thuộc tính
              </a>
            </p>
            <Link to={"/admin/attribute/create"}>
              <div className=" p-2 ml-4 btn-secondary border border-dark rounded mt-2 text-white flex h-9 items-center justify-center rounded-xl border p-2 text-sm outline-none bg-brand-500" style={{ background: "" }}><FaPlus className='mr-1' />Thêm mới</div>
            </Link>
          </div>
          <div className='ml-auto items-center justify-center'>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb flex" >
                <li className="breadcrumb-item mr-4 text-blue-500"><Link to="/admin/attribute">Tất cả({total})</Link></li>
                {/* <li className="breadcrumb-item mr-4 " aria-current="page" >Xuất bản({publish})</li> */}
                <li className="breadcrumb-item text-blue-500" aria-current="page"><Link to="/admin/attribute/trash">Rác({trash})</Link></li>
              </ol>
            </nav>
          </div>
        </div>
        <div className='flex flex-row flex-wrap mb-5 items-center'>
          <div className='flex'>
            <div className="mr-2 ">
              <select name="" className="focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border border-dark rounded mt-2 flex h-9 w-full items-center justify-center rounded-xl border p-2 text-sm outline-none" onChange={(e) => setAction(e.target.value)}>
                <option value="">Hành động</option>
                <option value="trash">Bỏ vào thùng rác</option>
              </select>
            </div>
            {
              (action != null && selecteditems.length > 0) ?
                (
                  <div className=" p-2 mr-4 btn-secondary border border-dark rounded mt-2 flex h-9 items-center justify-center rounded-xl border p-2 text-sm outline-none hover:cursor-pointer" style={{ background: "#bfbfbf" }} onClick={() => handleAction()}>Áp dụng</div>
                ) :
                (
                  <div className=" p-2 mr-4 btn-secondary border border-dark rounded mt-2 flex h-9 items-center justify-center rounded-xl border p-2 text-sm outline-none hover:cursor-pointer" style={{ background: "#bfbfbf", opacity: 0.3 }} >Áp dụng</div>
                )
            }
          </div>
          <div className="relative mt-[3px] h-[50px] xl:w-[325px] items-center justify-around rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0  ml-auto">
            <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700  ">
              <p className="pl-3 pr-2 text-xl">
                <IoIosSearch className="h-4 w-4 text-gray-400 dark:text-white" onClick={() => setReLoad(Date.now())} />
              </p>
              <input
                type="text"
                placeholder="Search..."
                class="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
                onChange={handleChange}
                onKeyDown={handleKeyEnter}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className="md:col-span-2">
          <div className="bg-white p-5 rounded-xl">
            <strong className='text-[20px]'>Thêm thuộc tính</strong>
            <div className="mb-3 mt-5">
              <label>
                <strong>Tên (*)</strong>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                placeholder="Nhập tên"
              />
            </div>
            <div className="text-right px-2 py-2">
              <button onClick={AttributeStore} className="linear rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                <i className="fa fa-save" aria-hidden="true" /> Lưu
              </button>
            </div>
          </div>
          </div>
          <div className="md:col-span-2">
            <Card extra={"w-full h-full sm:overflow-auto p-6"}>
              <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
                <table
                  className="w-full"
                  variant="simple"
                  color="gray-500"
                  mb="24px"
                >
                  <thead>
                    <tr>
                      <th className="border-b flex items-center gap-2 border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                        <input
                          type="checkbox"
                          className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
      justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s]
      checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
                          name="weekly"
                        />
                        <div className="text-lg font-bold tracking-wide lg:text-lg">
                          Tên
                        </div>
                      </th>
                      <th className="border-b border-gray-200 pr-6 pb-[10px] text-start dark:!border-navy-700">
                        <div className="text-lg font-bold tracking-wide lg:text-lg">
                          Cấu hình
                        </div>
                      </th>
                    </tr>

                  </thead>
                  <tbody>
                    {attributes && attributes.length > 0 && attributes.map((item, index) => {
                      return (
                        <RowMenu item={item} index={index} />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
            <ReactPaginate
              className="flex justify-end items-center mt-3"
              previousLabel={
                <div className="flex ml-1 pt-2 pb-2 text-brand-500">
                  <FaChevronLeft size="0.6rem" />
                  <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
                </div>
              }
              nextLabel={
                <div className="flex ml-1 pt-2 pb-2 text-brand-500">
                  <FaChevronRight size="0.6rem" />
                  <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
                </div>
              }
              pageCount={numberPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              pageClassName="inline-block mx-1"
              pageLinkClassName="block px-3 py-2 rounded-lg text-brand-500 bg-white"
              previousClassName="inline-block mx-1"
              previousLinkClassName="block px-3 py-2 rounded-lg bg-white text-black"
              nextClassName="inline-block mx-1"
              nextLinkClassName="block px-3 py-2 rounded-lg bg-white text-black"
              activeClassName="activePagination"
              renderOnZeroPageCount={null}
            />

          </div>
        </div>
      </div>
    </>

  );

}

export default AttributeList;