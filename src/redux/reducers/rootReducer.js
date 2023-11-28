import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';

const rootReducer = (state, action) => {
  // Setting and clearing the user-specific key
  if (action.type === 'SET_USER_KEY') {
    return {
      ...state,
      auth: {
        ...state.auth,
        userKey: action.payload,
      },
    };
  }

  if (action.type === 'CLEAR_USER_KEY') {
    const { auth: { userKey, ...authWithoutUserKey }, ...rest } = state;
    return {
      ...rest,
      auth: {
        ...authWithoutUserKey,
        userKey: null,
      },
    };
  }

  // Combined individual reducers
  return combineReducers({
    auth: authReducer,
    cart: cartReducer,
  })(state, action);
};

export default rootReducer;
