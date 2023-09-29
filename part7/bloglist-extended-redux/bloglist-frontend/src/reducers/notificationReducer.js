import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name:'notification',
    initialState: null,
    reducers: {
        updateMessage(state, action) {
            return action.payload
        },
        clearMessage(state, action){
            return null
        }
    } 
})

export const fiveSecondMessage = (message) => {
    return async dispatch => {
        dispatch(updateMessage(message))
        setTimeout(()=> {
            dispatch(clearMessage())
        },5000)
    }
}
export const { updateMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer
