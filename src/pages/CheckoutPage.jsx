import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../api/api";

export default function CheckoutPage(){
  const { cart, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!address) return alert("Enter address");
    const items = cart.map(i => ({ productId: i.productId, qty: i.qty }));
    try {
      await createOrder({ items, shippingAddress: address, phone });
      clearCart();
      alert("Order placed");
      navigate("/");
    } catch (err) {
      alert("Order failed");
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Checkout</h2>
      <div>
        <input placeholder="Shipping address" value={address} onChange={e=>setAddress(e.target.value)} style={{display:'block', width:'100%', padding:8, marginBottom:8}}/>
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} style={{display:'block', width:'100%', padding:8, marginBottom:8}}/>
        <button onClick={handlePlaceOrder} style={{padding:'8px 12px', background:'#0369a1', color:'#fff'}}>Place Order</button>
      </div>
    </div>
  );
}
