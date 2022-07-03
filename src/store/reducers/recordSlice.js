import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    records: [],
    currentRecord: {},
    currentRecordId: -1
}

export const recordSlice = createSlice({
    name: 'records',
    initialState,
    reducers: {
        setRecords(state, action){
            state.records = action.payload
        },
        addRecord(state, action){
            state.records.push(action.payload)
        },
        setCurrentRecord(state, action){
            state.currentRecord = action.payload
        },
        deleteRecord(state, action){
            state.records = state.records.filter(record => record.id !== action.payload)
        },
    }
})

export default recordSlice.reducer