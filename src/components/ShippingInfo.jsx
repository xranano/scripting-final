import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import '../style/shipping-info.css';

function ShippingInfo() {
  const navigate = useNavigate();
  const { cart, convertPrice, currency, setShippingInfo } = useContext(CartContext);

  const [contact, setContact] = useState('');
  const [name, setName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [address, setAddress] = useState('');
  const [shippingNote, setShippingNote] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('Italy');
  const [saveInfo, setSaveInfo] = useState(false);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const convertedSubtotal = convertPrice(subtotal);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact && name && address && city && postalCode && province && country) {
      setShippingInfo({
        contact,
        name,
        secondName,
        address,
        shippingNote,
        city,
        postalCode,
        province,
        country
      });
      navigate('/shipping-method');
    }
  };

  return (
    <div className="shipping-info">
      <nav className="breadcrumbs">
        <Link to="/cart" className="breadcrumb-link">Cart</Link> {' > '}
        <span className="breadcrumb-active">Details</span> {' > '}
        <span>Shipping</span> {' > '}
        <span>Payment</span>
      </nav>

      <div className="shipping-content">
        <div className="shipping-form">
          <h2 className="shipping-info-title">Contact</h2>
          <input type="text" placeholder="Email or mobile phone number" value={contact} onChange={(e) => setContact(e.target.value)} className="form-input" />

          <h2 className="shipping-info-title">Shipping Address</h2>
          <div className="form-group">
            <div className="form-row">
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
              <input type="text" placeholder="Second Name" value={secondName} onChange={(e) => setSecondName(e.target.value)} className="form-input" />
            </div>
            <input type="text" placeholder="Address and number" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" />
            <input type="text" placeholder="Shipping note (optional)" value={shippingNote} onChange={(e) => setShippingNote(e.target.value)} className="form-input" />
            <div className="form-row">
              <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="form-input" />
              <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="form-input" />
              <select value={province} onChange={(e) => setProvince(e.target.value)} className="form-input">
                <option value="">Province</option>
                <option value="Milan">Milan</option>
                <option value="Rome">Rome</option>
                <option value="Turin">Turin</option>
              </select>
            </div>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="form-input">
              <option value="Italy">Italy</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
            </select>
            <label className="save-info">
              <input type="checkbox" checked={saveInfo} onChange={(e) => setSaveInfo(e.target.checked)} />
              Save this information for a future fast checkout
            </label>
          </div>
        </div>

        <div className="order-summary">
          {cart.map((item, index) => (
            <div key={`${item.id}-${item.size}-${index}`} className="order-item">
              <img src={item.image || '/images/placeholder.png'} alt={item.name} className="order-item-image" />
              <div className="order-item-details">
                <h3 className="order-item-name">{item.name}</h3>
                <p className="order-item-info">Size: {item.size} | Qty: {item.quantity}</p>
                <p className="order-item-price">{currency}{convertPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}

          <div className="summary-details">
            <p>Subtotal <span>{currency}{convertedSubtotal}</span></p>
            <p>Shipping <span>Calculated at the next step</span></p>
            <p>Total <span>{currency}{convertedSubtotal}</span></p>
          </div>
        </div>
      </div>

      <div className="shipping-actions">
        <Link to="/cart" className="back-button">Back to cart</Link>
        <button onClick={handleSubmit} className="continue-button" disabled={!contact || !name || !address || !city || !postalCode || !province || !country}>
          Go to shipping
        </button>
      </div>
    </div>
  );
}

export default ShippingInfo;
