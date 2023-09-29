import { createContext, useReducer } from "react";
import loggedInUserReducer from "./reducers/loggedInUserReducer";

const LoggedUserContext = createContext()

export const LoggedUserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(loggedInUserReducer, null)

    return(
        <LoggedUserContext.Provider value={[user,userDispatch]}>
            {props.children}
        </LoggedUserContext.Provider>
    )
}


export default LoggedUserContext