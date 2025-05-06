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

interface SparProduct {
  id: string;
  productName: string;
  imageUrl: string;
  price: string;
  source: string;
  store: string;
  category: string;
}

type StoreData = (Product | SparProduct)[];

export function useGetAllProducts() {
  const [products, setProducts] = useState<StoreData | null>(null);

  async function getAllProducts() {
    try {
      const response = await axios.get("http://localhost:3000/api/promotions");
      setProducts(response.data);
      return response.data;
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
