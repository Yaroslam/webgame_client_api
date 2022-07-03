import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    currentItem: {},
}

export const itemSlice = createSlice({
    name: 'Item',
    initialState,
    reducers: {
        setItems(state, action){
            state.items = action.payload
        },
        addItem(state, action){
            state.items.push(action.payload)
        },
        setCurrentItem(state, action){
            state.currentItem = action.payload
        },
        deleteItem(state, action){
            state.items = state.items.filter(item => item.id !== action.payload)
        },
    }
})

export default itemSlice.reducer