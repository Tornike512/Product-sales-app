import { useGetCartProducts } from "@/hooks/useGetCartProducts";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

import cartIcon from "../../../public/images/cart-logo.png";

import Image from "next/image";

import "../Cart/Cart.css";

export default function Cart() {
  const { cartProducts } = useGetCartProducts();
  const token = useSelector((state: AppState) => {
    return state.authenticate;
  });
  const router = useRouter();

  console.log(token);

  const handleCartNavigation = () => {
    if (token) {
      router.push("/cart-page");
    } else {
      router.push("/sign-in-page");
    }
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
