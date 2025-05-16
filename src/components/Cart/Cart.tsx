import { useRouter } from "next/navigation";

import cartIcon from "../../../public/images/cart-logo.png";

import Image from "next/image";

import "../Cart/Cart.css";

export default function Cart() {
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
      <div className="cart-counter">1</div>
    </div>
  );
}
