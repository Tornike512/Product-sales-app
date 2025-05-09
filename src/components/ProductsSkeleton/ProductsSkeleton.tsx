"use client";

import "./ProductsSkeleton.css";

export default function ProductsSkeleton() {
  return (
    <div className="products-skeleton-container">
      {[...Array(20)].map((_, index) => (
        <div key={index} className="product-skeleton">
          <div className="product-skeleton-image"></div>
          <div className="product-skeleton-title"></div>
          <div className="product-skeleton-price"></div>
          <div className="product-skeleton-button"></div>
        </div>
      ))}
    </div>
  );
}
