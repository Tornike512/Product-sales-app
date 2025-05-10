import oriNabijiImage from "../../../public/images/oriNabijiImage.png";
import nikoraImage from "../../../public/images/nikora-image.jpg";
import sparImage from "../../../public/images/spar-image.jpg";

import Link from "next/link";
import Image from "next/image";

import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="container">
      <h1>Added Stores</h1>
      <div className="grid-container">
        <Link
          target="blank"
          href="https://2nabiji.ge/ge"
          className="image-card"
        >
          <Image
            src={oriNabijiImage}
            alt="Ori Nabiji Store"
            className="store-image"
          />
        </Link>
        <Link target="blank" href="https://nikora.ge/" className="image-card">
          <Image src={nikoraImage} alt="Nikora Store" className="store-image" />
        </Link>
        <Link
          target="blank"
          href="https://spargeorgia.com/"
          className="image-card"
        >
          <Image src={sparImage} alt="Spar Store" className="store-image" />
        </Link>
      </div>
    </div>
  );
}
