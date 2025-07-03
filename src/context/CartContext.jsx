import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [currency, setCurrency] = useState('$');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    contact: '',
    name: '',
    secondName: '',
    address: '',
    shippingNote: '',
    city: '',
    postalCode: '',
    province: '',
    country: 'Italy'
  });

  const exchangeRates = {
    '$': 1,
    '€': 0.85,
    '¥': 110
  };

  const addToCart = (product, size) => {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    if (existingItem) {
      updateQuantity(product.id, size, 1);
    } else {
      setCart([...cart, { ...product, size, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, size, delta) => {
    setCart(cart.map(item =>
      item.id === id && item.size === size
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const updateSize = (id, oldSize, newSize) => {
    setCart(cart.map(item => {
      if (item.id === id && item.size === oldSize) {
        const existingItem = cart.find(i => i.id === id && i.size === newSize);
        if (existingItem) {
          return {
            ...existingItem,
            quantity: existingItem.quantity + item.quantity
          };
        } else {
          return { ...item, size: newSize };
        }
      }
      return item;
    }).filter((item, index, self) =>
      index === self.findIndex(i => i.id === item.id && i.size === item.size)
    ));
  };

  const convertPrice = (price) => {
    return (price * exchangeRates[currency]).toFixed(2);
  };

  const removeFromCart = (id, size) => {
    setCart(cart.filter(item => !(item.id === id && item.size === size)));
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      updateSize,
      removeFromCart,
      currency,
      setCurrency,
      convertPrice,
      isCartOpen,
      setIsCartOpen,
      shippingInfo,
      setShippingInfo
    }}>
      {children}
    </CartContext.Provider>
  );
};
