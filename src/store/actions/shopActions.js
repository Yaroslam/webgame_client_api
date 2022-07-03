import axios from 'axios'
import { shopSlice } from './../reducers/shopSlice';
import { api_key } from './../../config';

export const getShop = () => async dispatch => {
    await axios.get(`${api_key}/api/Shop/?limit=1000`)
        .then((res) => dispatch(shopSlice.actions.setShop(res.data)))
}

export const createShopItem = (shop) => async (dispatch) => {

    await axios.post(`${api_key}/api/Shop/add_item/`, shop, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(shopSlice.actions.addShopItem(res.data)))
        .then(res => dispatch(getShop()))
}

export const deleteShopItem = (id) => async (dispatch) => {

    await axios.delete(`${api_key}/api/Shop/${id}/`)
        .then(res => dispatch(shopSlice.actions.deleteShopItem(id)))
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