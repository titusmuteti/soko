import React, {useEffect, useState} from 'react';
import NavBar from './components/NavBar';
import Products from './components/Products';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(()=> {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products=>setProducts(products))
  }, [])

  return (
    <>
    <NavBar/>
    <Products productsList={products}/>
    </>
  );
}

export default App;
