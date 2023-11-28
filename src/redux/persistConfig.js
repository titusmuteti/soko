import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer';

const persistConfig = {
  key: 'root', 
  storage, // the storage engine to use (local storage in this case)
  whitelist: ['auth', 'cart'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
