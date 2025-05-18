"use client";

import Card from "@/components/Card/Card";

import "../cart-page/CartPage.css";
import { useGetCartProducts } from "@/hooks/useGetCartProducts";

export default function CartPage() {
  const { cartProducts } = useGetCartProducts();

  const isNikoraStore = (storeName: string) => {
    return storeName && storeName.toLowerCase().includes("nikora");
  };

  if (cartProducts?.length === 0) {
    return <div>Cart is empty</div>;
  }

  console.log(cartProducts);

  return (
    <div className="product-grid">
      {cartProducts?.map((product: any, index: any) => {
        const rawNewPrice = Number(
          typeof product.price === "string"
            ? product.price.replace(",", ".")
            : product.price
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
  );
}
