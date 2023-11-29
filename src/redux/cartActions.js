export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const BASE_URL = 'https://sokoapi.onrender.com';

export const fetchApi = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const data = await response.json();
    console.error(`API request failed: ${data.errors}`);
    throw new Error(`API request failed: ${data.errors}`);
  }
  return response.json();
};

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

export const addToCart = (product, userId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const data = await fetchApi(
      `${BASE_URL}/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product.id, user_id: userId }),
      }
    );

    const orderItemsData = await Promise.all(
      data.order_item_ids.map(async (orderItemId) => {
        return fetchApi(`${BASE_URL}/order_items/${orderItemId}`);
      })
    );

    const validOrderItemsData = orderItemsData.filter(item => item !== null);

    const matchingOrderItem = validOrderItemsData.find(item => item.product.id === product.id);

    const item = {
      id: data.id,
      order: data,
      product: product,
      quantity: matchingOrderItem?.quantity || 1,
      total_price: validOrderItemsData.reduce((acc, item) => acc + item.total_price, 0),
      unit_price: validOrderItemsData.reduce((acc, item) => acc + item.unit_price, 0),
    };

    dispatch({ type: 'ADD_TO_CART', payload: { product: item, userId } });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
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
