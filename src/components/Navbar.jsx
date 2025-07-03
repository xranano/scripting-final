import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Cart from '../assets/Cart.svg';
import Logo from '../assets/logo.png';
import '../style/navbar.css';

function Navbar() {
  const { cart, currency, setCurrency, setIsCartOpen } = useContext(CartContext);
  const location = useLocation();
  const categories = ['Women', 'Men', 'Kids'];



  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links">
          {categories.map(category => (
            <Link
              key={category}
              to={category === 'Women' ? '/' : `/${category.toLowerCase()}`}
              className={`navbar-link ${location.pathname === (category === 'Women' ? '/' : `/${category.toLowerCase()}`) 
                ? 'navbar-link-active' : ''}`}
            >
              {category}
            </Link>
          ))}
        </div>
        <img src={Logo} alt="" />
        <div className="navbar-actions">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="currency-selector"
          >
            <option>$</option>
            <option>€</option>
            <option>¥</option>
          </select>
          <button onClick={() => setIsCartOpen(true)} className="cart-button">
            <img src={Cart} alt="" />
            {cart.length > 0 && (
              <span className="cart-count">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;