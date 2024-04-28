import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductForm from './components/ProductForm';

import UserSignup from './components/UserSignup';
import UserLogin from './components/UserLogin';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [token, setToken] = useState('');

  // Optional: Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      
      setIsLoggedIn(true); // Set login state if token exists
      console.log('User already logged in with token:', token);
    }
    setIsLoading(false); // Set loading state to false once done
    setToken(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Router>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="/signup" element={<UserSignup />} />
            <Route
              path="/login"
              element={<UserLogin onLogin={() => setIsLoggedIn(true)} />}
            />

            {/* Protected routes */}
            <Route
              path="/products"
              element={isLoggedIn ? <ProductList /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/products/:productId"
              element={isLoggedIn ? <ProductDetail token={token}/> : <Navigate to="/login" replace />}
            />
            <Route
              path="/products/edit/:productId"
              element={isLoggedIn ? <ProductForm token={token} /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/products/new"
              element={isLoggedIn ? <ProductForm token={token}/> : <Navigate to="/login" replace />}
            />

            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:orderId" element={<OrderDetail />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
