"use client";
import { useDispatch } from "react-redux";
import mainLogo from "../../../public/images/salesStores.png";

import Image from "next/image";
import Link from "next/link";

import "@/components/Header/Header.css";

export default function Header() {
  const dispatch = useDispatch();

  const handleHomeNavigation = () => {
    dispatch({ type: "CATEGORY", payload: "" });
    dispatch({ type: "SORT", payload: "discount-percentage-desc" });
  };

  return (
    <header>
      <Link
        rel="preload"
        href={"/"}
        onClick={handleHomeNavigation}
        className="logo"
      >
        <Image src={mainLogo} width={100} height={100} alt="Main logo" />
      </Link>
      <div className="search-container">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>
    </header>
  );
}
