/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers/rootReducer'; // Ensure this path is correct

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // You can also add more configuration options here if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);














// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers/rootReducer";

// export const store = createStore(rootReducer, applyMiddleware(thunk));
