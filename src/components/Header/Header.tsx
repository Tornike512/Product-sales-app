"use client";

import { useDispatch } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SEARCH_KEY } from "@/store/store";
import { useDebounce } from "@/hooks/useDebounce";

import mainLogo from "../../../public/images/salesStores.png";
import Image from "next/image";
import Link from "next/link";
import SearchModal from "../SearchModal/SearchModal";
import Cart from "../Cart/Cart";
import User from "../User/User";

import "@/components/Header/Header.css";

export default function Header() {
  const dispatch = useDispatch();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    dispatch({ type: "TERM", payload: debouncedSearchTerm });
  }, [debouncedSearchTerm, dispatch]);

  const handleHomeNavigation = () => {
    dispatch({ type: "CATEGORY", payload: "" });
    dispatch({ type: "SORT", payload: "discount-percentage-desc" });
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleSearch = (term: string) => {
    dispatch({ type: SEARCH_KEY, payload: term });
    router.push("/products-page");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const shouldShowHeader =
    pathname !== "/register-page" && pathname !== "/sign-in-page";

  if (!shouldShowHeader) return null;

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
          href="/"
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
          />
          <button onClick={() => handleSearch(searchTerm)}>Search</button>
          <Cart />
          <User />
        </div>
      </header>
    </>
  );
}
