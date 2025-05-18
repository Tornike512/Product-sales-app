"use client";

import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

import Card from "@/components/Card/Card";

import "./ProductsPage.css";

export default function ProductsPage() {
  const { products } = useGetAllProducts();

  const searchKey = useSelector((state: AppState) => {
    return state.searchKey;
  });

  const isNikoraStore = (storeName: string) => {
    return storeName && storeName.toLowerCase().includes("nikora");
  };

  const filterBySearchKey = products?.filter((product) => {
    return product.productName.includes(searchKey);
  });

  return (
    <>
      <h1 className="searched-products">Searched product: {searchKey}</h1>
      <div className="products-grid">
        {filterBySearchKey?.map((product, index) => {
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

          const finalNewPrice = shouldDivide ? rawNewPrice / 100 : rawNewPrice;
          const finalOldPrice = shouldDivide ? rawOldPrice / 100 : rawOldPrice;
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
        })}
      </div>
    </>
  );
}
