"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useGetAllProducts } from "@/hooks/useGetAllProducts";

import "./Sidebar.css";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { products } = useGetAllProducts();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || null
  );

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || null);
  }, [searchParams]);

  const upperCaseStores = () => {
    const stores = products?.map((store) => {
      return store.category;
    });

    const set = new Set(stores);

    const upperCaseStores = [...set].map((store) => {
      return store.charAt(0).toUpperCase() + store.slice(1).replace(/_/g, " ");
    });

    return upperCaseStores;
  };

  const handleCategoryClick = (store: string) => {
    const categoryParam = store.toLowerCase().replace(/ /g, "_");

    const params = new URLSearchParams(searchParams);
    params.set("category", categoryParam);

    setSelectedCategory(store);

    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  return (
    <aside className="sidebar">
      <h2>Stores</h2>
      <ul className="category-list">
        {upperCaseStores()?.map((store, index) => (
          <li key={index} className="category-item">
            <a
              className={`category-link ${
                selectedCategory === store ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(store)}
            >
              {store}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
