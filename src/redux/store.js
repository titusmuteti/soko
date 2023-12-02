import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'; 

import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import addressReducer from './reducers/addressReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer, 
  address: addressReducer, 
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'address'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
