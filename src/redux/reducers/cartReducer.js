const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // ... other cases

    case 'INITIALIZE_CART':
      // Load user-specific cart data from localStorage on initialization
      const storedCart = localStorage.getItem(`cart_${action.payload.userId}`);
      const parsedCart = storedCart ? JSON.parse(storedCart) : null;

      return {
        ...state,
        items: parsedCart ? parsedCart.items : [],
      };

    case 'ADD_TO_CART':
      // Update user-specific cart in localStorage when adding a product
      const updatedCartAdd = {
        items: [...state.items, { ...action.payload.product, userId: action.payload.userId }],
      };
      localStorage.setItem(`cart_${action.payload.userId}`, JSON.stringify(updatedCartAdd));

      return {
        ...state,
        items: updatedCartAdd.items,
      };

    case 'REMOVE_FROM_CART':
      // Update user-specific cart in localStorage when removing a product
      const updatedCartRemove = {
        items: state.items.filter((item) => item.id !== action.payload),
      };
      localStorage.setItem(`cart_${action.payload.userId}`, JSON.stringify(updatedCartRemove));

      return {
        ...state,
        items: updatedCartRemove.items,
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default cartReducer;
