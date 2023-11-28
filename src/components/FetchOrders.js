import React from 'react';
import { initializeCart } from '../redux/cartActions';

async function FetchOrders(userId, dispatch) {
  try {
    const response = await fetch(`https://sokoapi.onrender.com/orders?user_id=${userId}`);

    if (!response.ok) {
      console.error('Failed to fetch orders:', response);
      throw new Error('Failed to fetch orders');
    }

    const userOrders = await response.json();

    // Check if the response is not empty
    if (!userOrders || userOrders.length === 0) {
      // No orders found, proceed to the homepage
      return Promise.resolve([]); // Resolved with an empty array to continue the flow
    }

    // Filter orders that belong to the logged-in user
    const loggedInUserOrders = userOrders.filter((order) => order.user_id === userId);

    // Extract order item IDs from each order of the logged-in user
    const orderItemIds = loggedInUserOrders.flatMap((order) => order.order_item_ids);

    // Check if there are order item IDs to fetch
    if (!orderItemIds || orderItemIds.length === 0) {
      throw new Error('No order items found for the user');
    }

    // Fetch order items based on the IDs
    const fetchItemPromises = orderItemIds.map(itemId => {
      return fetch(`https://sokoapi.onrender.com/order_items/${itemId}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error(`Failed to fetch order item ${itemId}`);
            throw new Error(`Failed to fetch order item ${itemId}`);
          }
        })
        .then(orderItem => {
          if (!orderItemIds.includes(orderItem.id)) {
            console.error(`Fetched order item has unexpected ID: ${orderItem.id}`);
            throw new Error(`Fetched order item has unexpected ID: ${orderItem.id}`);
          }
          return orderItem;
        });
    });

    // Wait for all fetch requests to complete
    const orderItems = await Promise.all(fetchItemPromises);
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });

    // Dispatch actions to update the Redux store
    dispatch(initializeCart(orderItems, userId));
  } catch (error) {
    if (error.message === 'No order items found for the user' || error.message === 'No orders found for the user') {
      // Handle as needed, e.g., navigate('/');
    } else {
      console.error('An error occurred while fetching orders:', error);
    }
  }
}

export default FetchOrders;
