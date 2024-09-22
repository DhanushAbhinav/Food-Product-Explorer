import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products, loading }) => {
  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h2>{product.product_name}</h2>
          <img src={product.image_url} alt={product.product_name} />
          <p>Category: {product.category || 'N/A'}</p>
          <p>Nutrition Grade: {product.nutrition_grades}</p>
          <Link to={/product/${product.code}}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;