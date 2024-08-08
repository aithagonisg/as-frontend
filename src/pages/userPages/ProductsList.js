import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import Product from "../../components/Product";
import Input from "../../components/commonComponents/Input";

export default function ProductsList() {
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    getProducts().then((res) => setProductsList(res.docs));
  }, []);

  return (
    <div className="flex">
      <div className="w-[18%]">Filters</div>{" "}
      <div className="w-[81%] ">
        <div className="flex flex-col justify-end items-end gap-4">
          <div className="w-72">
            <Input placeholder="search products" type="text" />
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
