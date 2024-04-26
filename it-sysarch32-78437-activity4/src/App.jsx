import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

import UserSignup from './components/UserSignup';
/* 
import ProductForm from './components/ProductForm';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';

import UserLogin from './components/UserLogin'; */

function App() {


  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </Router>

      
      
    </>
  )
}

export default App
