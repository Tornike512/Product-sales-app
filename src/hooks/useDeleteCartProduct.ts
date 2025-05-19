import { useState } from "react";
import axios from "axios";

export const useDeleteCartProducts = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteCartProduct = async (productIdentifier: string) => {
    setLoading(true);

    try {
      const encodedProductIdentifier = encodeURIComponent(productIdentifier);

      const response = await axios.delete(
        `https://product-sales-backend-3.onrender.com/api/cart/item/${encodedProductIdentifier}`
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting cart product:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCartProduct, loading };
};
