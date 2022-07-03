import axios from 'axios'
import { heroSlice } from '../reducers/heroSlice'
import { api_key } from '../../config';

export const getHeroes = () => async dispatch => {
    await axios.get(`${api_key}/api/Heroes/`)
        .then((res) => dispatch(heroSlice.actions.setHeroes(res.data)))
}