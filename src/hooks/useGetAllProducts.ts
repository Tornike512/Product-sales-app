"use client";
import { useState, useEffect } from "react";

import axios from "axios";

interface Product {
  productName: string;
  imageUrl: string;
  daysLeft: string;
  newPrice: string;
  oldPrice: string;
  category: string;
  discountPercentage: string;
  store: string;
}

type StoreData = Product[];

export function useGetAllProducts() {
  const [products, setProducts] = useState<StoreData | null>(null);
  const [loadingAll, setLoadingAll] = useState<boolean>(true);

  async function getAllProducts() {
    setLoadingAll(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/promotions?page=1&limit=20"
      );

      setProducts(response.data.promotions);
      return response.data.promotions;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    } finally {
      setLoadingAll(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return { products, loadingAll };
}
