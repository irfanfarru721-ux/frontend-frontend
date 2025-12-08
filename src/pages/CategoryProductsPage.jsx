import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/api.js";

export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    getProductsByCategory(categoryId)
      .then((res) => {
        console.log("Fetched Products:", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error("API Error:", err));
  }, [categoryId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Category Products</h2>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
