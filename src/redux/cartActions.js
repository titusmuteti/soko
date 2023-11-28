export const initializeCart = (cartData, userId) => {
  return (dispatch) => {
    // Dispatch action to initialize Redux store
    dispatch({
      type: 'INITIALIZE_CART',
      payload: { orderItems: cartData, userId },
    });

    // Update user-specific localStorage with the fetched cart data
    const updatedCart = {
      items: cartData.map((item) => ({ ...item, userId })),
    };
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
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
