import { useGetCartProducts } from "@/hooks/useGetCartProducts";
import { useRouter } from "next/navigation";

import cartIcon from "../../../public/images/cart-logo.png";

import Image from "next/image";

import "../Cart/Cart.css";

export default function Cart() {
  const { cartProducts } = useGetCartProducts();
  const router = useRouter();

  const handleCartNavigation = () => {
    router.push("/cart-page");
  };

  return (
    <div className="cart-icon-container">
      <Image
        onClick={handleCartNavigation}
        className="cart"
        src={cartIcon}
        alt="Cart Icon"
      />
      {cartProducts?.length !== 0 && (
        <div className="cart-counter">{cartProducts?.length}</div>
      )}
    </div>
  );
}
