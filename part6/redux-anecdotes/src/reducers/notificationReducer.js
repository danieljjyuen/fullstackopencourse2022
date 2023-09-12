import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name:'notification',
    initialState:null,
    reducers: {
        displayMessage(state, action){
            return action.payload
        },
        hideMessage(state, action){
            return null
        }
    }
})

export const setNotification = (text, number) =>  {
    const seconds = number*1000
    return async dispatch => {
        dispatch(displayMessage(text))
        setTimeout(() => {
            dispatch(hideMessage())
        }, seconds);
    }
}

export const { displayMessage, hideMessage } = notificationSlice.actions
export default notificationSlice.reducer