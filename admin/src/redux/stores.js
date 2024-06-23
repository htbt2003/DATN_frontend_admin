import { configureStore } from '@reduxjs/toolkit'
import cart from './cartSlice'
import auth from './authSlice'
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}
const persistedCart = persistReducer(persistConfig, cart)
const persistedAuth = persistReducer(persistConfig, auth)

export const store = configureStore({
  reducer: {
    cart: persistedCart,
    auth: persistedAuth
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
})
export const persistor = persistStore(store)