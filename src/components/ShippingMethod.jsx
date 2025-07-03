import '../style/shipping-method.css';
import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

function ShippingMethod() {
  const { currency, cart, shippingInfo } = useContext(CartContext);
  const [selectedMethod, setSelectedMethod] = useState('standard');

  const methods = [
    { id: 'standard', name: 'Standard Shipping', price: 0, duration: 'Free' },
    { id: 'express', name: 'Express Shipping', price: 4.99, duration: '4.99$' }
  ];

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const selectedShipping = methods.find(m => m.id === selectedMethod);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const total = subtotal + shippingCost;

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selectedMethod) {
      navigate('/payment');
    }
  };

  return (
    <div className="shipping-method-container">
      <div className="shipping-method-wrapper">
        <nav className="breadcrumb">
          <a href="#" className="breadcrumb-link">Cart</a>
          <span className="breadcrumb-separator">›</span>
          <a href="#" className="breadcrumb-link">Details</a>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Shipping</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-inactive">Payment</span>
        </nav>

        <div className="shipping-method-grid">
          <div className="shipping-method-left">
            <div className="info-card">
              <div className="info-label">Contact</div>
              <p className="info-value">{shippingInfo.contact}</p>
            </div>
            <div className="info-card">
              <div className="info-label">Ship to</div>
              <p className="info-value">
                {shippingInfo.address}, {shippingInfo.postalCode}, {shippingInfo.city} {shippingInfo.province}, {shippingInfo.country}
              </p>
            </div>

            <div className="shipping-method-section">
              <h2 className="shipping-method-title">Shipping method</h2>
              <div className="shipping-options">
                {methods.map(method => (
                  <div key={method.id} className={`shipping-option ${selectedMethod === method.id ? 'selected' : ''}`} onClick={() => setSelectedMethod(method.id)}>
                    <div className="shipping-option-left">
                      <input type="radio" name="shippingMethod" value={method.id} checked={selectedMethod === method.id} onChange={() => setSelectedMethod(method.id)} className="shipping-radio" />
                      <p className="shipping-option-name">{method.name}</p>
                    </div>
                    <div>
                      <p className="shipping-option-price">{method.duration}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shipping-navigation">
                <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }} className="back-link">
                  Back to details
                </a>
                <button onClick={handleSubmit} disabled={!selectedMethod} className={`continue-button ${selectedMethod ? 'enabled' : 'disabled'}`}>
                  Go to payment
                </button>
              </div>
            </div>
          </div>

          <div className="order-summary">
            {cart.map((item, index) => (
              <div key={`${item.id}-${item.size}-${index}`} className="product-item">
                <div className="product-image-container">
                  <img src={item.image || '/images/placeholder.png'} alt={item.name} className="product-image" />
                  <span className="quantity-badge">{item.quantity}</span>
                </div>
                <div className="product-details">
                  <h3 className="product-name">{item.name}</h3>
                  <p className="product-price">{currency} {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}

            <div className="summary-section">
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">{currency} {subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Shipping</span>
                <span className="summary-value">
                  {shippingCost === 0 ? 'Free Shipping' : `${currency} ${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{currency} {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingMethod;
