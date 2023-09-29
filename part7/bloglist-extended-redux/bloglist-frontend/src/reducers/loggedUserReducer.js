import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import loginService from "../services/login"
import { useRef } from "react";
import { fiveSecondMessage } from "./notificationReducer";

const loggedUserSlice = createSlice({
    name:'loggedUser',
    initialState:null,
    reducers:{
        setUser(state, action){
            return action.payload
        },
        clearUser(state, action){
            return null
        }
    }
})

export const initializeLoggedUser = () => {
    return async dispatch => {
        const userJSON = window.localStorage.getItem('user')
        if (userJSON) {
            const userParse = JSON.parse(userJSON)
            dispatch(setUser(userParse))
            await blogsService.setToken(userParse.token)
        }
    }
}

export const login = (credentials) => {
    return async dispatch => {
        try{
            const user = await loginService.login(credentials)
            window.localStorage.setItem('user', JSON.stringify(user))
            dispatch(setUser(user))
            blogsService.setToken(user.token)
        }catch (error) {
            console.log(error)
            dispatch(fiveSecondMessage({
                message: 'wrong username or password',
                color: 'red',
            }))
            
        }
    }
}
export const logout = () => {
    return async dispatch => {
        dispatch(clearUser())
        window.localStorage.removeItem('user')
    }
}

export const { setUser, clearUser } = loggedUserSlice.actions
export default loggedUserSlice.reducer