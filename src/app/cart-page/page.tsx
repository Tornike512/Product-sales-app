"use client";

import Card from "@/components/Card/Card";

import "../cart-page/CartPage.css";
import { useGetCartProducts } from "@/hooks/useGetCartProducts";

export default function CartPage() {
  const { cartProducts } = useGetCartProducts();

  if (cartProducts?.length === 0) {
    return <div>Cart is empty</div>;
  }

  return (
    <div className="product-grid">
      {cartProducts?.map((product: any, index: any) => {
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
