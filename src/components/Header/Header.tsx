"use client";
import { useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SEARCH_KEY } from "@/store/store";

import mainLogo from "../../../public/images/salesStores.png";
import Image from "next/image";
import Link from "next/link";
import SearchModal from "../SearchModal/SearchModal";
import Cart from "../Cart/Cart";

import "@/components/Header/Header.css";

export default function Header() {
  const dispatch = useDispatch();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

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
    dispatch({ type: SEARCH_KEY, payload: term });
    router.push("/products-page");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch({ type: "TERM", payload: value });
  };

  return (
    <>
      {isInputFocused && (
        <>
          <div
            className="darkened-overlay"
            onClick={() => setIsInputFocused(false)}
          />
          <SearchModal />
        </>
      )}
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
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <button onClick={() => handleSearch(searchTerm)}>Search</button>
          <Cart />
        </div>
      </header>
    </>
  );
}
