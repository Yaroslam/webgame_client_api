import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    onGame: [],
}

export const onGameSlice = createSlice({
    name: 'onGame',
    initialState,
    reducers: {
        setOnGame(state, action){
            state.onGame = action.payload
        },
    }
})

export default onGameSlice.reducer