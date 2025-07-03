import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../style/confirmation.css';
import check from '../assets/CheckCircle.png';

function Confirmation() {
  const { convertPrice, currency } = useContext(CartContext);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const savedOrderData = sessionStorage.getItem('orderData');
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    }
  }, []);

  if (!orderData) {
    return (
      <div className="confirmation-page-loading">
        Loading confirmation details...
      </div>
    );
  }

  const { items: cart, total } = orderData;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="confirmation-page">
      {}
      <nav className="confirmation-breadcrumb">
        <Link to="/cart">Cart</Link>
        <span className="separator">›</span>
        <Link to="/shipping-info">Details</Link>
        <span className="separator">›</span>
        <Link to="/shipping-method">Shipping</Link>
        <span className="separator">›</span>
        <span className="current">Payment</span> {}
      </nav>

      <div className="confirmation-content-wrapper">
        {}
        <div className="confirmation-left-section">
          <div className="confirmation-status-box">
            <img src={check} alt="" />
            <h2 className="confirmation-title">Payment Confirmed</h2>
            <p className="confirmation-order-number">ORDER #2039</p> {}
          </div>
          <Link to="/" className="back-to-shopping-button">
            Back to shopping
          </Link>
        </div>

        {}
        <div className="confirmation-right-section">
          {}
          {cart.length > 0 && (
            <div className="confirmation-order-item">
              <div className="confirmation-item-image-wrapper">
                <img
                  src={cart[0].image || '/images/placeholder.png'}
                  alt={cart[0].name}
                  className="confirmation-item-image"
                />
                <span className="confirmation-item-quantity-badge">{cart[0].quantity}</span>
              </div>
              <div className="confirmation-item-details">
                <p className="confirmation-item-name">{cart[0].name}</p>
                {}
                <p className="confirmation-item-price">{currency} {convertPrice(cart[0].price)}</p>
              </div>
            </div>
          )}

          <div className="confirmation-summary-details">
            <div className="confirmation-summary-row">
              <span className="confirmation-summary-label">Subtotal</span>
              <span className="confirmation-summary-value">{currency} {convertPrice(subtotal)}</span>
            </div>
            <div className="confirmation-summary-row">
              <span className="confirmation-summary-label">Shipping</span>
              <span className="confirmation-summary-value">Free Shipping</span>
            </div>
            <div className="confirmation-summary-separator"></div>
            <div className="confirmation-summary-row confirmation-total-row">
              <span className="confirmation-summary-label">Paid</span>
              <span className="confirmation-summary-value-paid">{currency} {convertPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;