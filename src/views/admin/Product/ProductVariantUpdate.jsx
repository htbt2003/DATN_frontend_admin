import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import VariantServices from '../../../services/VariantServices';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import httpAxios from "httpAxios";

const ProductVariantUpdate = ({ product, setShowModal }) => {
  const [variantNews, setVariantNews] = useState([]);
  const [variants, setVariants] = useState(product.variants);
  const navigator = useNavigate();

  // Create variant combinations
  const createVariantCombination = (attributes) => {
    let results = [[]];
    for (const attribute of attributes) {
      const temp = [];
      for (const result of results) {
        for (const value of attribute.product_attribute_values) {
          temp.push([...result, value]);
        }
      }
      results = temp;
    }
    return results;
  };

  // Check if combination exists
  const checkCombinationExists = (combination) => {
    const combinationIds = combination.map(value => value.id).sort().toString();
    return variants.some(variant => {
      const variantIds = variant.variant_values.map(val => val.product_attribute_value_id).sort().toString();
      return variantIds === combinationIds;
    });
  };
  useEffect(() => {
    const combinations = createVariantCombination(product.productattributes);
    if (variants.length > 0) {
      const newVariants1 = combinations.filter(combination => !checkCombinationExists(combination));
      const newVariants2 = newVariants1.map((newVariants1) => ({
        name: product.name,
        price: product.price,
        SKU: null,
        values: newVariants1,
      }));
      setVariantNews(newVariants2);
    } else {
      const newVariants = combinations.map((combination) => ({
        name: product.name,
        price: product.price,
        SKU: null,
        values: combination,
      }));
      setVariantNews(newVariants);
    }
  }, [product]);

  // Handle form submission
  const handleVariantStore = async (event) => {
    event.preventDefault();
    const newVariantsFormData = new FormData();
    newVariantsFormData.append('product_id', product.id);
    variantNews.forEach((variant, index) => {
      newVariantsFormData.append(`variantNews[${index}][name]`, variant.name);
      newVariantsFormData.append(`variantNews[${index}][price]`, variant.price);
      newVariantsFormData.append(`variantNews[${index}][SKU]`, variant.SKU);
      variant.values.forEach((val, valIndex) => {
        newVariantsFormData.append(`variantNews[${index}][values][${valIndex}][product_attribute_value_id]`, val.id);
      });
    });
    variants.forEach((variant, index) => {
      newVariantsFormData.append(`variantUpdates[${index}][id]`, variant.id);
      newVariantsFormData.append(`variantUpdates[${index}][name]`, variant.name);
      newVariantsFormData.append(`variantUpdates[${index}][price]`, variant.price);
      newVariantsFormData.append(`variantUpdates[${index}][SKU]`, variant.SKU);
    });

    // for (let pair of newVariantsFormData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
    const formDataObj = {};
    newVariantsFormData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    const jsonData = JSON.stringify(formDataObj);
    console.log(jsonData);

    try {
      //   httpAxios.post('/variant/store', newVariantsFormData)
      // .then(response => {
      //     // console.log('Response:', response);
      //     toast.success(response.message);
      // })
      const result = await VariantServices.update(newVariantsFormData);
      setShowModal(false);
      navigator("/admin/product", { replace: true });
      toast.success(result.message);
    } catch (error) {
      console.error("Error creating variants:", error);
      toast.error("Failed to create variants. Please try again.");
    }
  };  // Handle name change
  const handleNameChange = (index, id = null, e) => {
    if (id != null) {
      const newVariants = [...variants];
      newVariants[index].name = e.target.value;
      newVariants[index].type = 'update';
      setVariants(newVariants);
    } else {
      const newVariants = [...variantNews];
      newVariants[index].name = e.target.value;
      setVariantNews(newVariants);
    }
  };

  // Handle price change
  const handlePriceChange = (index, id = null, e) => {
    if (id != null) {
      const newVariants = [...variants];
      newVariants[index].price = e.target.value;
      newVariants[index].type = 'update';
      setVariants(newVariants);
    } else {
      const newVariants = [...variantNews];
      newVariants[index].price = e.target.value;
      setVariantNews(newVariants);

    }
  };

  // Handle SKU change
  const handleSKUChange = (index, id = null, e) => {
    if (id != null) {
      const newVariants = [...variants];
      newVariants[index].SKU = e.target.value;
      newVariants[index].type = 'update';
      setVariants(newVariants);
    } else {
      const newVariants = [...variantNews];
      newVariants[index].SKU = e.target.value;
      setVariantNews(newVariants);
    }
  };

  console.log(variants)
  console.log(variantNews)

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-full w-full"
      >
        <div className="relative my-6 mx-auto">
          {/* Content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Tạo biến thể
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* Body */}
            <div className="relative p-6 flex-auto">
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
                  {variantNews.length > 0 && variantNews.map((variant, index) => (
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
                          onChange={(e) => handleNameChange(index, null, e)}
                          type="text"
                          placeholder="Nhập tên biến thể"
                          name="keywords"
                          className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                        />
                      </td>
                      <td
                        className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white"
                      >
                        <div className="mr-2 flex flex-wrap flex-row border-2 p-3 rounded-xl border-gray-300">
                          {variant.values.map((value, valindex) => (
                            <p key={valindex} className='mr-2'>
                              {value.attribute_value.name}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td
                        className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white "
                      >
                        <input
                          value={variant.price}
                          onChange={(e) => handlePriceChange(index, null, e)}
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
                          onChange={(e) => handleSKUChange(index, null, e)}
                          type="text"
                          placeholder="Nhập SKU"
                          name="SKU"
                          className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                        />
                      </td>
                    </tr>
                  ))}
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
                          onChange={(e) => handleNameChange(index, variant.id, e)}
                          type="text"
                          placeholder="Nhập tên biến thể"
                          name="keywords"
                          className="form-input mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-3 text-sm outline-none"
                        />
                      </td>
                      <td
                        className="pt-[14px] pb-[16px] sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white"
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
                          onChange={(e) => handlePriceChange(index, variant.id, e)}
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
                          onChange={(e) => handleSKUChange(index, variant.id, e)}
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
            {/* Footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              {/* <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Đong
              </button> */}
              <button
                className="bg-green-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleVariantStore}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ProductVariantUpdate;