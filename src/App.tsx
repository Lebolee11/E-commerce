import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ShoppingCart as CartIcon, LogOut, Package } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Orders } from './pages/Orders';
import { AuthGuard } from './components/AuthGuard';
import { products } from './data/products';
import imageSrc from './images/dream-logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
          <img
        src={imageSrc}
        alt="logo"
        
      />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white">{user?.email}</span>
            <Link
              to="/orders"
              className="p-2 hover:bg-gray-100 rounded-full relative text-orange-600"
              title="Your Orders"
            >
              <Package size={24} />
            </Link>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2 hover:bg-gray-100 rounded-full relative text-orange-600"
              title="Your Cart"
            >
              <CartIcon size={24} />
            </button>
            <button
              onClick={() => signOut()}
              className="p-2 hover:bg-gray-100 rounded-full text-red-600"
              title="Sign out"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isCartOpen ? (
          <Cart />
        ) : (
          children
        )}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Layout>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/orders"
              element={
                <AuthGuard>
                  <Layout>
                    <Orders />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
const Footer: React.FC = () => {
  const footerBottomStyle: React.CSSProperties = {
    background: "rgba(44, 44, 44, 1)",
    color: 'white',
    padding: "1.5rem 0",
    marginTop: "3rem",
    textAlign: "center",
  };
  return (
    <footer>
      <div style={footerBottomStyle}>
      <div className="footer-content">
        <div className="footer-section">
        
          <h3>Contact Info</h3>
          <p>
            <i className="fas fa-map-marker-alt"></i> 30-38 Joubert St,
            Johannesburg 2000
          </p>
          <p>
            <i className="fas fa-phone"></i> 087 510 1816
          </p>
          <p>
            <i className="fas fa-envelope"></i> info@dreamcelsius.co.za
          </p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
          
        </div>
      </div>
      
      <p>&copy; 2024 Dreamcelsius Group. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default App;