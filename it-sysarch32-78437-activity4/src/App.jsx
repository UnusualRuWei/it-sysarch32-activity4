import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductForm from './components/ProductForm';

import UserSignup from './components/UserSignup';
import UserLogin from './components/UserLogin';
/* 

import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';

 */

function App() {


  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/products/new" element={<ProductForm />} />
        </Routes>
      </Router>
   
    </>
  )
}

export default App
