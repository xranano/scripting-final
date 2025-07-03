import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../style/payment.css';

function Payment() {
  const navigate = useNavigate();
  const { cart, currency, convertPrice } = useContext(CartContext);
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    holderName: '',
    expiry: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const [shippingInfo, setShippingInfo] = useState({
    contact: '',
    name: '',
    secondName: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
    country: 'Italy'
  });

  useEffect(() => {
    const savedShippingInfo = sessionStorage.getItem('shippingInfo');
    if (savedShippingInfo) {
      setShippingInfo(JSON.parse(savedShippingInfo));
    }
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.substring(0, 19);
    }
    
    if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(.{2})/, '$1/');
      if (value.length > 5) value = value.substring(0, 5);
    }
    
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) value = value.substring(0, 3);
    }
    
    setFormData({ ...formData, [e.target.name]: value });
    
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    
    if (!/^\d{16}$/.test(cardNumberClean)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.holderName.trim()) {
      newErrors.holderName = 'Cardholder name is required';
    }
    
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Please enter expiry in MM/YY format';
    }
    
    if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      const orderData = {
        items: cart,
        shippingInfo,
        paymentMethod: 'Credit Card',
        total: total
      };
      sessionStorage.setItem('orderData', JSON.stringify(orderData));
      navigate('/confirmation');
    } else {
      setErrors(newErrors);
    }
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const formatAddress = () => {
    const { address, city, postalCode, province, country } = shippingInfo;
    if (!address || !city) return 'Address not provided';
    
    let formattedAddress = address;
    if (city) formattedAddress += `, ${city}`;
    if (postalCode) formattedAddress += ` ${postalCode}`;
    if (province) formattedAddress += `, ${province}`;
    if (country) formattedAddress += `, ${country}`;
    
    return formattedAddress;
  };

  return (
    <div className="payment-container">
      {}
      <nav className="payment-breadcrumb">
        <Link to="/cart">Cart</Link>
        <span className="separator">›</span>
        <Link to="/shipping-info">Details</Link>
        <span className="separator">›</span>
        <Link to="/shipping-method">Shipping</Link>
        <span className="separator">›</span>
        <span className="current">Payment</span>
      </nav>

      <div className="payment-content">
        {}
        <div className="payment-left">
          {}
          <div className="payment-info-card">
            <div className="payment-info-label">Contact</div>
            <p className="payment-info-value">
              {shippingInfo.contact || 'joe.spagnuolo@uxbly.com'}
            </p>
          </div>

          {}
          <div className="payment-info-card">
            <div className="payment-info-label">Ship to</div>
            <p className="payment-info-value">{formatAddress()}</p>
          </div>

          {}
          <div className="payment-info-card">
            <div className="payment-info-label">Method</div>
            <p className="payment-info-value">Standard Shipping - FREE</p>
          </div>

          {}
          <div className="payment-method-section">
            <h2 className="payment-method-title">Payment method</h2>



            {}
            <form onSubmit={handleSubmit} className="payment-form">
              <div className="payment-options">
                <div className="payment-option">
                  <div className="payment-option-icon">💳</div>
                  <p className="payment-option-text">Credit Card</p>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={`form-input secure ${errors.cardNumber ? 'error' : ''}`}
                />
                {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="holderName"
                  placeholder="Name on card"
                  value={formData.holderName}
                  onChange={handleChange}
                  className={`form-input ${errors.holderName ? 'error' : ''}`}
                />
                {errors.holderName && <div className="error-message">{errors.holderName}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    className={`form-input ${errors.expiry ? 'error' : ''}`}
                  />
                  {errors.expiry && <div className="error-message">{errors.expiry}</div>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    className={`form-input ${errors.cvv ? 'error' : ''}`}
                  />
                  {errors.cvv && <div className="error-message">{errors.cvv}</div>}
                </div>
              </div>

              {}
              <div className="payment-navigation">
                <Link to="/shipping-method" className="back-link">
                  Back to shipping
                </Link>
                <button 
                  type="submit" 
                  className="pay-button"
                  disabled={!formData.cardNumber || !formData.holderName || !formData.expiry || !formData.cvv}
                >
                  Pay now
                </button>
              </div>
            </form>
            {}
            
          </div>
        </div>

        {}
        <div className="payment-order-summary">
          {}
          {cart.map((item, index) => (
            <div key={`${item.id}-${item.size}-${index}`} className="summary-product-item">
              <div className="summary-product-image-container">
                <img
                  src={item.image || '/images/placeholder.png'}
                  alt={item.name}
                  className="summary-product-image"
                />
                <span className="summary-quantity-badge">{item.quantity}</span>
              </div>
              <div className="summary-product-details">
                <h3>{item.name}</h3>
                <p className="summary-product-size">Size: {item.size}</p>
                <p className="summary-product-price">{currency} {convertPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}

          {}
          <div className="summary-totals">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">{currency} {convertPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Shipping</span>
              <span className="summary-value">Free Shipping</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>{currency} {convertPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;