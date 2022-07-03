import axios from 'axios'
import { heroSlice } from '../reducers/heroSlice'
import { api_key } from '../../config';
import {itemSlice} from "../reducers/itemSlice";

export const getHeroes = () => async dispatch => {
    await axios.get(`${api_key}/api/Heroes/`)
        .then((res) => dispatch(heroSlice.actions.setHeroes(res.data)))
}

export const deleteHero = (id) => async (dispatch) => {
    await axios.delete(`${api_key}/api/Heroes/${id}/`)
        .then(res => dispatch(heroSlice.actions.deleteHero(id)))
}
