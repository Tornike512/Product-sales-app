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
        {products?.map((product) => (
          <Card key={product.id} image={product.image} />
        ))}
      </div>
    </>
  );
}
