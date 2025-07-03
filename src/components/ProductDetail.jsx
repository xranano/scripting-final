import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../style/product-detail.css';


import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';
import cartIcon from '../assets/Cart.svg';

const allProducts = {
  Women: [
    { id: 1, name: 'Apollo Running Short', price: 50.00, image: image1, sizes: ['S', 'M', 'L'], thumbnails: [image1, image2, image3] },
    { id: 2, name: 'Apollo Running Short', price: 50.00, image: image2, sizes: ['S', 'M', 'L'], thumbnails: [image2, image1, image3] },
    { id: 3, name: 'Apollo Running Short', price: 50.00, image: image3, sizes: ['S', 'M', 'L'], thumbnails: [image3, image1, image2] },
    { id: 4, name: 'Apollo Running Short', price: 50.00, image: image4, sizes: ['S', 'M', 'L'], thumbnails: [image4, image5, image6] },
    { id: 5, name: 'Apollo Running Short', price: 50.00, image: image5, sizes: ['S', 'M', 'L'], thumbnails: [image5, image4, image6] },
    { id: 6, name: 'Apollo Running Short', price: 50.00, image: image6, sizes: ['S', 'M', 'L'], thumbnails: [image6, image4, image5] },
  ],
  Men: [
    { id: 7, name: 'Apollo Running Short', price: 50.00, image: image1, sizes: ['M', 'L', 'XL'], thumbnails: [image1, image2, image3] },
    { id: 8, name: 'Apollo Running Short', price: 50.00, image: image2, sizes: ['M', 'L', 'XL'], thumbnails: [image2, image1, image3] },
    { id: 9, name: 'Apollo Running Short', price: 50.00, image: image3, sizes: ['M', 'L', 'XL'], thumbnails: [image3, image1, image2] },
    { id: 10, name: 'Apollo Running Short', price: 50.00, image: image4, sizes: ['M', 'L', 'XL'], thumbnails: [image4, image5, image6] },
  ],
  Kids: [
    { id: 16, name: 'Apollo Running Short', price: 50.00, image: image4, sizes: ['XS', 'S', 'M'], thumbnails: [image4, image5, image6] },
    { id: 17, name: 'Apollo Running Short', price: 50.00, image: image5, sizes: ['XS', 'S', 'M'], thumbnails: [image5, image4, image6] },
    { id: 18, name: 'Apollo Running Short', price: 50.00, image: image6, sizes: ['XS', 'S', 'M'], thumbnails: [image6, image4, image5] },
  ]
};

function ProductDetail() {
  const { id } = useParams();
  const { convertPrice, addToCart, currency } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState(null);

  let product = null;
  for (const category in allProducts) {
    product = allProducts[category].find(p => p.id === parseInt(id));
    if (product) break;
  }

  if (!product) return <div className="product-not-found">Product not found</div>;
  if (!mainImage) setMainImage(product.image);

  return (
    <div className="product-detail">
      <div className="product-detail-grid">
        <div className="product-images">
          <div className="thumbnail-column">
            {product.thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index}`}
                className="thumbnail"
                onClick={() => setMainImage(thumb)}
              />
            ))}
          </div>
          <img
            src={mainImage}
            alt={product.name}
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-title">Apollo</h1>
          <h2 className="product-detail-subtitle">Running Short</h2>

          <div className="size-selector">
            <label className="size-label">SIZE:</label>
            <div className="size-options">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-price-label">PRICE:</div>
          <div className="product-detail-price">
            {convertPrice(product.price)} {currency}
          </div>

          <button
            onClick={() => selectedSize && addToCart(product, selectedSize)}
            disabled={!selectedSize}
            className={`add-to-cart-button ${!selectedSize ? 'disabled' : ''}`}
          >
            ADD TO CART
          </button>

          <p className="product-description">
            Find stunning women's cocktail dresses and party dresses. Stand out in lace and
            metallic cocktail dresses and party dresses from all your favorite brands.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;