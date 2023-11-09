import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

import NavBar from './components/NavBar';
import Products from './components/Products';
import ProductDetailsWrapper from './components/ProductDetailsWraper';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Login from './pages/Login';
import Signup from './pages/signup';
import './app.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://sokoapi.onrender.com/products')
      .then((response) => response.json())
      .then((products) => setProducts(products));
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products productsList={products} />} />
        <Route path="/products/:id" element={<ProductDetailsWrapper products={products} />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
      <ToastContainer autoClose={1000} />
    </Router>
  );
}

export default App;
