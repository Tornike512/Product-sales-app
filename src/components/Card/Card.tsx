import { ADD_TO_CART } from "@/store/store";
import { useDispatch } from "react-redux";

import Image from "next/image";

import nikoraLogo from "../../../public/images/nikora.png";
import oriNabijiLogo from "../../../public/images/oriNabiji.png";
import sparLogo from "../../../public/images/spar.png";

import "../Card/Card.css";

export default function Card({
  image,
  title,
  price,
  daysLeft,
  oldPrice,
  storeName,
}: {
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  daysLeft?: string;
  storeName?: string;
}) {
  const dispatch = useDispatch();

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
      case "smart":
        return "/smart.png";
      default:
        return "/placeholder.jpg";
    }
  };

  const handleAddToCart = (productName: string) => {
    console.log(productName);

    dispatch({ type: ADD_TO_CART, payload: productName });
  };

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
        <button
          onClick={() => handleAddToCart(title)}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
      <div className="product-info">
        <div className="product-title">{title}</div>
        <div className="product-price">
          <span> {price}₾</span>
          {oldPrice !== "NaN" &&
            oldPrice !== undefined &&
            oldPrice !== null &&
            oldPrice !== "" &&
            oldPrice !== "0.00" && (
              <span className="old-price">{oldPrice}₾</span>
            )}{" "}
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
