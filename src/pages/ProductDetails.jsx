import React, { useEffect, useState, useContext } from "react";
import { getProduct } from "../api/api";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductDetails(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!id) return;
    getProduct(id).then(r=>setProduct(r.data));
  }, [id]);

  if (!product) return <div style={{padding:20}}>Loading...</div>;

  return (
    <div style={{padding:20}}>
      <h2>{product.name}</h2>
      <p>₹ {product.price}</p>
      <p>{product.description}</p>
      <button onClick={()=>addToCart(product)} style={{padding:'8px 12px', background:'#0369a1', color:'#fff'}}>Add to cart</button>
    </div>
  );
}
