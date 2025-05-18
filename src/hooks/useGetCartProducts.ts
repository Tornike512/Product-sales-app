import { useState, useEffect } from "react";
import { Product } from "./useGetAllProducts";

import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

export const useGetCartProducts = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>();

  const cartCount = useSelector((state: AppState) => {
    return state.updateCart;
  });

  const getCartProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/cart");
      setCartProducts(response.data.cart);
    } catch (error) {
      console.error(error, "Error fetching cart products");
    }
  };

  useEffect(() => {
    getCartProducts();
  }, [cartCount]);

  return { cartProducts };
};
