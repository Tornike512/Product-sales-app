import { useState, useEffect } from "react";
import { Product } from "./useGetAllProducts";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

import axios from "axios";

export const useGetCartProducts = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const cartCount = useSelector((state: AppState) => {
    return state.updateCart;
  });

  const getCartProducts = async () => {
    setLoading(true);

    const token = localStorage.getItem("token") || "";
    try {
      const response = await axios.get("http://localhost:3001/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartProducts(response.data.cart);
    } catch (error) {
      console.error(error, "Error fetching cart products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartProducts();
  }, [cartCount]);

  return { cartProducts, loading };
};
