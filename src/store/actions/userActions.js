import axios from 'axios'
import { userSlice } from './../reducers/userSlice';
import { api_key } from './../../config';

export const getUsers = () => async dispatch => {
    await axios.get(`${api_key}/api/Users`)
        .then((res) => dispatch(userSlice.actions.setUsers(res.data)))
}

export const createUser = (user) => async (dispatch) => {
    await axios.post(`${api_key}/api/Users`, user, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(user.actions.addUser(res.data)))
        .then(res => dispatch(getUsers()))
}

export const editUser = (user, id) => async (dispatch) => {

    await axios.put(`${api_key}/api/Users/${id}/`, user, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(userSlice.actions.editUser(res.data)))
}

export const deleteUser = (id) => async (dispatch) => {
    await axios.delete(`${api_key}/api/Users/${id}/`)
        .then(res => dispatch(userSlice.actions.deleteUser(id)))
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