import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../style/product-listing.css';


import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';
import cart from '../assets/Cart.svg';

const products = {
  Women: [
    { id: 1, name: 'Apollo Running Short', price: 50.00, image: image1, sizes: ['S', 'M', 'L'] },
    { id: 2, name: 'Apollo Running Short', price: 50.00, image: image2, sizes: ['S', 'M', 'L'] },
    { id: 3, name: 'Apollo Running Short', price: 50.00, image: image3, sizes: ['S', 'M', 'L'] },
    { id: 4, name: 'Apollo Running Short', price: 50.00, image: image4, sizes: ['S', 'M', 'L'] },
    { id: 5, name: 'Apollo Running Short', price: 50.00, image: image5, sizes: ['S', 'M', 'L'] },
    { id: 6, name: 'Apollo Running Short', price: 50.00, image: image6, sizes: ['S', 'M', 'L'] },
  ],
  Men: [
    { id: 7, name: 'Apollo Running Short', price: 50.00, image: image1, sizes: ['M', 'L', 'XL'] },
    { id: 8, name: 'Apollo Running Short', price: 50.00, image: image2, sizes: ['M', 'L', 'XL'] },
    { id: 9, name: 'Apollo Running Short', price: 50.00, image: image3, sizes: ['M', 'L', 'XL'] },
    { id: 10, name: 'Apollo Running Short', price: 50.00, image: image4, sizes: ['M', 'L', 'XL'] },

  ],
  Kids: [
    { id: 16, name: 'Apollo Running Short', price: 50.00, image: image4, sizes: ['XS', 'S', 'M'] },
    { id: 17, name: 'Apollo Running Short', price: 50.00, image: image5, sizes: ['XS', 'S', 'M'] },
    { id: 18, name: 'Apollo Running Short', price: 50.00, image: image6, sizes: ['XS', 'S', 'M'] },
  ]
}

function ProductListing({ category }) {
  const { convertPrice, addToCart, currency } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <div className="product-listing">
      <h1 className="product-listing-title">{category}</h1>
      <div className="product-grid">
        {products[category].map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="product-image-main" />

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{currency}{convertPrice(product.price)}</p>
              </div>
            </Link>
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="add-to-cart"
            >
              <img src={cart} alt="" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;