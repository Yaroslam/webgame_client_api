import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    currentUser: {},
    currentUserId: -1
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action){
            state.users = action.payload
        },
        addUser(state, action){
            state.users.push(action.payload)
        },
        setCurrentItem(state, action){
            state.currentUser = action.payload
        },
        deleteUser(state, action){
            state.users = state.users.filter(item => item.id !== action.payload)
        }
    }
})

export default userSlice.reducer