import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async productId => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.delete();

    setCart(cart);
  };

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <Navbar totalItems={cart?.total_items || 0} />
      <Switch>
        <Route exact path="/">
          <Products products={products} handleAddToCart={handleAddToCart} />
        </Route>
        <Route exact path="/cart">
          <Cart
            cart={cart}
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
          />
        </Route>
        <Route exact path="/checkout">
          <Checkout cart={cart} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
