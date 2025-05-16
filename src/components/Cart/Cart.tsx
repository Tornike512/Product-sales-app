import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

import cartIcon from "../../../public/images/cart-logo.png";

import Image from "next/image";

import "../Cart/Cart.css";

export default function Cart() {
  const { products } = useGetAllProducts();

  const router = useRouter();

  const handleCartNavigation = () => {
    router.push("/cart-page");
  };

  const cartProductNames = useSelector((state: AppState) => {
    return state.addToCart;
  });

  const cartProducts = products?.filter((product) => {
    return cartProductNames?.includes(product.productName);
  });

  return (
    <div className="cart-icon-container">
      <Image
        onClick={handleCartNavigation}
        className="cart"
        src={cartIcon}
        alt="Cart Icon"
      />
      <div className="cart-counter">{cartProducts?.length}</div>
    </div>
  );
}
