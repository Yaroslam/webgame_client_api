import axios from 'axios'
import { recordSlice } from '../reducers/recordSlice'
import { api_key } from '../../config';

export const getRecords = () => async dispatch => {
    await axios.get(`${api_key}/api/Records/`)
        .then((res) => dispatch(recordSlice.actions.setRecords(res.data)))
}

export const createRecord = (record) => async (dispatch) => {
    await axios.post(`${api_key}/api/Records/add_record/`, record, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(recordSlice.actions.addRecord(res.data)))
        .then(res => dispatch(getRecords()))
}

export const deleteRecord = (id) => async (dispatch) => {
    await axios.delete(`${api_key}/api/Records/${id}/`)
        .then(res => dispatch(recordSlice.actions.deleteRecord(id)))
}