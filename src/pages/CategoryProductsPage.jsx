import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/api";

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    axios
      .get(`/api/products/category/${categoryId}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [categoryId]);

  return (
    <div>
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((p) => (
          <div key={p._id}>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
          </div>
        ))
      )}
    </div>
  );
}
