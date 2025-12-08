import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/api";
import { CartContext } from "../context/CartContext";

export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!categoryId) return;

    getProductsByCategory(categoryId)
      .then((res) => {
        console.log("Fetched Products:", res.data); // Debug
        setProducts(res.data);
      })
      .catch((err) => console.error("API Error:", err));
  }, [categoryId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Category Products</h2>

      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
            gap: 12,
          }}
        >
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div>Vendor: {p.vendorId?.name}</div>
              <div>Category: {p.categoryId?.name}</div>
              <div>Price: ₹{p.price}</div>
              <button
                onClick={() => addToCart(p)}
                style={{
                  marginTop: 8,
                  padding: "8px 10px",
                  background: "#0369a1",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Debug raw JSON for mobile */}
      <pre style={{ marginTop: 20 }}>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
