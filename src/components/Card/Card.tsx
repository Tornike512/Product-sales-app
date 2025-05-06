import Image from "next/image";

import "../Card/Card.css";

export default function Card({
  image,
  title,
  price,
}: {
  image: string;
  title: string;
  price: string;
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
        <div className="product-price">{price}</div>
      </div>
    </div>
  );
}
