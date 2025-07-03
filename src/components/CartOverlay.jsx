import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../style/cart-overlay.css';


function CartOverlay() {
  const { cart, convertPrice, updateQuantity, isCartOpen, setIsCartOpen, currency } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/shipping');
      setIsCartOpen(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-content">
        <div className="cart-header">
          <h2 className="cart-title">My Bag, {totalItems} {totalItems === 1 ? 'item' : 'items'}</h2>
          <button onClick={() => setIsCartOpen(false)} className="close-button">×</button>
        </div>

        {cart.length === 0 ? (
          <p>Your bag is empty</p>
        ) : (
          <div className="cart-items-list">
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-size">Size: {item.size.toUpperCase()}</p>
                  <p className="item-price">{convertPrice(item.price)} {currency}</p>
                </div>
                <div className="item-quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.size, 1)} className="quantity-button">+</button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.size, -1)} className="quantity-button">-</button>
                </div>
                {}
                {item.image && <img src={item.image} alt={item.name} className="item-image" />}
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <p className="total-label">Total</p>
          <p className="total-amount">{convertPrice(totalPrice)} {currency}</p>
        </div>

        <div className="cart-buttons">
          <Link to="/cart" className="view-bag-button" onClick={() => setIsCartOpen(false)}>
              View Bag
          </Link>
          <button
              onClick={handleCheckout}
              className="checkout-button"
              disabled={cart.length === 0}
            >
              Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartOverlay;