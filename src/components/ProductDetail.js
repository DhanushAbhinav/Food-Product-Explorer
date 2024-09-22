import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail = ({ match }) => {
  const { barcode } = match.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(https://world.openfoodfacts.org/api/v0/product/${barcode}.json);
      setProduct(response.data.product);
      setLoading(false);
    };
    fetchProduct();
  }, [barcode]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail">
      <h1>{product.product_name}</h1>
      <img src={product.image_url} alt={product.product_name} />
      <p>Ingredients: {product.ingredients_text || 'N/A'}</p>
      <p>Nutritional Values: {JSON.stringify(product.nutriments) || 'N/A'}</p>
      <p>Labels: {product.labels?.join(', ') || 'N/A'}</p>
    </div>
  );
};

export default ProductDetail;