import { useState, useEffect } from "react";
import { Product } from "./useGetAllProducts";

import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

export const useGetCartProducts = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const cartCount = useSelector((state: AppState) => {
    return state.updateCart;
  });

  const getCartProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://product-sales-backend-3.onrender.com/api/cart"
      );
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
