import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Navbar from './components/Navbar';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import CartOverlay from './components/CartOverlay';
import CartPage from './components/CartPage';
import ShippingInfo from './components/ShippingInfo';
import ShippingMethod from './components/ShippingMethod';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <CartOverlay />
          <Routes>
            <Route path="/" element={<ProductListing category="Women" />} />
            <Route path="/men" element={<ProductListing category="Men" />} />
            <Route path="/kids" element={<ProductListing category="Kids" />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/shipping-method" element={<ShippingMethod />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;