import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_CART':
      const updatedCart = state.items.filter(item => item.id !== action.payload.id);
      return { ...state, items: updatedCart };
    case 'SET_CART':
      return { ...state, items: action.payload }; // Add this case to set the cart
    default:
      return state;
  }
}

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const savedCartItems = localStorage.getItem('cartItems');
      if (savedCartItems) {
        const items = JSON.parse(savedCartItems);
        dispatch({ type: 'SET_CART', payload: items });
      }
    } catch (error) {
      console.error('Error parsing cart items from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ items: state.items, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
