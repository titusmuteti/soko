export const addToCart = (product) => {
    return {
      type: 'ADD_TO_CART',
      payload: product,
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
  