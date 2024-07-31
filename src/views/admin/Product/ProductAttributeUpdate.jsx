import { type } from "@testing-library/user-event/dist/type";
import Variants from "components/Variants";
import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";

const ProductAttributeUpdate = ({ optionAttrs, setOptionAttrs, attributes, setAttributeDelete, setAttributeValueDelete, setAttributeValueUpdate, setVariants }) => {
  const [imageCheckbox, setImageCheckbox] = useState(false);

  const addOption = () => {
    if (
      optionAttrs.length > 0 &&
      optionAttrs[optionAttrs.length - 1].attribute !== null &&
      optionAttrs[optionAttrs.length - 1].values[optionAttrs[optionAttrs.length - 1].values.length - 1] !== ""
    ) {
      setOptionAttrs([
        ...optionAttrs,
        {
          attribute: null,
          values: [""],
        },
      ]);
    } else {
      toast.error("Vui lòng nhập tên thuộc tính và giá trị tùy chọn để tiếp tục");
    }
  };

  const addValue = (indexOp) => {
    const options = [...optionAttrs];
    if (options[indexOp].values[options[indexOp].values.length - 1] !== "") {
      options[indexOp].values = [...options[indexOp].values, ""];
      setOptionAttrs(options);
      setVariants([])
    } else {
      toast.error("Vui lòng nhập giá trị tùy chọn để tiếp tục");
    }
  };

  const removeValue = (indexOp, indexVal) => {
    const options = [...optionAttrs];
    if (options[indexOp].values.length > 1) {
      const value = options[indexOp].values[indexVal];
      if (value && typeof value === 'object' && value.id) {
        setAttributeValueDelete((prev) => [...prev, value.id]);
      }
      options[indexOp].values.splice(indexVal, 1);
      setOptionAttrs(options);
    } else {
      toast.error("Bản phải có ít nhất một giá trị tùy chọn");
    }
  };
  
  const removeOption = (indexOp) => {
    const options = [...optionAttrs];
    const option = options[indexOp];
    if (option && typeof option === 'object' && option.id) {
      setAttributeDelete((prev) => [...prev, option.id]);
      option.values.forEach((value) => {
        if (value && typeof value === 'object' && value.id) {
          setAttributeValueDelete((prev) => [...prev, value.id]);
        }
      });
    }
    options.splice(indexOp, 1);
    setOptionAttrs(options);
    setVariants([]);
  };
  
  const handleAttributeChange = (indexOp, e) => {
    const selectedAttributeId = parseInt(e.target.value);
    const selectedAttribute = attributes.find(attr => attr.id === selectedAttributeId);
    const newOptions = [...optionAttrs];
    const currentOption = newOptions[indexOp];
    if (currentOption && currentOption.id) {
      setAttributeDelete((prev) => [...prev, currentOption.id]);
      delete currentOption.id;
    }
    newOptions[indexOp].attribute = selectedAttribute || null;
    newOptions[indexOp].values = [""];
    newOptions[indexOp].type = 'add';
    setOptionAttrs(newOptions);
    setVariants([]);
  };
  
  const handleValueChange = (indexOp, indexVal, e) => {
    const newOptions = [...optionAttrs];
    const currentValue = newOptions[indexOp].values[indexVal];
    if (currentValue && typeof currentValue === 'object') {
      newOptions[indexOp].values[indexVal] = { ...currentValue, attribute_value_id: e.target.value, type: 'update' };
    } else {
      newOptions[indexOp].values[indexVal] = { attribute_value_id: e.target.value, type: 'add' };
    }
    setOptionAttrs(newOptions);
    setVariants([]);
  };

  const handleImageChange = (indexOp, indexVal, e) => {
    const file = e.target.files[0];
    const newOptions = [...optionAttrs];
    if (file) {
      newOptions[indexOp].values[indexVal] = { ...newOptions[indexOp].values[indexVal], image: file };
    } else {
      delete newOptions[indexOp].values[indexVal].image;
    }
    setOptionAttrs(newOptions);
  };
  // console.log(Variants)
  return (
    <div className="bg-white p-5 rounded-xl mt-3">
      <label className="text-gray-400">
        <strong>Bạn có thể thêm biến thể nếu sản phẩm này có nhiều lựa chọn như màu sắc kích thước</strong>
      </label>
      {optionAttrs.map((option, indexOp) => (
        <div className="mt-5" key={indexOp}>
          <div className="bg-[#F4F7FE] p-5">
            <div className="mb-3">
              <div className="flex flex-row flex-wrap">
                <strong>Tên thuộc tính (*)</strong>
                {indexOp === 0 && (
                  <div className="sm:text-[14px] text-sm font-bold text-navy-700 dark:text-white flex items-center gap-2 ml-auto">
                    <input
                      type="checkbox"
                      className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
                      justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s]
                      checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
                      id={`hinh-${indexOp}`}
                      checked={imageCheckbox}
                      onChange={(e) => setImageCheckbox(e.target.checked)}
                    />
                    <label htmlFor={`hinh-${indexOp}`} className="block text-sm font-medium leading-6 text-gray-900">
                      Thêm hình ảnh
                    </label>
                  </div>
                )}
                <div className="ml-5">
                  <CiTrash className="cursor-pointer" onClick={() => removeOption(indexOp)} />
                </div>
              </div>
              <select
                name="attribute_id"
                className="form-input mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-2 text-sm outline-none"
                value={option.attribute ? option.attribute.id : ""}
                onChange={(e) => handleAttributeChange(indexOp, e)}
                readOnly
              >
                <option value="">Chọn thuộc tính</option>
                {attributes.map((attribute, index) => (
                  <option key={index} value={attribute.id}>
                    {attribute.name}
                  </option>
                ))}
              </select>
            </div>
            {option.attribute && option.values.map((valObj, indexVal) => (
              <div className="mb-3" key={indexVal}>
                <div className="flex items-center w-full">
                  <div className="w-full">
                    <label className="mb-2">
                      <strong>Tùy chọn</strong>
                    </label>
                    <select
                      name="values_id"
                      className="mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-white p-2 text-sm outline-none"
                      value={valObj.attribute_value_id || ""}
                      onChange={(e) => handleValueChange(indexOp, indexVal, e)}
                    >
                      <option value="">Chọn giá trị thuộc tính</option>
                      {option.attribute.values.map((item, indexItem) => (
                        <option key={indexItem} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {indexOp === 0 && imageCheckbox && valObj.attribute_value_id && (
                    <div className="relative ml-3 w-[100px] h-[100px] bg-white rounded-lg">
                      <input
                        id={`image-${indexOp}-${indexVal}`}
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleImageChange(indexOp, indexVal, e)}
                      />
                      <label htmlFor={`image-${indexOp}-${indexVal}`} className="flex justify-center items-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                        {valObj.image ? (
                          <img
                            src={URL.createObjectURL(valObj.image)}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center bg-white rounded-lg">
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
                            <span className="mt-2 block text-sm font-medium text-gray-600">Tải lên</span>
                          </div>
                        )}
                      </label>
                    </div>
                  )}
                  <CiTrash className="ml-2 cursor-pointer mt-8" onClick={() => removeValue(indexOp, indexVal)} />
                </div>
              </div>
            ))}
            <p className="text-[#0ea5e9] cursor-pointer" onClick={() => addValue(indexOp)}>+ Thêm tùy chọn giá trị</p>
          </div>
        </div>
      ))}
      <div className="mt-5 bg-blue-500 text-white p-2 rounded w-[150px] cursor-pointer" onClick={addOption}>+ Thêm thuộc tính</div>
    </div>
  );
};

export default ProductAttributeUpdate;
