import { useDispatch } from "react-redux";
import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { useState } from "react";
import { AppState, SHOW_TOAST } from "@/store/store";
import { useSelector } from "react-redux";
import { Product } from "@/hooks/useGetAllProducts";

import "../SearchModal/SearchModal.css";
import Image from "next/image";

export default function SearchModal() {
  const dispatch = useDispatch();
  const { products } = useGetAllProducts();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const term = useSelector((state: AppState) => state.term);

  const isNikoraStore = (storeName: string) => {
    return storeName && storeName.toLowerCase().includes("nikora");
  };

  const formatPrice = (price: string, storeName: string) => {
    const numericPrice = Number(
      typeof price === "string" ? price.replace(",", ".") : price
    );

    const finalPrice = isNikoraStore(storeName)
      ? numericPrice / 100
      : numericPrice;
    return finalPrice.toFixed(2);
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
    return Math.round(((old - current) / old) * 100);
  };

  const searchProducts = products
    ? products.filter((product: Product) => {
        return product.productName.includes(term);
      })
    : [];

  const handleAddToCartButton = () => {
    dispatch({ type: SHOW_TOAST, payload: true });
  };

  if (!searchProducts || searchProducts.length === 0) {
    return (
      <div className="search-modal-container">
        <div className="search-modal-empty">
          <p>No products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-modal-container">
      <h2 className="search-modal-title">Featured Products</h2>
      <div className="search-modal-grid">
        {searchProducts?.map((product: Product, index: number) => {
          const formattedNewPrice = formatPrice(
            product.newPrice,
            product.store
          );
          const formattedOldPrice = formatPrice(
            product.oldPrice,
            product.store
          );
          const discountPercentage = getDiscountPercentage(product);

          return (
            <div
              key={index}
              className="search-modal-product"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="search-modal-product-image">
                <Image fill src={product?.imageUrl} alt={product.productName} />
                {discountPercentage > 0 && (
                  <div className="search-modal-discount-badge">
                    -{discountPercentage}%
                  </div>
                )}
                {hoveredIndex === index && (
                  <div className="search-modal-product-overlay">
                    <button
                      onClick={handleAddToCartButton}
                      className="search-modal-btn secondary-btn"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
              <div className="search-modal-product-info">
                <h3>{product.productName}</h3>
                <div className="search-modal-store">{product.store}</div>
                <div className="search-modal-product-price">
                  {product.oldPrice &&
                    Number(formattedOldPrice) > Number(formattedNewPrice) && (
                      <span className="new-price">${formattedNewPrice}</span>
                    )}
                  <span className="old-price">${formattedOldPrice}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="search-modal-footer">
        <button className="search-modal-view-all">View All Products</button>
      </div>
    </div>
  );
}
