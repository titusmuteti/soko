const initialState = {
  isAuthenticated: false,
  user: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        userId: action.payload.userId, 
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
