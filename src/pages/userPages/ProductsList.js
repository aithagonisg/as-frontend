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
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);

  // Fetch products whenever the filters change

  const getProductsList = (
    selectedCategories,
    page,
    minPrice,
    maxPrice,
    searchQuery,
    isPage
  ) => {
    getProducts(
      selectedCategories,
      page,
      "",
      minPrice,
      maxPrice,
      searchQuery
    ).then((res) => {
      setTotalPages(res.totalPages);
      if (isPage) {
        setProductsList((prev) => {
          const newProducts = res.docs.filter(
            (newProduct) =>
              !prev.some((prevProduct) => prevProduct._id === newProduct._id)
          );
          return [...prev, ...newProducts];
        });
      } else {
        setProductsList(res.docs);
      }

      setIsLoading(false);
    });
  };
  useEffect(() => {
    const selectedCategories = categoriesList
      .filter((item) => item.isChecked)
      .map((item) => item.label);
    if (isCategoryLoaded) {
      getProductsList(
        selectedCategories,
        1,
        minPrice,
        maxPrice,
        searchQuery,
        false
      );
    }
  }, [categoriesList, minPrice, maxPrice, searchQuery]);

  useEffect(() => {
    const selectedCategories = categoriesList
      .filter((item) => item.isChecked)
      .map((item) => item.label);
    getProductsList(
      selectedCategories,
      page,
      minPrice,
      maxPrice,
      searchQuery,
      true
    );
  }, [page]);

  // Fetch categories on initial render
  useEffect(() => {
    getCategories()
      .then((res) => {
        const catego = res.map((item, index) => ({
          id: index,
          label: item,
          isChecked: false,
        }));
        setCategoriesList(catego);
        setIsCategoryLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setIsCategoryLoaded(true);
      });
  }, []);

  // Handle scroll event to load more products when reaching the bottom

  const handleScroll = () => {
    const productListElement = document.getElementById("productList");

    if (
      productListElement.scrollTop + productListElement.clientHeight + 1 >=
        productListElement.scrollHeight &&
      !isLoading &&
      page < totalPages
    ) {
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleCategory = (event) => {
    const selectedCategories = categoriesList.map((item) => {
      if (item.id == event.target.id) {
        return { ...item, isChecked: event.target.value };
      } else {
        return item;
      }
    });
    console.log(selectedCategories);

    setCategoriesList(selectedCategories);
  };

  const handleSearchProduct = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDebounce = useDebounce(handleSearchProduct, 400);

  return (
    <div
      className="flex px-5 h-full overflow-auto"
      id="productList"
      onScroll={handleScroll}
    >
      <div className="md:w-[18%] w-0 border-r border-borderColor mr-1 md:fixed md:block hidden py-4">
        <div className="py-2">
          <Heading text="Filters" level={3} boldClass="font-bold" />
        </div>
        <div className="py-2">
          <Heading text="Price Range" level={4} boldClass="font-semibold" />
        </div>
        <div className="w-[80%]">
          <RangeSlider
            minPrice={minPrice}
            setMinPrice={useDebounce(setMinPrice, 400)}
            maxPrice={maxPrice}
            setMaxPrice={useDebounce(setMaxPrice, 400)}
          />
        </div>

        <div className="py-2">
          <Heading text="Categories" level={4} boldClass="font-semibold" />
        </div>
        <div className="flex flex-col gap-2">
          {categoriesList.map((item) => (
            <Checkbox
              key={item.id}
              id={item.id}
              labelText={item.label}
              handleCheckbox={handleCategory}
              checked={item.isChecked}
            />
          ))}
        </div>
      </div>{" "}
      <div className="md:w-[81%] w-full md:ml-[19%] pt-4">
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-end items-end ">
            <Input
              placeholder="Search products"
              type="text"
              onChange={handleDebounce}
              customClass="md:w-80 w-full"
            />
          </div>
          <div>
            <div className="flex flex-wrap gap-4">
              {productsList.map((item) => (
                <Product key={item._id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
