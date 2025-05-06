"use client";

import { useGetAllProducts } from "@/hooks/useGetAllProducts";

import "./Sidebar.css";

export default function Sidebar() {
  const { products } = useGetAllProducts();

  const upperCaseStores = () => {
    const stores = products?.map((store) => {
      return store.store;
    });

    const set = new Set(stores);

    const upperCaseStores = [...set].map((store) => {
      return store.charAt(0).toUpperCase() + store.slice(1).replace(/_/g, " ");
    });

    return upperCaseStores;
  };

  return (
    <aside className="sidebar">
      <h2>Stores</h2>
      <ul className="category-list">
        {upperCaseStores()?.map((store, index) => (
          <li key={index} className="category-item">
            <a className="category-link">{store}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
