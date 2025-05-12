import React from 'react';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Shop = () => {
    const { addToCart } = useContext(CartContext);

    const products = [
        { id: 'lemon', name: 'Lemons', price: 29.99 },
        { id: 'orange', name: 'Oranges', price: 39.99 },
        // Add more products as needed
    ];

    return (
        <div>
            <h1>Shop</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>Price: R {product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
