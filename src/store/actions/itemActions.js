import axios from 'axios'
import { itemSlice } from '../reducers/itemSlice'
import { api_key } from '/../../config';

export const getItems = () => async dispatch => {
    await axios.get(`${api_key}/api/Items/`)
        .then((res) => dispatch(itemSlice.actions.setItems(res.data)))
}

export const createItem = (item) => async (dispatch) => {

    await axios.post(`${api_key}/api/Items/`, item, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(itemSlice.actions.addItem(res.data)))
        .then(res => dispatch(getItems()))
}

export const deleteItem = (id) => async (dispatch) => {
    await axios.delete(`${api_key}/api/Items/${id}/`)
        .then(res => dispatch(itemSlice.actions.deleteItem(id)))
}
export const isValid = (body) => {

    let keys = Object.keys(body)

    for (let i = 0; i < keys.length; i++){
        if (body[keys[i]] === '' || body[keys[i]] === undefined){
            return false
        }
    }
    return true
}
