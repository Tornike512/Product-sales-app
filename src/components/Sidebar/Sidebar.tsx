"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useGetAllCategories } from "@/hooks/useGetAllCategories";
import SidebarSkeleton from "../SidebarSkeleton/SidebarSkeleton";

import Link from "next/link";

import "./Sidebar.css";

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { categories, loading } = useGetAllCategories();

  const dispatch = useDispatch();

  const categoryParam = searchParams.get("category") || null;
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  useEffect(() => {
    const newCategory = searchParams.get("category") || null;
    setSelectedCategory(newCategory);

    if (newCategory) {
      dispatch({ type: "CATEGORY", payload: newCategory });
    }
  }, [searchParams, dispatch]);

  const handleCategoryClick = (category: string) => {
    const categoryParam = category.toLowerCase().replace(/ /g, "_");

    dispatch({ type: "CATEGORY", payload: categoryParam });

    const params = new URLSearchParams(searchParams);
    params.set("category", categoryParam);
    const url = `/?${params.toString()}`;
    router.replace(url, { scroll: false });

    setSelectedCategory(categoryParam);
  };

  const formattedCategories = categories.map((category) => {
    return {
      displayName: category
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/^[a-z]/, (match) => match.toUpperCase()),
      paramName: category.toLowerCase().replace(/ /g, "_"),
    };
  });

  if (loading) {
    return <SidebarSkeleton />;
  }

  console.log(loading);

  return (
    <aside className="sidebar">
      <h2>Categories</h2>
      <ul className="category-list">
        {formattedCategories?.map((category, index) => (
          <li key={index} className="category-item">
            <Link
              rel="preload"
              href="#"
              className={`category-link ${
                selectedCategory === category.paramName ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(category.displayName);
              }}
            >
              {category.displayName}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
