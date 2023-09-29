import { createSlice } from "@reduxjs/toolkit";
import usersService from '../services/users'
const usersSlice = createSlice({
    name: 'users',
    initialState:[],
    reducers:{
        setUsers(state,action){
            return action.payload
        },
        appendUsers(state,action){
            return state.concat(action.payload)
        }
    }
})

export const initializeUsers = () => {
    return async dispatch => {
        const getUsers = await usersService.getAll()
        dispatch(setUsers(getUsers))
    }
}

export const {setUsers, appendUsers} = usersSlice.actions
export default usersSlice.reducer






