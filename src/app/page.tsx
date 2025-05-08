"use client";

import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
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

  const getDiscountPercentage = (product) => {
    // If discountPercentage is already available in the product object, use it
    if (product.discountPercentage !== undefined) {
      return Number(product.discountPercentage);
    }

    // Otherwise calculate it
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
        <h1>{storeSelectedCategory ? "Category Products" : "Best Deals"}</h1>
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
