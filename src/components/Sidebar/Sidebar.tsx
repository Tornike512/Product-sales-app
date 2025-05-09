"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useGetAllCategories } from "@/hooks/useGetAllCategories";
import Link from "next/link";

import "./Sidebar.css";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { categories } = useGetAllCategories();

  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || null
  );

  const formattedCategory = categories.map((category) => {
    return category
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/^[a-z]/, (match) => match.toUpperCase());
  });

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || null);
  }, [searchParams]);

  const handleCategoryClick = (store: string) => {
    const categoryParam = store.toLowerCase().replace(/ /g, "_");

    dispatch({ type: "CATEGORY", payload: categoryParam });

    const params = new URLSearchParams(searchParams);
    params.set("category", categoryParam);
    const url = `${pathname}?${params.toString()}`;

    router.replace(url, { scroll: false });

    setSelectedCategory(categoryParam);
  };

  return (
    <aside className="sidebar">
      <h2>Categories</h2>
      <ul className="category-list">
        {formattedCategory?.map((store, index) => (
          <li key={index} className="category-item">
            <Link
              href="#"
              className={`category-link ${
                selectedCategory === store ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(store);
              }}
            >
              {store}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
