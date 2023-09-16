import { createContext, useContext, useReducer } from "react";

const reducer = ( state, action ) =>{
    switch(action.type){
        case 'VOTE': return `anecdote \'${action.payload}\' voted`
        case 'CREATE': return `${action.payload} created`
        case 'CLEAR': return null
        case 'ERROR': return action.payload
        default: return state
    }
}

const NotificationContext = createContext()
export const NotificationContextProvider = (props) => {
    
    const [message, messageDispatch] = useReducer(reducer, null)
    
    return (
        <NotificationContext.Provider value={[message,messageDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationValueandDispatch = useContext(NotificationContext)
    return notificationValueandDispatch[0]
}
export const useNotificationDispatch = () => {
    const notificationValueandDispatch = useContext(NotificationContext)
    return notificationValueandDispatch[1]
}

export default NotificationContext

