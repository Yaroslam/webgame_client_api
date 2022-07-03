import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    shop: [],
    currentShopItem: {},
    currentShopItemId: -1
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setShop(state, action){
            state.shop = action.payload
        },
        addShopItem(state, action){
            state.shop.push(action.payload)
        },
        setCurrentShopItem(state, action){
            state.currentShopItem = action.payload
        },
        deleteShopItem(state, action){
            state.shop = state.shop.filter(item => item.id !== action.payload)
        }
    }
})

export default shopSlice.reducer