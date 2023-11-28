export const loginUser = (userData) => ({
    type: 'LOGIN_USER',
    payload: userData,
  });
  
  export const logoutUser = () => ({
    type: 'LOGOUT_USER',
  });

  export const initializeCart = (cartData, userId) => {
    return {
      type: 'INITIALIZE_CART',
      payload: { cartData, userId },
    };
  };