import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import Products from './components/Products';
import { commerce } from './lib/commerce';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();

      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <Products products={products} />
    </div>
  );
}

export default App;
