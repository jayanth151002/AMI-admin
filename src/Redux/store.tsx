import { configureStore } from '@reduxjs/toolkit'
import logReducer from './slices/logSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, logReducer)

const store = configureStore({
    reducer: {
        log: persistedReducer
    },
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch