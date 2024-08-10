import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  useEffect(() => {
    // http://localhost:8080/v1/common/product?productId=66af48d7bbf24f7c50abc9eb
  }, [id]);

  console.log(id);
  return <div>ProductDetails</div>;
}
