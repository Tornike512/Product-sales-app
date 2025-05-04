"use client";

import { useGetAllProducts } from "@/hooks/useGetAllProducts";

import "../Card/Card.css";

export default function Card({ num }: { num: number }) {
  const { products } = useGetAllProducts();

  console.log(products);

  return (
    <div key={num} className="product-card">
      <div className="product-image">
        <img
          src="/placeholder.jpg"
          alt={`Product ${num}`}
          width={200}
          height={200}
        />
      </div>
      <div className="product-info">
        <div className="product-title">Product {num}</div>
        <div className="product-price">${(49 + num * 30).toFixed(2)}</div>
      </div>
    </div>
  );
}
