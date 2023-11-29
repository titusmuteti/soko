export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export const BASE_URL = 'https://sokoapi.onrender.com';

export const fetchApi = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const data = await response.json();
      console.error(`API request failed: ${data.errors}`);
      throw new Error(`API request failed: ${data.errors}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('An unexpected error occurred during API request:', error);
    throw error;
  }
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

    // Dispatch the action to update the Redux store
    dispatch({ type: 'ADD_TO_CART', payload: { product: item, userId } });

    // Update local storage with the new cart information
    const updatedCartData = await fetchApi(`${BASE_URL}/orders/${data.id}`);
    const updatedOrderItemsData = await Promise.all(
      updatedCartData.order_item_ids.map(async (orderItemId) => {
        return fetchApi(`${BASE_URL}/order_items/${orderItemId}`);
      })
    );

    // Update user-specific localStorage with the fetched cart data
    const updatedCart = {
      items: updatedOrderItemsData.map((item) => ({ ...item, userId })),
    };
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
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

export const increaseQuantity = (productId) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    const productInCart = getState().cart.items.find(item => item && item.product && item.product.id === productId);
    console.log(productInCart.order.order_item_ids);

    if (!productInCart || !productInCart.order || !productInCart.order.order_item_ids || productInCart.order.order_item_ids.length === 0) {
      console.error("Product not found in the cart or order item IDs not found");
      return;
    }    

    const orderItemId = productInCart.order.order_item_ids[0]; // Assuming one order item per product in the cart
    console.log(orderItemId);

    const response = await fetch(`${BASE_URL}/order_items/${orderItemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ increase_quantity: true }),
    });

    if (response.ok) {
      const orderItemData = await response.json();

      dispatch({
        type: 'INCREASE_QUANTITY',
        payload: {
          productId,
          quantity: orderItemData.quantity,
        },
      });
    } else {
      console.error('Failed to increase quantity');
      // Handle the error as needed
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
};

export const decreaseQuantity = (productId) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    const productInCart = getState().cart.items.find(item => item && item.product && item.product.id === productId);

    if (!productInCart || !productInCart.order_item_ids || productInCart.order_item_ids.length === 0) {
      console.error("Product not found in the cart or order item IDs not found");
      return;
    }

    const orderItemId = productInCart.order_item_ids[0]; // Assuming one order item per product in the cart

    const response = await fetch(`https://sokoapi.onrender.com/order_items/${orderItemId}?decrease_quantity=true`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // Dispatch the action to update the Redux store
      dispatch({ type: DECREASE_QUANTITY, payload: productId });
    } else {
      const data = await response.json();
      console.error('Failed to decrease quantity:', data.errors);
    }
  } catch (error) {
    console.error('An unexpected error occurred during quantity decrease:', error);
  }
};