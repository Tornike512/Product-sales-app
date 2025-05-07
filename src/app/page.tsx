"use client";

import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { useSelector } from "react-redux";
import store, { AppState } from "@/store/store";
import { useDispatch } from "react-redux";

import Card from "@/components/Card/Card";

import "./global.css";
import { useEffect } from "react";

export default function Home() {
  const { products } = useGetAllProducts();
  const dispatch = useDispatch();

  const storeSelectedCategory = useSelector(
    (state: AppState) => state.currentCategory
  );

  const selectedSort = useSelector((state: AppState) => state.sort);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    dispatch({ type: "SORT", payload: selectedSort });
  };

  const productsByCategory = products?.filter((product) => {
    return product.category === storeSelectedCategory;
  });

  return (
    <>
      <div className="header-sort">
        <h1>Every Listed Product</h1>
        <select value={selectedSort} onChange={handleSortChange}>
          <option value="price-asc">Price ascending</option>
          <option value="price-desc">Price descending</option>
          <option value="discount-percentage-asc">
            Discount Percentage ascending
          </option>
          <option value="discount-percentage-desc">
            Discount Percentage descending
          </option>
        </select>
      </div>
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
