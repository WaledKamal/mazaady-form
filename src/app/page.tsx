"use client";

  /**
   * all forms fileds here done by pure bare HTML 
   * we can use something like formik, shaden/ui, chekra || matrial ui
   * not all types seted, need to some agreement with backend
   */

import { getCategories, getProcessType } from "@/utils/helper";
import { useEffect, useState } from "react";
import DisplayTable from "./table";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [processTypes, setProcessTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [transmissionTypes, setTransmissionTypes] = useState([]);
  // Other Optional Validtion
  const [IsOtherCategory, setIsOtherCategory] = useState(false);
  const [IsOtherSubCategory, setIsOtherSubCategory] = useState(false);
  const [IsOtherProcess, setIsOtherProcess] = useState(false);
  const [IsOtherBrand, setIsOtherBrand] = useState(false);
  const [IsOtherTransmission, setIsOtherTransmission] = useState(false)
  // form values
  const [category, setCategory] = useState("");
  const [subCategory, setsubCategory] = useState("");
  const [processType, setProcessType] = useState("");
  const [brand, setBrand] = useState("");
  const [transmissionType, setTransmissionType] = useState("");

  const [formContent, setformContent] = useState({})

  const addSubCategories = (catId: number) => {
    setsubCategories(categories.filter((cat) => cat.id === catId)[0].children);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "Other") {
      setIsOtherCategory(true);
    } else if (!isNaN(+e.target.value)) {
      const catId = +e.target.value;
      addSubCategories(catId);
      setIsOtherCategory(false);
      setCategory(catId);
    }
  };

  
  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "Other") {
      setIsOtherSubCategory(true);
    } else if (!isNaN(+e.target.value)) {
      const subCatId = +e.target.value;
      setIsOtherSubCategory(false);
      getProcessType(subCatId).then((data)=>{
        const {processTypes, brands, transmissionType} = data
        setBrands(brands)
        setProcessTypes(processTypes)
        setTransmissionTypes(transmissionType)
      });
      setsubCategory(subCatId);
      setProcessType(subCatId);
    }
  };

  const handleProcessChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "Other") {
      setIsOtherProcess(true);
    } else if (!isNaN(+e.target.value)) {
      setIsOtherProcess(false);
      setsubCategory(+e.target.value);
    }
  };

  const handleChangeBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "Other") {
      setIsOtherBrand(true);
    } else if (!isNaN(+e.target.value)) {
      setIsOtherBrand(false);
      setBrand(+e.target.value);
    }
  };

  const handleTransmssionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value == "Other") {
      setIsOtherTransmission(true);
    } else if (!isNaN(+e.target.value)) {
      setIsOtherTransmission(false);
      setTransmissionType(+e.target.value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setformContent({
      category,
      subCategory,
      processType,
      brand,
      transmissionType,
    });

    console.table({
      category,
      subCategory,
      processType,
      brand,
      transmissionType,
    })
  };

  useEffect(() => {
    getCategories().then((response) => {
      setCategories(response.data.categories);
    });
    return () => {
      setCategories([]);
    };
  }, []);

  // reset inputs on data changed
  useEffect(() => {
    setProcessTypes([]);
    setBrands([]);
    setTransmissionTypes([]);
  }, [subCategories]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h4><b>Mazaady</b> First Technical assessment (1) </h4>
      <code><b>95% of code are pure, no third party library</b></code>
      <form onSubmit={handleFormSubmit}>
        <label
          htmlFor="main-cat"
          className="block mb-2 text-sm font-medium text-gray-900 required"
        >
          Main Category
        </label>
        <select
          onChange={handleCategoryChange}
          id="main-cat"
          className="select-form"
        >
          <option defaultValue={"DEFAULT"} selected>
            Choose a category
          </option>

          {categories &&
            categories.map((cat, index) => (
              <option key={index} value={cat.id}>
                {cat.name}
              </option>
            ))}
          <option value="Other">Other</option>
        </select>

        {IsOtherCategory ? (
          <input
          onChange={(e)=>setCategory(e.target.value)}
            type="text"
            id="otherCat"
            className="border mt-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your catagory e.g: cars , motorcycles & accessories"
            required
          />
        ) : (
          <></>
        )}

        <label
          htmlFor="sub-cat"
          className="block mb-2 text-sm font-medium text-gray-900 required mt-5"
        >
          Sub Category
        </label>
        <select
          onChange={handleSubCategoryChange}
          id="sub-cat"
          className="select-form"
        >
          <option defaultValue={"DEFAULT"} selected>
            Choose a sub category
          </option>
          {subCategories.map((subCat, index) => (
            <option key={index} value={subCat.id}>
              {subCat.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        {IsOtherSubCategory ? (
          <input
          onChange={(e)=>setsubCategory(e.target.value)}
            type="text"
            id="OtherSubCat"
            className="border mt-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your sub catagory e.g: Cars"
            required
          />
        ) : (
          <></>
        )}

        <label
          htmlFor="process-type"
          className="block mb-2 text-sm font-medium text-gray-900 required mt-5"
        >
          Process Type
        </label>
        <select
          onChange={handleProcessChange}
          id="process-type"
          className="select-form mb-2"
        >
          <option defaultValue={"DEFAULT"} selected>
            Choose a process
          </option>
          {processTypes.map((process, index) => (
            <option key={index} value={process.id}>
              {process.name}
            </option>
          ))}

          <option value="Other">Other</option>
        </select>
        {IsOtherProcess ? (
          <input
            type="text"
            id="OtherProcess"
            onChange={(e)=>setProcessType(e.target.value)}
            className="border mt-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Process type e.g: Sell, Buy etc.."
            required
          />
        ) : (
          <></>
        )}
        <label
          htmlFor="brand"
          className="block mb-2 text-sm font-medium text-gray-900 mt-5"
        >
          Brand
        </label>
        <select onChange={handleChangeBrand} id="brand" className="select-form">
          <option defaultValue={"DEFAULT"}>Choose a brand</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand.id}>
              {brand.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>

        {IsOtherBrand ? (
          <input
            type="text"
            onChange={(e)=>setBrand(e.target.value)}
            id="Other Brand"
            className="border mt-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Process type e.g: Apple, BMW etc.."
            required
          />
        ) : (
          <></>
        )}

        <label
          htmlFor="transmission"
          className="block mb-2 text-sm font-medium text-gray-900 mt-5"
        >
          Transmission Type
        </label>
        <select
          onChange={handleTransmssionTypeChange}
          id="transmission"
          className="select-form"
        >
          <option defaultValue={"DEFAULT"}>Choose a type</option>
          {transmissionTypes.map((type, index) => (
            <option key={index} value={type.id}>
              {type.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        {IsOtherTransmission ? (
          <input
            type="text"
            onChange={(e)=>setTransmissionType(e.target.value)}
            id="Other Brand"
            className="border mt-2 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Process type e.g: Apple, BMW etc.."
            required
          />
        ) : (
          <></>
        )}
        <div className="controller flex items-center justify-center ">
          <button type="submit" className="p-2 m-10 bg-green-100">
            Submit
          </button>
        </div>
      </form>
     <DisplayTable data={formContent} />
    </main>
  );
};

export default Home;
