import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="App">
      <h1>Dairy Feeds POS System</h1>
      <ProductList products={products} />
      <AddProductForm onAddProduct={addProduct} />
    </div>
  );
}

export default App;
