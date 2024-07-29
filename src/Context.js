import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getFeatures } from "./services/featureServices";

const ProductData = createContext();
function Context({ children }) {
  const [componentRights, setComponentRights] = useState([]);
  useEffect(() => {
    getFeatures().then((res) => {
      console.log(res);
      setComponentRights(res);
    });
  }, []);

  return (
    <ProductData.Provider value={componentRights}>
      {componentRights.length > 0 ? children : <div>Loading..</div>}
    </ProductData.Provider>
  );
}

export { Context, ProductData };
