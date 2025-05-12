"use client";

import { useGetAllProducts } from "@/hooks/useGetAllProducts";

import Card from "@/components/Card/Card";

import "./ProductsPage.css";

export default function ProductsPage() {
  const { products } = useGetAllProducts();

  const isNikoraStore = (storeName: string) => {
    return storeName && storeName.toLowerCase().includes("nikora");
  };

  return (
    <div className="products-grid">
      {products?.map((product, index) => {
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
          />
        );
      })}
    </div>
  );
}
