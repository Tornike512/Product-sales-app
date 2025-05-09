import { useState, useEffect } from "react";

export function useGetProductsByCategory(category: string | null) {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) {
      setProductsByCategory([]);
      return;
    }

    const fetchProductsByCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/promotions/${category}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProductsByCategory(data);
      } catch (err) {
        console.error("Error fetching products by category:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return { productsByCategory, loading };
}
