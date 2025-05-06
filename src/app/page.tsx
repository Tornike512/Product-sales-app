"use client";

import { useGetAllProducts } from "@/hooks/useGetAllProducts";

import Card from "@/components/Card/Card";

import "./global.css";

export default function Home() {
  const { products } = useGetAllProducts();

  return (
    <>
      <h1>Every Listed Product</h1>
      <div className="product-grid">
        {products?.map((product, index) => (
          <Card
            key={index}
            title={product.productName}
            image={product.imageUrl}
            price={(Number(product.newPrice) / 100).toFixed(2)}
            daysLeft={product.daysLeft}
            oldPrice={(Number(product.oldPrice) / 100).toFixed(2)}
          />
        ))}
      </div>
    </>
  );
}
