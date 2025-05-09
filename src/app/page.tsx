"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { useDispatch } from "react-redux";

import Card from "@/components/Card/Card";

import "./global.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const { products } = useGetAllProducts();
  const dispatch = useDispatch();

  const storeSelectedCategory = useSelector(
    (state: AppState) => state.currentCategory
  );

  const selectedSort = useSelector((state: AppState) => state.sort);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setIsLoading(true);

    dispatch({ type: "SORT", payload: selectedSort });

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const getDiscountPercentage = (product: any) => {
    if (product.discountPercentage !== undefined) {
      return Number(product.discountPercentage);
    }

    const old = Number(
      typeof product.oldPrice === "string"
        ? product.oldPrice.replace(",", ".")
        : product.oldPrice
    );

    const current = Number(
      typeof product.newPrice === "string"
        ? product.newPrice.replace(",", ".")
        : product.newPrice
    );

    if (old <= 0 || current <= 0) return 0;
    return ((old - current) / old) * 100;
  };

  const displayedProducts = storeSelectedCategory
    ? products?.filter((product) => product.category === storeSelectedCategory)
    : products;

  const sortedProducts = displayedProducts?.slice().sort((a, b) => {
    const aPrice =
      Number(
        typeof a.newPrice === "string"
          ? a.newPrice.replace(",", ".")
          : a.newPrice
      ) / (a.store !== "nikora" ? 1 : 100);

    const bPrice =
      Number(
        typeof b.newPrice === "string"
          ? b.newPrice.replace(",", ".")
          : b.newPrice
      ) / (b.store !== "nikora" ? 1 : 100);

    const aDiscountPercentage = getDiscountPercentage(a);
    const bDiscountPercentage = getDiscountPercentage(b);

    switch (selectedSort) {
      case "price-asc":
        return aPrice - bPrice;
      case "price-desc":
        return bPrice - aPrice;
      case "discount-percentage-asc":
        return aDiscountPercentage - bDiscountPercentage;
      case "discount-percentage-desc":
      default:
        return bDiscountPercentage - aDiscountPercentage;
    }
  });

  useEffect(() => {
    if (!storeSelectedCategory && selectedSort !== "discount-percentage-desc") {
      dispatch({ type: "SORT", payload: "discount-percentage-desc" });
    }
  }, [storeSelectedCategory, selectedSort, dispatch]);

  return (
    <>
      <div className="header-sort">
        <h1>Products</h1>

        <div className="custom-select-container">
          <select
            className="custom-select"
            value={selectedSort}
            onChange={handleSortChange}
            disabled={isLoading}
          >
            <option value="price-asc">Price ascending</option>
            <option value="price-desc">Price descending</option>
            <option value="discount-percentage-asc">
              Discount Percentage ascending
            </option>
            <option value="discount-percentage-desc">
              Discount Percentage descending
            </option>
          </select>
          {isLoading ? (
            <svg
              className="select-icon animate-spin"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          ) : (
            <svg
              className="select-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          )}
        </div>
      </div>
      <div className="product-grid relative">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loader"></div>
          </div>
        )}
        {sortedProducts?.map((product, index) => (
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
