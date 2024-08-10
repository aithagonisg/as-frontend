import React, { useEffect, useState } from "react";
import { getCategories, getProducts } from "../../services/productService";
import Product from "../../components/Product";
import Input from "../../components/commonComponents/Input";
import Heading from "../../components/commonComponents/Heading";
import Checkbox from "../../components/commonComponents/Checkbox";
import RangeSlider from "../../components/commonComponents/RangeSlider";
import { useDebounce } from "../../utils/useDebounce";

export default function ProductsList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [productsList, setProductsList] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);

  useEffect(() => {
    const selectedCategories = categoriesList
      .filter((item) => item.isChecked)
      .map((item) => item.label);

    getProducts(
      selectedCategories,
      page,
      "",
      minPrice,
      maxPrice,
      searchQuery
    ).then((res) => setProductsList(res.docs));
  }, [categoriesList, page, minPrice, maxPrice, searchQuery]);

  useEffect(() => {
    getCategories().then((res) => {
      const catego = res.map((item, index) => ({
        id: index,
        label: item,
        isChecked: false,
      }));
      setCategoriesList(catego);
    });
  }, []);

  const handleCategory = (event) => {
    const selectedCategories = categoriesList.map((item) => {
      if (item.id === event.target.id) {
        return { ...item, isChecked: event.target.value };
      } else {
        return item;
      }
    });

    setCategoriesList(selectedCategories);
  };

  const handleSearchProduct = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDebounce = useDebounce(handleSearchProduct, 400);

  return (
    <div className="flex">
      <div className="w-[18%] border-r border-borderColor mr-1">
        <div>
          <Heading text="Filters" boldClass="font-bold" />
        </div>
        <div className="my-2">
          <Heading text="Price Range" level={2} boldClass="font-semibold" />
        </div>
        <div className="w-[80%]">
          <RangeSlider
            minPrice={minPrice}
            setMinPrice={useDebounce(setMinPrice, 400)}
            maxPrice={maxPrice}
            setMaxPrice={useDebounce(setMaxPrice, 400)}
          />
        </div>

        <div className="my-2">
          <Heading text="Catgoires" level={2} boldClass="font-semibold" />
        </div>
        <div className="flex flex-col gap-2">
          {categoriesList.map((item) => (
            <Checkbox
              id={item.id}
              labelText={item.label}
              handleCheckbox={handleCategory}
              checked={item.isChecked}
            />
          ))}
        </div>
      </div>{" "}
      <div className="w-[81%] ">
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-end items-end ">
            <Input
              placeholder="search products"
              type="text"
              onChange={handleDebounce}
            />
          </div>
          <div>
            <div className="flex flex-wrap gap-4">
              {productsList.map((item) => (
                <Product data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
