import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../style/cart-page.css';


function CartPage() {
  const { 
    cart, 
    convertPrice, 
    updateQuantity, 
    updateSize, 
    currency 
  } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">CART</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={`${item.id}-${item.size}`} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2 className="cart-item-name">{item.name}</h2>
                <p className="cart-item-price">{convertPrice(item.price)} {currency}</p>
                <div className="size-selector">
                  <label className="size-label">SIZE:</label>
                  <div className="size-options">
                    {item.sizes.map(size => (
                      <button
                        key={size}
                        className={`size-option ${item.size === size ? 'selected' : ''}`}
                        onClick={() => updateSize(item.id, item.size, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="cart-item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.size, -1)} 
                  className="quantity-button"
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.size, 1)} 
                  className="quantity-button"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <div className="summary-row">
              <span>Quantity: </span>
              <b>{totalQuantity}</b>
            </div>
            <div className="summary-row">
              <span>Total: </span>
              <b>{convertPrice(total)} {currency}</b>
            </div>
            <Link to="/shipping" className="continue-button">
              CONTINUE
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;