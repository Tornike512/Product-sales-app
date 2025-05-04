import Image from "next/image";

import "../Card/Card.css";

export default function Card({
  num,
  image,
  title,
  price,
  id,
}: {
  num: number;
  image: string;
  title: string;
  price: number;
  id: string;
}) {
  return (
    <div key={id} className="product-card">
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
