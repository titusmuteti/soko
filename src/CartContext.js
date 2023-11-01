import React, { createContext, useReducer, useContext } from 'react';

// Define your initial state and reducer function
const initialState = {
  items: [], // Initialize the 'items' property as an empty array
};

// Define your reducer function to handle cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] }; // Corrected property name
    case 'REMOVE_FROM_CART':
      // Implement logic to remove an item from the cart
      const updatedCart = state.items.filter(item => item.id !== action.payload.id); // Corrected property name
      return { ...state, items: updatedCart }; // Corrected property name
    default:
      return state;
  }
}

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

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
