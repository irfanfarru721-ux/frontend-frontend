import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage(){
  const { cart, removeFromCart, updateQty, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0);

  return (
    <div style={{padding:20}}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div>No items. <Link to="/">Go shopping</Link></div>
      ) : (
        <>
          <div style={{display:'grid', gap:12}}>
            {cart.map(item => (
              <div key={item.productId} style={{border:'1px solid #ddd', padding:12, borderRadius:8}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:700}}>{item.name}</div>
                    <div>₹{item.price} x {item.qty}</div>
                  </div>
                  <div>
                    <button onClick={()=>updateQty(item.productId, Math.max(1, item.qty - 1))}>-</button>
                    <span style={{padding:'0 8px'}}>{item.qty}</span>
                    <button onClick={()=>updateQty(item.productId, item.qty + 1)}>+</button>
                  </div>
                </div>
                <div style={{marginTop:8}}>
                  <button onClick={()=>removeFromCart(item.productId)} style={{background:'red', color:'#fff', border:'none', padding:'6px 8px'}}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:20}}>
            <div style={{fontWeight:700}}>Total: ₹{total}</div>
            <button onClick={()=>navigate('/checkout')} style={{marginTop:8, padding:'8px 12px', background:'#0369a1', color:'#fff', border:'none'}}>Proceed to Checkout</button>
            <button onClick={clearCart} style={{marginLeft:12}}>Clear</button>
          </div>
        </>
      )}
    </div>
  );
}
