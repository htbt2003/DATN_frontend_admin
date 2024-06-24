import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductServices from '../../../services/ProductServices';
import AttributeServices from '../../../services/AttributeServices';
import BrandServices from '../../../services/BrandServices';
import CategoryServices from '../../../services/CategoryServices';
import TinyMCE from 'components/tiny';
import ProductAttribute from './ProductAttribute';
import ProductVariant from './ProductVariant';

function ProductCreate() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  
  const [showModal, setShowModal] = useState(false);
  const [isVariant, setIsVariant] = useState(0);
  const [product1, setProduct1] = useState();
  const [optionAttrs, setOptionAttrs] = useState([
    {
      attribute: null,
      values: [""],
    },
  ]);

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const [brandsResult, categoriesResult, attributesResult] = await Promise.all([
        BrandServices.getAll(),
        CategoryServices.getAll(),
        AttributeServices.getAll(),
      ]);
      setBrands(brandsResult.brandsAll);
      setCategories(categoriesResult.categoriesAll);
      setAttributes(attributesResult.attributesAll);
    } catch (error) {
      setError('Failed to fetch data. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const ProductStore = async (event) => {
    event.preventDefault();
    setLoading(true);

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

    images.forEach((image) => {
      product.append('images[]', image);
    });

    try {
      let result;
      if (isVariant == 1) {
        optionAttrs.forEach((optionAttr, index) => {
          product.append(`optionAttrs[${index}][attribute_id]`, optionAttr.attribute.id);
          optionAttr.values.forEach((val, valIndex) => {
            product.append(`optionAttrs[${index}][values][${valIndex}][attribute_value_id]`, val.attribute_value_id);
            if (val.image) {
              product.append(`optionAttrs[${index}][values][${valIndex}][image]`, val.image);
            }
          });
        });
        result = await ProductServices.create(product);
        setProduct1(result.product);
        setShowModal(true);
      } else {
        result = await ProductServices.create(product);
        navigator("/admin/product", { replace: true });
      }
      toast.success(result.message);
    } catch (error) {
      toast.error('Failed to create product. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index]);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <form method="product" onSubmit={ProductStore} className='mt-5'>
        <div className="content">
          <section className="content-header my-2">
            <p className="shrink text-[33px] text-navy-700 dark:text-white">
              <a className="font-bold hover:text-navy-700 dark:hover:text-white">
                Thêm sản phẩm
              </a>
            </p>
            <div className="mb-4 text-right">
              <Link className="linear mb-4 rounded bg-brand-500 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" to={"/admin/product"}>
                Về danh sách
              </Link>
            </div>
          </section>
          <section className="content-body my-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <div className="bg-white p-5 rounded-xl">
                  {/* Form fields for name, detail, description, metakey, images */}
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
                    <TinyMCE setValue={setDetail} placeholder="Nhập chi tiết sản phẩm" />
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
                      placeholder="Nhập từ khoá"
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
                        className="sr-only cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
                      />
                      {
                        images && images.length > 0 ?
                          (
                            <div className="flex flex-wrap p-5 absolute top-0 right-0 left-0 m-auto">
                              {
                                images.map((image, index) => (
                                  <div key={index} className="relative inline-block m-2">
                                    <img
                                      src={URL.createObjectURL(image)}
                                      alt=""
                                      className="w-[100px] h-[100px] object-cover rounded"
                                    />
                                    <button
                                      onClick={() => handleRemoveImage(index)}
                                      className="absolute top-[-5px] right-[-5px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))
                              }
                            </div>
                          ) :
                          (
                            <div className="text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M0 0h48v48H0z" fill="none" />
                                <path d="M6 16h36v20H6z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                                <path d="M36 4H12c-1.1 0-2 .9-2 2v36c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                              </svg>
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Tải ảnh lên</span>
                                </label>
                                <p className="pl-1">hoặc kéo thả</p>
                              </div>
                              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
                            </div>
                          )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-1">
                <div className="bg-white p-5 rounded-xl">
                  {/* Category, brand, price, status */}
                  <div className="mb-3">
                    <label>
                      <strong>Loại sản phẩm (*)</strong>
                    </label>
                    <select
                      value={category_id}
                      onChange={(e) => setCategoryId(e.target.value)}
                      name="category_id"
                      className="form-select mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    >
                      <option>-- Chọn loại sản phẩm --</option>
                      {
                        categories.map((category, index) => (
                          <option key={index} value={category.id}>{category.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Thương hiệu (*)</strong>
                    </label>
                    <select
                      value={brand_id}
                      onChange={(e) => setBrandId(e.target.value)}
                      name="brand_id"
                      className="form-select mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    >
                      <option>-- Chọn thương hiệu --</option>
                      {
                        brands.map((brand, index) => (
                          <option key={index} value={brand.id}>{brand.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Giá sản phẩm (*)</strong>
                    </label>
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="text"
                      placeholder="Nhập giá sản phẩm"
                      name="price"
                      className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Trạng thái (*)</strong>
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      name="status"
                      className="form-select mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                    >
                      <option value={1}>Xuất bản</option>
                      <option value={2}>Chưa xuất bản</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Có biến thể</strong>
                  </label>
                  <div className='mt-3 flex flex-row'>
                    <div className="mb-3 mr-2 flex items-center justify-start">
                      <input
                        type="radio"
                        value="1"
                        checked={isVariant == 1}
                        onChange={(e) => setIsVariant(e.target.value)}
                      />
                      <label className="px-2">Có</label>
                    </div>
                    <div className="mb-3 flex items-center justify-start">
                      <input
                        type="radio"
                        value="0"
                        checked={isVariant == 0}
                        onChange={(e) => setIsVariant(e.target.value)}
                      />
                      <label className="px-2">Không</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='my-4'>
              <button
                type="submit"
                className="linear rounded-md bg-brand-500 py-2 px-4 text-base text-white hover:bg-brand-600 active:bg-brand-700"
              >
                Thêm
              </button>
            </div>
          </section>
        </div>
      </form>
      {
        isVariant == 1 && <ProductAttribute attributes={attributes} optionAttrs={optionAttrs} setOptionAttrs={setOptionAttrs} />
      }
      {
        showModal && <ProductVariant product={product1} attributes={attributes} showModal={showModal} setShowModal={setShowModal} />
      }
    </>
  );
}

export default ProductCreate;
