import { useState, useEffect } from "react";

import { Product } from "./useGetAllProducts";

import axios from "axios";

export const useGetCartProducts = () => {
  const [cartProducts, setCartProducts] = useState<any>();

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
  }, []);

  return { cartProducts };
};
