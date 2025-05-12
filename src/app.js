import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Home from './Home'; // Create this component
import Shop from './Shop'; // Create this component
import Cart from './Cart'; // Create this component


function App() {
    return (
        <CartProvider>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/shop" component={Shop} />
                    <Route path="/cart" component={Cart} />
                </Switch>
            </Router>
        </CartProvider>
    );
}
export default App;