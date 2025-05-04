"use client";

import { useGetAllProducts } from "@/hooks/useGetAllProducts";

import "./Sidebar.css";

export default function Sidebar() {
  const { products } = useGetAllProducts();

  const stores = products ? Object.keys(products) : [];

  const upperCaseStores = stores.map((store) => {
    return store.charAt(0).toUpperCase() + store.slice(1).replace(/_/g, " ");
  });

  return (
    <aside className="sidebar">
      <h2>Stores</h2>
      <ul className="category-list">
        {upperCaseStores.map((product, index) => (
          <li key={index} className="category-item">
            <a className="category-link">{product}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
