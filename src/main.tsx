import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { CartProvider } from './CartContext.js';
import App from './App.tsx';
import './index.css';
import Home from './Home.js';
import Shop from './Shop.js';
import Cart from './Cart.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

function MyApp() {
  return (
      <CartProvider>
          <Route>
              <BrowserRouter>
                  <Route path="/"  Component={Home} />
                  <Route path="/shop" Component={Shop} />
                  <Route path="/cart" Component={Cart} />
              </BrowserRouter>
          </Route>
      </CartProvider>
  );
}
ReactDOM.render(<MyApp />, document.getElementById('root'));

