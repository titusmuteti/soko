export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const initializeCart = (cartData, userId) => {
  return (dispatch) => {
    // Check if cartData is defined before proceeding
    if (cartData) {
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
    }
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

export const removeFromCart = (productId) => async (dispatch) => {
  try {
    // Make a request to the backend to delete the order item
    const token = localStorage.getItem('token');
    const response = await fetch(`https://sokoapi.onrender.com/order_items/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to remove product from the backend');
      // Handle the error as needed
    }

    // Dispatch the action to remove the product from the Redux store
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
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
