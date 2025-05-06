import Image from "next/image";

import "../Card/Card.css";

export default function Card({
  image,
  title,
  price,
  daysLeft,
  oldPrice,
}: {
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  daysLeft?: string;
}) {
  return (
    <div className="product-card">
      <div className="product-image">
        <Image
          src={image}
          width={500}
          height={300}
          alt="Description of the image"
        />
      </div>
      <div className="product-info">
        <div className="product-title">{title}</div>
        <div className="product-price">
          <span> {price}₾</span>
          <span className="old-price"> {oldPrice}₾</span>
        </div>
        <span className="days-left">
          {daysLeft ? `დარჩა ${daysLeft} დღე` : ""}
        </span>
      </div>
    </div>
  );
}
