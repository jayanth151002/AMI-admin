import { createSlice } from '@reduxjs/toolkit'

export const logSlice = createSlice({
    name: 'log',
    initialState: {
        value:{}
    },
    reducers: {
        setLog: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setLog } = logSlice.actions
export default logSlice.reducer