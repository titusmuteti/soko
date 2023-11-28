export const initializeCart = (orderItems, userId) => {
  return {
    type: 'INITIALIZE_CART',
    payload: { orderItems, userId },
  };
};
 

export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};

export const addToCart = (product, userId) => {
  return {
    type: 'ADD_TO_CART',
    payload: { product, userId},
  };
};

export const removeFromCart = (productId) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: productId,
  };
};

export const increaseQuantity = (productId) => {
  return {
    type: 'INCREASE_QUANTITY',
    payload: productId,
  };
};

export const decreaseQuantity = (productId) => {
  return {
    type: 'DECREASE_QUANTITY',
    payload: productId,
  };
};
