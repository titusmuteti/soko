const initialState = {
    items: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
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
  