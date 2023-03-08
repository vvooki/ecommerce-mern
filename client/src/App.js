import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsList from './pages/ProductsList';
import SingleProduct from './pages/SingleProduct';
import SharedLayout from './pages/SharedLayout';
import Error from './pages/Error';
import Models from './pages/Models';
import Success from './pages/Success';
import Orders from './pages/Orders.jsx';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/:category" element={<ProductsList />} />
          <Route path="product/:productId" element={<SingleProduct />} />
          <Route
            path="register"
            element={user ? <Navigate replace to="/" /> : <Register />}
          />
          <Route
            path="login"
            element={user ? <Navigate replace to="/" /> : <Login />}
          />
          <Route
            path="orders"
            element={user ? <Orders /> : <Navigate replace to="/" />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="success" element={<Success />} />
          <Route path="models" element={<Models />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
