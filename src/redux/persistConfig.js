import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer';

const persistConfig = {
  key: 'root', // the key to use for storing the data
  storage, // the storage engine to use (local storage in this case)
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
