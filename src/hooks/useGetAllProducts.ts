"use client";
import { useState, useEffect } from "react";

import axios from "axios";

export function useGetAllProducts() {
  const [products, setProducts] = useState([]);

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
