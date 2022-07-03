import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    heroes: [],
    currentHero: {},
    currentHeroId: -1
}

export const heroSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        setHeroes(state, action){
            state.heroes = action.payload
        },
        addHero(state, action){
            state.heroes.push(action.payload)
        },
        setCurrentHero(state, action){
            state.currentHero = action.payload
        },
        deleteHero(state, action){
            state.heroes = state.heroes.filter(record => record.id !== action.payload)
        },
    }
})

export default heroSlice.reducer