import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] }; 
    case 'REMOVE_FROM_CART':
      // logic to remove an item from the cart
      const updatedCart = state.items.filter(item => item.id !== action.payload.id); 
      return { ...state, items: updatedCart }; 
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
  console.log(context);
  return context;
};
