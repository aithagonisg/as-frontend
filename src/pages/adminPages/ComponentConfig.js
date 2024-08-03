import React, { useContext } from "react";
import { ProductData } from "../../Context";

export default function ComponentConfig() {
  const rights = useContext(ProductData);
  const noMapData = ["_id", "__v"];
  return (
    <div>
      {/* {rights.map((item) => (
        <div>
          {Object.keys(item).map((right) => {
            return !noMapData.includes(right) && <div>{right}</div>;
          })}
        </div>
      ))} */}
    </div>
  );
}
