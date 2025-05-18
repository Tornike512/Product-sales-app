import { useState } from "react";
import { Product } from "./useGetAllProducts";

import axios from "axios";

export const useAddCartProducts = (product: Product) => {
  const [loading, setLoading] = useState<boolean>(false);

  const addToCart = async () => {
    setLoading(false);
    try {
      const response = await axios.post("http://localhost:3001/api/cart/add", {
        product: product,
        quantity: 1,
      });
      setLoading(true);

      return response.data;
    } catch (error) {
      console.error(error, "error adding a new product");
    } finally {
      setLoading(false);
    }
  };

  return { loading, addToCart };
};
