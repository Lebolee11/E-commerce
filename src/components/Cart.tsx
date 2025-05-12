import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          total: state.total,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = state.items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear the cart
      dispatch({ type: 'CLEAR_CART' });
      
      // Navigate to orders page
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {state.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">R{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) },
                      })
                    }
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: item.id, quantity: item.quantity + 1 },
                      })
                    }
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus size={20} />
                  </button>
                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
                    }
                    className="p-1 text-red-500 hover:bg-red-50 rounded-full ml-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>R{state.total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};