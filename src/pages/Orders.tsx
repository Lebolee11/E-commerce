import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { Order } from '../types';

const StatusIcon = ({ status }: { status: Order['status'] }) => {
  switch (status) {
    case 'pending':
      return <Clock className="text-yellow-500" />;
    case 'processing':
      return <Package className="text-blue-500" />;
    case 'shipped':
      return <Truck className="text-purple-500" />;
    case 'delivered':
      return <CheckCircle className="text-green-500" />;
    default:
      return null;
  }
};

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${colors[status]}`}>
      <StatusIcon status={status} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const Orders: React.FC = () => {
  const { orders, loading, error } = useOrders();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error loading orders: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
            <p className="mt-1 text-sm text-gray-500">Start shopping to create your first order.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Products
              </button>
            </div>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="border-t border-gray-200 -mx-6 px-6 py-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-2">
                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product?.name}</h4>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 -mx-6 px-6 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-bold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};