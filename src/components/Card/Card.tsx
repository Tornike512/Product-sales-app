import Image from "next/image";

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
        <div className="store-name">{storeName}</div>
      </div>
    </div>
  );
}
