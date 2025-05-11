"use client";
import { useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import mainLogo from "../../../public/images/salesStores.png";
import Image from "next/image";
import Link from "next/link";

import "@/components/Header/Header.css";
import ProductsPage from "@/views/ProductsPage/ProductsPage";
import SearchModal from "../SearchModal/SearchModal";

export default function Header() {
  const dispatch = useDispatch();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleHomeNavigation = () => {
    dispatch({ type: "CATEGORY", payload: "" });
    dispatch({ type: "SORT", payload: "discount-percentage-desc" });
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleSearch = (term: string) => {
    dispatch({ type: "TERM", payload: term });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <>
      {isInputFocused && (
        <>
          <div
            className="darkened-overlay"
            onClick={() => setIsInputFocused(false)}
          />
        </>
      )}
      <header>
        <SearchModal />
        <Link
          rel="preload"
          href={"/"}
          onClick={handleHomeNavigation}
          className="logo"
        >
          <Image src={mainLogo} width={100} height={100} alt="Main logo" />
        </Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <button onClick={() => handleSearch(searchTerm)}>Search</button>
        </div>
      </header>
    </>
  );
}
