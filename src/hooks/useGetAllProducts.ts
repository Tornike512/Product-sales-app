"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export interface Product {
  productName: string;
  imageUrl: string;
  daysLeft: string;
  newPrice: string;
  oldPrice?: string | number;
  category: string;
  discountPercentage: string;
  store: string;
  price: string;
}

type StoreData = Product[];

export function useGetAllProducts() {
  const [products, setProducts] = useState<StoreData | null>(null);
  const [loadingAll, setLoadingAll] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function getAllProducts() {
    setLoadingAll(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://product-sales-backend-3.onrender.com/api/promotions`
      );

      if (response.data && response.data.promotions) {
        setProducts(response.data.promotions);
        return response.data.promotions;
      } else {
        console.error("Unexpected API response format:", response.data);
        setError("API returned an unexpected format");
        return [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
      throw error;
    } finally {
      setLoadingAll(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return { products, loadingAll, error };
}
