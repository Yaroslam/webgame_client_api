import axios from 'axios'
import { onGameSlice } from '../reducers/onGameSlice'
import { api_key } from '../../config';

export const getOnGame = () => async dispatch => {
    await axios.get(`${api_key}/api/OnGame/`)
        .then((res) => dispatch(onGameSlice.actions.setOnGame(res.data)))
}