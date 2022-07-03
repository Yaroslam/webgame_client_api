import React from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteRecord } from '../../../store/actions/recordActions';

import classes from './ListRecordItem.module.scss'


const ListRecordItem = (props) => {

    const dispatch = useDispatch()

    const { user_name, record } = props.item

    const submitDelete = () => {
        console.log(props.item.id)
        dispatch(deleteRecord(props.item.id))
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.item}>
                <Typography sx={{ my: '10px' }} variant="string">Игрок: {user_name}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Рекорд: {record}</Typography>
            </Box>
            <Box className={classes.buttons}>
                <IconButton onClick={submitDelete}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ListRecordItem;