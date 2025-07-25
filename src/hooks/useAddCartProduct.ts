import { useState } from "react";
import { Product } from "./useGetAllProducts";

import axios from "axios";

export const useAddCartProducts = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addToCart = async (product: Product) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const requestBody = {
        productName: product?.productName,
        newPrice: product?.price,
        oldPrice: product?.oldPrice || 0,
        imageUrl: product?.imageUrl || "",
        store: product?.store || "",
        category: product?.category || "",
        quantity: 1,
      };

      const response = await axios.post(
        "http://localhost:3001/api/cart/add",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addToCart };
};
