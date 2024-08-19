import React from 'react';

function ProductList({ products }) {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
