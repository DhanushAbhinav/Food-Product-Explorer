import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ProductDetail from './components/ProductDetail';
import './styles.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const fetchProducts = async (reset = false) => {
    setLoading(true);
    const response = await axios.get(https://world.openfoodfacts.org/category/${category}.json?page=${page});
    setLoading(false);
    
    if (reset) {
      setProducts(response.data.products);
    } else {
      setProducts((prev) => [...prev, ...response.data.products]);
    }
  };

  useEffect(() => {
    if (category) {
      fetchProducts(true);
      setPage(1); // Reset page when category changes
    }
  }, [category]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts();
    }
  }, [page]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setProducts([]); // Reset products on search
    setPage(1); // Reset page for search results
  };

  const filteredProducts = products.filter((product) =>
    product.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="app">
        <h1>Food Product Explorer</h1>
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter setCategory={setCategory} />
        <ProductList products={filteredProducts} loading={loading} />
        {filteredProducts.length > 0 && !loading && (
          <button onClick={() => setPage((prev) => prev + 1)}>Load More</button>
        )}
      </div>
      <Switch>
        <Route path="/product/:barcode" component={ProductDetail} />
      </Switch>
    </Router>
  );
};

export default App;