import { useReducer } from "react";

const notificationReducer = (state, action) => {
    switch(action.type){
        case 'UPDATE':
            return action.payload
        case 'CLEAR':
            return null
        default:
            return state
    }
}

export default notificationReducer