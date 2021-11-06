import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Product, Cart } from './components';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    // console.log('memanggil products');

    setProducts(data);
  };

  const fetchCart = async () => {
    // console.log('memanggil cart');

    setCart(await commerce.cart.retrieve());
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [products, cart]);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products
        products={products}
        onAddToCart={(productId, quantity) =>
          handleAddToCart(productId, quantity)
        }
      /> */}
      <Cart cart={cart} />
    </div>
  );
}

export default App;
