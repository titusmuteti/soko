import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

import NavBar from './components/NavBar';
import Products from './components/Products';
import ProductDescription from './components/ProductDescription';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((products) => setProducts(products));
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products productsList={products} />} />
        <Route path="/products/:index" element={<ProductDetailsWrapper products={products} />} />
      </Routes>
    </Router>
  );
}

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

  return <ProductDescription product={product} />;
}

export default App;
