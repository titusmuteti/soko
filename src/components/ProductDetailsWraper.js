import React from "react";
import { useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';

function ProductDetailsWrapper({ products }) {
  const { id } = useParams(); 

  if (!products || products.length === 0) {   
    return <div>Loading...</div>;
  }

  const product = products.find(product => product.id === parseInt(id, 10));

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetails product={product} />;
}

export default ProductDetailsWrapper;
