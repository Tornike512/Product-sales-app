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
    <Image
      onClick={handleCartNavigation}
      className="cart"
      src={cartIcon}
      alt="Cart Icon"
    />
  );
}
