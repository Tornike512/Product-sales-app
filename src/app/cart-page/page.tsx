"use client";
import { useGetCartProducts } from "@/hooks/useGetCartProducts";
import { Product } from "@/hooks/useGetAllProducts";

import Card from "@/components/Card/Card";
import ProductsSkeleton from "@/components/ProductsSkeleton/ProductsSkeleton";
import emptyCartImage from "../../../public/images/empty-cart.png";
import Image from "next/image";

import "../cart-page/CartPage.css";

export default function CartPage() {
  const { cartProducts, loading } = useGetCartProducts();

  if (cartProducts?.length === 0) {
    return (
      <div className="cart-is-empty-container">
        <h1>Cart is empty</h1>
        <Image src={emptyCartImage} alt="Cart is empty image" />;
      </div>
    );
  }

  if (loading) {
    <ProductsSkeleton />;
  }

  return (
    <div className="product-grid">
      {cartProducts?.map((product: Product, index: number) => {
        return (
          <Card
            key={index}
            title={product.productName}
            storeName={product.store}
            image={product.imageUrl}
            price={product.price}
            daysLeft={product.daysLeft}
            oldPrice={product.oldPrice}
            product={product}
          />
        );
      })}
    </div>
  );
}
