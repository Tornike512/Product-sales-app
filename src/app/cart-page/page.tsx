"use client";

import Card from "@/components/Card/Card";
import "../cart-page/CartPage.css";
import { useGetCartProducts } from "@/hooks/useGetCartProducts";
import { Product } from "@/hooks/useGetAllProducts";
import ProductsSkeleton from "@/components/ProductsSkeleton/ProductsSkeleton";

export default function CartPage() {
  const { cartProducts, loading } = useGetCartProducts();

  if (cartProducts?.length === 0) {
    return <div>Cart is empty</div>;
  }

  if (loading) {
    <ProductsSkeleton />;
  }

  console.log(loading);

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
