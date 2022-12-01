import { createSlice } from '@reduxjs/toolkit'

export const logSlice = createSlice({
    name: 'log',
    initialState: {
        value:{},
        activeLog:""
    },
    reducers: {
        setLog: (state, action) => {
            state.value = action.payload
        },
        setActiveLog: (state, action) => {
            state.activeLog = action.payload
        },
    }
})

export const { setLog, setActiveLog } = logSlice.actions
export default logSlice.reducer