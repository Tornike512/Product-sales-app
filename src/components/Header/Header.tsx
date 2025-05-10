"use client";
import { useDispatch } from "react-redux";

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
        MyShop
      </Link>
      <div className="search-container">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>
    </header>
  );
}
