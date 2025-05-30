import { TOASTS, UPDATE_CART } from "@/store/store";
import { useDispatch } from "react-redux";
import { useAddCartProducts } from "@/hooks/useAddCartProduct";
import { Product } from "@/hooks/useGetAllProducts";
import { useDeleteCartProducts } from "@/hooks/useDeleteCartProduct";
import { usePathname } from "next/navigation";

import Image from "next/image";

import Loader from "../Loader/Loader";
import nikoraLogo from "../../../public/images/nikora.png";
import oriNabijiLogo from "../../../public/images/oriNabiji.png";
import sparLogo from "../../../public/images/spar.png";
import euroProductIcon from "../../../public/images/europroduct.png";
import trashIcon from "../../../public/images/trash-icon.png";

import "../Card/Card.css";

export default function Card({
  image,
  title,
  price,
  daysLeft,
  oldPrice,
  storeName,
  product,
}: {
  image: string;
  title: string;
  price: string;
  oldPrice?: string | number;
  daysLeft?: string;
  storeName?: string;
  product: Product;
}) {
  const dispatch = useDispatch();

  const pathname = usePathname();

  const { addToCart } = useAddCartProducts();
  const { deleteCartProduct, loading } = useDeleteCartProducts();

  const renderImageByStore = (storeName: string | undefined) => {
    switch (storeName) {
      case "nikora":
        return nikoraLogo;
      case "Nikora":
        return nikoraLogo;
      case "2nabiji":
        return oriNabijiLogo;
      case "Spar":
        return sparLogo;
      case "Europroduct":
        return euroProductIcon;
      case "europroduct":
        return euroProductIcon;
      default:
        return "/placeholder.jpg";
    }
  };

  const handleAddToCart = async () => {
    const productToAdd = {
      ...product,
      productName: title,
      price: price,
      oldPrice: oldPrice ?? "",
      imageUrl: image,
      store: storeName ?? "",
    };

    await addToCart(productToAdd);
    dispatch({ type: TOASTS, payload: true });
    dispatch({ type: UPDATE_CART });
  };

  const handleRemoveCartProduct = async (identifier: string) => {
    deleteCartProduct(identifier);
    dispatch({ type: UPDATE_CART });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <Image
          src={image || "/placeholder.jpg"}
          width={500}
          height={300}
          loading="lazy"
          alt="Product image"
        />
        {pathname !== "/cart-page" && (
          <button onClick={() => handleAddToCart()} className="add-to-cart-btn">
            Add to Cart
          </button>
        )}
        {pathname === "/cart-page" && (
          <Image
            className="trash-icon"
            src={trashIcon}
            width={100}
            height={100}
            alt="Trash icon"
            onClick={() => handleRemoveCartProduct(title)}
          />
        )}
      </div>
      <div className="product-info">
        <div className="product-title">{title}</div>
        <div className="product-price">
          <span> {price}₾</span>
          {oldPrice !== "NaN" &&
            oldPrice !== undefined &&
            oldPrice !== 0 &&
            oldPrice !== null &&
            oldPrice !== "" &&
            oldPrice !== "0.00" && (
              <span className="old-price">{oldPrice}₾</span>
            )}
        </div>
        <span className="days-left">
          {daysLeft ? `დარჩა ${daysLeft} დღე` : ""}
        </span>
        <div className="store-name">
          <Image
            width={100}
            height={100}
            alt="Store Name"
            src={renderImageByStore(storeName)}
          />
        </div>
      </div>
    </div>
  );
}
