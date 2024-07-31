import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductServices from '../../../services/ProductServices';
import AttributeServices from '../../../services/AttributeServices';
import BrandServices from '../../../services/BrandServices';
import CategoryServices from '../../../services/CategoryServices';
import TinyMCE from 'components/tiny';
import ProductAttributeUpdate from './ProductAttributeUpdate';
import ProductVariantUpdate from './ProductVariantUpdate';
import { toast } from 'react-toastify';
import { urlImage } from 'config';
import { useSelector } from 'react-redux';

function ProductCreate() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const navigator = useNavigate();
  const [category_id, setCategoryId] = useState(0);
  const [brand_id, setBrandId] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [detail, setDetail] = useState("");
  const [metakey, setMetakey] = useState("");
  const [metadesc, setMetadesc] = useState("");
  const [status, setStatus] = useState(1);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  document.title = name;

  const [variants, setVariants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isVariant, setIsVariant] = useState('0');
  const [product1, setProduct1] = useState([]);
  const [optionAttrs, setOptionAttrs] = useState([]);
  const [attributeDelete, setAttributeDelete] = useState([]);
  const [attributeValueUpdate, setAttributeValueUpdate] = useState([]);
  const [attributeValueDelete, setAttributeValueDelete] = useState([]);

  const fetchAPI = async () => {
    try {
      const result = await BrandServices.getAll();
      setBrands(result.brandsAll);

      const result2 = await CategoryServices.getAll();
      setCategories(result2.categoriesAll);

      const result3 = await AttributeServices.getAll();
      setAttributes(result3.attributesAll);

      const resultPro = await ProductServices.getById(id)
      const tmp = resultPro.product;
      // console.log(resultPro.product)
      setCategoryId(tmp.category_id);
      setBrandId(tmp.brand_id);
      setName(tmp.name);
      setPrice(tmp.price);
      setDetail(tmp.detail);
      setMetakey(tmp.metakey);
      setMetadesc(tmp.metadesc);
      setStatus(tmp.status);
      setImages(tmp.images)
      setVariants(resultPro.product.variants)
      // console.log(resultPro.product)

      if (resultPro.product.productattributes.length > 0) {
        //set option attribute
        const tempOptionAttrs = [];
        resultPro.product.productattributes.forEach((item) => {
          const values = item.product_attribute_values.map((itemVal) => ({
            id: itemVal.id,
            attribute_value_id: itemVal.attribute_value_id,
          }));
          tempOptionAttrs.push({
            id: item.id,
            attribute: item.attribute,
            values: values,
          });
        });
        setOptionAttrs([...optionAttrs, ...tempOptionAttrs]);
        setIsVariant('1');
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(function () {
    fetchAPI()
  }, []);
  //create product
  async function ProductStore(event) {
    event.preventDefault(); // Prevent page reload
    const product = new FormData();
    product.append('category_id', category_id);
    product.append('brand_id', brand_id);
    product.append('name', name);
    product.append('price', price);
    product.append('detail', detail);
    product.append('metakey', metakey);
    product.append('metadesc', metadesc);
    product.append('status', status);
    product.append('image', images[0]);
    product.append('isVariant', isVariant);

    newImages.forEach((image) => {
      product.append('imageNews[]', image);
    });
    deleteImages.forEach((image) => {
      product.append(`imageDeletes[]`, image.id);
    });

    if (isVariant == 1) {
      attributeDelete.forEach((id) => {
        product.append(`attributeDelete[]`, id);
      });
      attributeValueDelete.forEach((id) => {
        product.append(`attributeValueDelete[]`, id);
      });
      optionAttrs.forEach((optionAttr, index) => {
        if (optionAttr.type) {
          product.append(`optionAttrs[${index}][attribute_id]`, optionAttr.attribute.id);
          optionAttr.values.forEach((val, valIndex) => {
            product.append(`optionAttrs[${index}][values][${valIndex}][attribute_value_id]`, val.attribute_value_id);
            if (val.image) {
              product.append(`optionAttrs[${index}][values][${valIndex}][image]`, val.image);
            }
          });
        } else {
          if (optionAttr.id) {
            // Thêm giá trị mới
            optionAttr.values.forEach((value, valIndex) => {
              if (value.type === 'add') {
                product.append(`attributeValueAdd[${valIndex}][product_attribute_id]`, optionAttr.id);
                product.append(`attributeValueAdd[${valIndex}][attribute_value_id]`, value.attribute_value_id);
                if (value.image) {
                  product.append(`attributeValueAdd[${index}][${valIndex}][image]`, value.image);
                }
              }
            });
      
            // Cập nhật giá trị
            optionAttr.values.forEach((value, valIndex) => {
              if (value.type === 'update') {
                product.append(`attributeValueUpdate[${valIndex}][id]`, value.id);
                product.append(`attributeValueUpdate[${valIndex}][attribute_value_id]`, value.attribute_value_id);
              }
              if (value.image) {
                product.append(`attributeValueUpdate[${valIndex}][image]`, value.image);
              }
            });
          }
        }
      });
      const result = await ProductServices.update(product, id)
      toast.success(result.message);
      setProduct1(result.product);
      setShowModal(true);
      
    }
    else {
      const result = await ProductServices.update(product, id)
      toast.success(result.message);
      navigator("/admin/product", { replace: true })
    }
    // ProductServices.update(product, id)
    //   .then(function (result) {
    //     alert(result.message);
    //     // navigator("/admin/product", { replace: true })
    //   });

    const formDataObj = {};
    product.forEach((value, key) => {
      formDataObj[key] = value;
    });
    const jsonData = JSON.stringify(formDataObj);
    console.log(jsonData);
  }
  /// Image file handler
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };
  const handleRemoveImage = (index, isNewImage) => {
    if (isNewImage) {
      setNewImages((prevNewImages) => {
        const updatedNewImages = [...prevNewImages];
        URL.revokeObjectURL(updatedNewImages[index]);
        updatedNewImages.splice(index, 1);
        return updatedNewImages;
      });
    } else {
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        const imageDelete = updatedImages[index];
        setDeleteImages((prevDeleteImages) => [...prevDeleteImages, imageDelete]);
        updatedImages.splice(index, 1);
        return updatedImages;
      });
    }
  };

  // Handle name change
  const handleNameChange = (index, e) => {
    const newVariants = [...variants];
    newVariants[index].name = e.target.value;
    newVariants[index] = { ...newVariants[index], update: true };
    setVariants(newVariants);
  };

  // Handle price change
  const handlePriceChange = (index, e) => {
    const newVariants = [...variants];
    newVariants[index].price = e.target.value;
    newVariants[index] = { ...newVariants[index], update: true };
    setVariants(newVariants);
  };

  // Handle SKU change
  const handleSKUChange = (index, e) => {
    const newVariants = [...variants];
    newVariants[index].SKU = e.target.value;
    newVariants[index] = { ...newVariants[index], update: true };
    setVariants(newVariants);
  };
  console.log(optionAttrs)
  // console.log(attributeValueDelete)
  return (
    <>
      {/* tạo sản phẩm */}
      <form method="product" onSubmit={ProductStore} className='mt-5'>
        <div className="content">
          <section className="content-header my-2">
            <p className="shrink text-[33px]  text-navy-700 dark:text-white">
              <a className="font-bold  hover:text-navy-700 dark:hover:text-white">
                Cập nhật  sản phẩm
              </a>
            </p>
            <div className="mb-4 text-right">
              <Link className="linear mb-4 rounded bg-brand-500 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" onClick={() => navigator("/admin/product")}>
                Về danh sách
              </Link>
            </div>
          </section>
          <section className="content-body my-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <div className="bg-white p-5 rounded-xl">
                  <div className="mb-3">
                    <label>
                      <strong>Tên sản phẩm (*)</strong>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Nhập tên sản phẩm"
                      name="name"
                      className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Chi tiết (*)</strong>
                    </label>
                    <TinyMCE setValue={setDetail} placeholder={detail} />
                  </div>

                  <div className="mb-3">
                    <label>
                      <strong>Mô tả (*)</strong>
                    </label>
                    <textarea
                      value={metadesc}
                      onChange={(e) => setMetadesc(e.target.value)}
                      name="description"
                      rows={3}
                      className="form-textarea mt-2 flex h-22 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                      placeholder="Nhập mô tả"
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Từ khoá (*)</strong>
                    </label>
                    <input
                      value={metakey}
                      onChange={(e) => setMetakey(e.target.value)}
                      type="text"
                      placeholder="Nhập tên sản phẩm"
                      name="keywords"
                      className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Hình (*)</strong>
                    </label>
                    <div className='relative justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                      <input
                        id="image"
                        multiple
                        onChange={handleImageChange}
                        type="file"
                        className="sr-only cursor-pointer relative block opacity-0 w-full h-full bg-red-500 p-20 z-50"
                      />
                      {(images.length > 0 || newImages.length > 0) ? (
                        <div className="flex flex-wrap p-5 absolute top-0 right-0 left-0 m-auto">
                          {images.map((item, index) => (
                            <div key={index} className="relative inline-block m-2">
                              <img
                                src={urlImage + "pro_image/" + item.image}
                                alt=""
                                className="w-[100px] h-[100px] object-cover rounded"
                              />
                              <div
                                onClick={() => handleRemoveImage(index, false)}
                                className="absolute top-[-5px] right-[-5px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                              >
                                X
                              </div>
                            </div>
                          ))}
                          {newImages.map((item, index) => (
                            <div key={index + images.length} className="relative inline-block m-2">
                              <img
                                src={URL.createObjectURL(item)}
                                alt=""
                                className="w-[100px] h-[100px] object-cover rounded"
                              />
                              <div
                                onClick={() => handleRemoveImage(index, true)}
                                className="absolute top-[-5px] right-[-5px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                              >
                                X
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-7 flex justify-center p-10 absolute top-0 right-0 left-0 m-auto">
                          <div className="text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-300"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Tải lên các hình ảnh</span>
                              </label>
                              <p className="pl-1">hoặc kéo và thả</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {
                  isVariant == 1 ?
                    (
                      <ProductAttributeUpdate optionAttrs={optionAttrs} setOptionAttrs={setOptionAttrs} attributes={attributes} setAttributeDelete={setAttributeDelete} setAttributeValueDelete={setAttributeValueDelete} setVariants={setVariants} />
                    ) : null
                }
                {
                  variants.length > 0 ? (
                    <div className="p-6 flex-auto bg-white rounded-xl mt-3">
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
                                className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s] checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
                                name="weekly"
                              />
                              <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                Tên
                              </div>
                            </th>
                            <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                              <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                Biến thể
                              </div>
                            </th>
                            <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                              <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                Giá
                              </div>
                            </th>
                            <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700">
                              <div className="text-base font-bold tracking-wide text-black lg:text-base">
                                SKU
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {variants && variants.map((variant, index) => (
                            <tr key={index} className='row'>
                              <td
                                className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s] checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
                                  id={"category" + index}
                                />
                                <input
                                  value={variant.name}
                                  onChange={(e) => handleNameChange(index, e)}
                                  type="text"
                                  placeholder="Nhập tên biến thể"
                                  name="keywords"
                                  className="mr-3 form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                                />
                              </td>
                              <td
                                className=" pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white"
                              >
                                <div className="mr-2 flex flex-wrap flex-row border-2 p-3 rounded-xl border-gray-300">
                                  {variant.variant_values.map((value, valindex) => (
                                    <p key={valindex} className='mr-2'>
                                      {value.product_attribute_value.attribute_value.name}
                                    </p>
                                  ))}
                                </div>
                              </td>
                              <td
                                className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white "
                              >
                                <input
                                  value={variant.price}
                                  onChange={(e) => handlePriceChange(index, e)}
                                  type="text"
                                  placeholder="Nhập giá"
                                  name="price"
                                  className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                                />
                              </td>
                              <td
                                className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white "
                              >
                                <input
                                  value={variant.SKU}
                                  onChange={(e) => handleSKUChange(index, e)}
                                  type="text"
                                  placeholder="Nhập SKU"
                                  name="SKU"
                                  className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null
                }
              </div>
              <div className="space-y-4">
                <div className="bg-white shadow p-4 rounded">
                  <div className="py-1 px-2 border-b rounded">
                    <strong>Đăng</strong>
                  </div>
                  <div className="p-2 border-b">
                    <select
                      name="status"
                      className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value={1}>Xuất bản</option>
                      <option value={2}>Chưa xuất bản</option>
                    </select>
                  </div>
                  <div className="text-right px-2 py-2">
                    <button type="submit" className="linear rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                      Đăng
                    </button>
                  </div>
                </div>
                <div className="bg-white shadow p-4 rounded">
                  <div className="py-1 px-2 border-b">
                    <strong>Danh mục(*)</strong>
                  </div>
                  <div className="p-2">
                    <select
                      name="category_id"
                      className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                      value={category_id}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bg-white shadow p-4 rounded">
                  <div className="py-1 px-2 border-b">
                    <strong>Thương hiệu(*)</strong>
                  </div>
                  <div className="p-2">
                    <select
                      name="brand_id"
                      className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                      value={brand_id}
                      onChange={(e) => setBrandId(e.target.value)}
                    >
                      <option value="">Chọn thương hiêu</option>
                      {brands.map((brand, index) => (
                        <option key={index} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bg-white shadow p-4 rounded">
                  <div className="py-1 px-2 border-b">
                    <strong>Giá bán(*)</strong>
                  </div>
                  <div className="p-2">
                    <div className="mb-3">
                      <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        defaultValue={10000}
                        min={10000}
                        name="price"
                        className="w-full p-2 mt-2 text-sm border-2 border-gray-300 rounded outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow p-4 rounded">
                  <div className="py-1 px-2 border-b">
                    <strong>Loại sản phẩm(*)</strong>
                  </div>
                  <div className="p-2">
                    <div className="flex items-center gap-x-3">
                      <input id="push-everything" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="0" checked={isVariant === "0"} onChange={(e) => setIsVariant(e.target.value)} />
                      <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">Sản phẩm đơn</label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input id="push-everything2" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="1" checked={isVariant === "1"} onChange={(e) => setIsVariant(e.target.value)} />
                      <label htmlFor="push-everything2" className="block text-sm font-medium leading-6 text-gray-900">Sản phẩm có biến thể</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </form>
      {/* tạo biến thể sản phẩm*/}
      {
      showModal?(
        <ProductVariantUpdate product={product1} showModal={showModal} setShowModal={setShowModal}/>
      ):null
    }
    </>
  );
}

export default ProductCreate;