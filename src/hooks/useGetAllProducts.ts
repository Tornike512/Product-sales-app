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

  async function getAllProducts() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/promotions?page=1&limit=10"
      );

      setProducts(response.data.promotions);
      return response.data.promotions;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return { products };
}
