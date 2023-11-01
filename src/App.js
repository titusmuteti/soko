import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import NavBar from './components/NavBar';
import Products from './components/Products';
import ProductDetailsWrapper from './components/ProductDetailsWraper';
import Cart from './pages/Cart';
import './app.css';
import { CartProvider } from './CartContext';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((products) => setProducts(products));
  }, []);

  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Products productsList={products} />} />
          <Route path="/products/:index" element={<ProductDetailsWrapper products={products} />} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;
