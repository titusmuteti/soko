import React from 'react';
import { initializeCart } from '../redux/cartActions';

function FetchOrders (userId, dispatch, navigate) {
    fetch(`https://sokoapi.onrender.com/orders?user_id=${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch orders:', response);
          throw new Error('Failed to fetch orders');
        }
      })
      .then((userOrders) => {
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
          // Check if the clicked item has an equivalent ID in the array
          if (!orderItemIds.includes(itemId)) {
            console.error(`Clicked item has unexpected ID: ${itemId}`);
            throw new Error(`Clicked item has unexpected ID: ${itemId}`);
          }
  
          return fetch(`https://sokoapi.onrender.com/order_items/${itemId}`)
            .then(response => {
              if (response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (!contentType || !contentType.includes('application/json')) {
                  console.error(`Empty or non-JSON response for order item ${itemId}`);
                  throw new Error(`Empty or non-JSON response for order item ${itemId}`);
                }
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
        return Promise.all(fetchItemPromises);
      })
      .then((orderItems) => {  
        // Dispatch actions to update the Redux store
        dispatch(initializeCart(orderItems, userId));
  
        navigate('/');
      })
      .catch((error) => {
        if (error.message === 'No order items found for the user' || error.message === 'No orders found for the user') {
          navigate('/');
        } else {
          console.error('An error occurred while fetching orders:', error);
        }
      });      
  }

  export default FetchOrders