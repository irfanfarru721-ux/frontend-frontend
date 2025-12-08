import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/api";


function Product() {
const { id } = useParams();
const [product, setProduct] = useState(null);


useEffect(() => {
getProduct(id).then((res) => setProduct(res.data));
}, [id]);


if (!product) return <div>Loading...</div>;


return (
<div style={{ padding: 20 }}>
<h2>{product.name}</h2>
<p>Price: ₹{product.price}</p>
<p>Description: {product.description}</p>
</div>
);
}
