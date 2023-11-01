import React from "react";
import { useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';

function ProductDetailsWrapper({ products }) {
    const { index } = useParams();
  
    if (!products || products.length === 0) {   
      return <div>Loading...</div>;
    }
  
    const productIndex = parseInt(index, 10);
  
    if (isNaN(productIndex) || productIndex < 0 || productIndex >= products.length) {
      return <div>Product not found</div>;
    }
  
    const product = products[productIndex];
  
    return <ProductDetails product={product} />;
  }

  export default ProductDetailsWrapper;