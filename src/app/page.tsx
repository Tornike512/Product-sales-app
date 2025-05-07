"use client";

import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

import Card from "@/components/Card/Card";

import "./global.css";

export default function Home() {
  const { products } = useGetAllProducts();

  const storeSelectedCategory = useSelector(
    (state: AppState) => state.currentCategory
  );

  const productsByCategory = products?.filter((product) => {
    return product.category === storeSelectedCategory;
  });

  return (
    <>
      <h1>Every Listed Product</h1>
      <div className="product-grid">
        {productsByCategory?.map((product, index) => (
          <Card
            key={index}
            title={product.productName}
            storeName={product.store}
            image={product.imageUrl}
            price={(
              Number(
                typeof product.newPrice === "string"
                  ? product.newPrice.replace(",", ".")
                  : product.newPrice
              ) / (product.store !== "nikora" ? 1 : 100)
            ).toFixed(2)}
            daysLeft={product.daysLeft}
            oldPrice={(
              Number(
                typeof product.oldPrice === "string"
                  ? product.oldPrice.replace(",", ".")
                  : product.oldPrice
              ) / (product.store !== "nikora" ? 1 : 100)
            ).toFixed(2)}
          />
        ))}
      </div>
    </>
  );
}
