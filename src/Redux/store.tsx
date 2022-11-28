import { configureStore } from '@reduxjs/toolkit'
import logReducer from './slices/logSlice'

const store= configureStore({
    reducer: {
        log: logReducer
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch