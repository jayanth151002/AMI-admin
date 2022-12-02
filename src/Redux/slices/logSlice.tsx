import { createSlice } from '@reduxjs/toolkit'

export const logSlice = createSlice({
    name: 'log',
    initialState: {
        value:{},
        activeLog:"",
        newLog:{
            profile:{},
            log:{}
        }
    },
    reducers: {
        setLog: (state, action) => {
            state.value = action.payload
        },
        setActiveLog: (state, action) => {
            state.activeLog = action.payload
        },
        setNewLog: (state, action) => {
            state.newLog.profile = action.payload.profile
            state.newLog.log = action.payload.log
        },
    }
})

export const { setLog, setActiveLog, setNewLog } = logSlice.actions
export default logSlice.reducer