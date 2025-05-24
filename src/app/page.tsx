"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { useGetProductsByCategory } from "@/hooks/useGetProductsByCategory";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { useDispatch } from "react-redux";
import { Product } from "@/hooks/useGetAllProducts";

import ProductsSkeleton from "@/components/ProductsSkeleton/ProductsSkeleton";
import Card from "@/components/Card/Card";
import HomePage from "@/components/Home/HomePage";
import CartPopUp from "@/components/CartPopUp/CartPopUp";

import productNotFoundIcon from "../../public/images/product-not-found-icon.png";

import Image from "next/image";

import "./global.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const { products, loadingAll } = useGetAllProducts();
  const dispatch = useDispatch();

  const storeSelectedCategory = useSelector(
    (state: AppState) => state.currentCategory
  );

  const showToast = useSelector((state: AppState) => {
    return state.showToast;
  });

  const { productsByCategory, loading } = useGetProductsByCategory(
    storeSelectedCategory
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

  const isNikoraStore = (storeName: string) => {
    return storeName && storeName.toLowerCase().includes("nikora");
  };

  const getDiscountPercentage = (product: Product) => {
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

  useEffect(() => {
    if (!storeSelectedCategory && selectedSort !== "discount-percentage-desc") {
      dispatch({ type: "SORT", payload: "discount-percentage-desc" });
    }
  }, [storeSelectedCategory, selectedSort, dispatch]);

  const displayedProducts = storeSelectedCategory
    ? productsByCategory
    : products;

  const sortedProducts = displayedProducts?.slice().sort((a, b) => {
    const aPrice = Number(
      typeof a.newPrice === "string" ? a.newPrice.replace(",", ".") : a.newPrice
    );

    const bPrice = Number(
      typeof b.newPrice === "string" ? b.newPrice.replace(",", ".") : b.newPrice
    );

    const finalAPrice = isNikoraStore(a.store) ? aPrice / 100 : aPrice;
    const finalBPrice = isNikoraStore(b.store) ? bPrice / 100 : bPrice;

    const aDiscountPercentage = getDiscountPercentage(a);
    const bDiscountPercentage = getDiscountPercentage(b);

    switch (selectedSort) {
      case "price-asc":
        return finalAPrice - finalBPrice;
      case "price-desc":
        return finalBPrice - finalAPrice;
      case "discount-percentage-asc":
        return aDiscountPercentage - bDiscountPercentage;
      case "discount-percentage-desc":
      default:
        return bDiscountPercentage - aDiscountPercentage;
    }
  });

  if (storeSelectedCategory === "") {
    return <HomePage />;
  }

  if (loading || loadingAll) {
    return <ProductsSkeleton />;
  }

  return (
    <>
      <div className="header-sort">
        <h1>Products</h1>
        {showToast && <CartPopUp />}
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
        {sortedProducts?.length === 0 ? (
          <Image
            className="product-not-found"
            src={productNotFoundIcon}
            alt="Product not found icon"
          />
        ) : (
          sortedProducts?.map((product, index) => {
            const rawNewPrice = Number(
              typeof product.newPrice === "string"
                ? product.newPrice.replace(",", ".")
                : product.newPrice
            );

            const rawOldPrice = Number(
              typeof product.oldPrice === "string"
                ? product.oldPrice.replace(",", ".")
                : product.oldPrice
            );

            const shouldDivide = isNikoraStore(product.store);

            const finalNewPrice = shouldDivide ? rawNewPrice : rawNewPrice;
            const finalOldPrice = shouldDivide ? rawOldPrice : rawOldPrice;

            return (
              <Card
                key={index}
                title={product.productName}
                storeName={product.store}
                image={product.imageUrl}
                price={finalNewPrice.toFixed(2)}
                daysLeft={product.daysLeft}
                oldPrice={finalOldPrice.toFixed(2)}
                product={product}
              />
            );
          })
        )}
      </div>
    </>
  );
}
