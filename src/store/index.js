import { combineReducers, configureStore } from "@reduxjs/toolkit";
import shopSlice from "./reducers/shopSlice";
import itemSlice from "./reducers/itemSlice";
import userSlice from './reducers/userSlice';
import recordSlice from './reducers/recordSlice';
import onGameSlice from "./reducers/onGameSlice";
import heroSlice from './reducers/heroSlice';

const rootReducer = combineReducers({
    item: itemSlice,
    shop: shopSlice,
    user: userSlice,
    record: recordSlice,
    onGame: onGameSlice,
    hero: heroSlice
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}