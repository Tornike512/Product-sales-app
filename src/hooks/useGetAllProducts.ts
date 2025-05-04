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
}

interface ProductCategories {
  alcohol: Product[];
  conserve: Product[];
  household_chemicals: Product[];
  sweets: Product[];
  fish: Product[];
  soft_drinks: Product[];
  coffee_tea: Product[];
  snacks: Product[];
  diary_products: Product[];
  frozen_products: Product[];
  meat_products: Product[];
  confentionery: Product[];
  fruits_and_vegetables: Product[];
  kitchen_accessories: Product[];
  textiles: Product[];
  school_things: Product[];
  toys: Product[];
  accessories: Product[];
}

interface SparProduct {
  id: string;
  title: string;
  imageUrl: string;
  price: string;
  source: string;
}

interface SparStore {
  discounted: SparProduct[];
}

interface StoreData {
  nikora: ProductCategories;
  spar: SparStore;
}

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
