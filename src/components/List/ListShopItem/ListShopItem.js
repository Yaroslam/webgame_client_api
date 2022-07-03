import React from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteShopItem } from '../../../store/actions/shopActions';

import classes from './ListShopItem.module.scss'


const ListShopItem = (props) => {

    const dispatch = useDispatch()

    const { item } = props.item

    const submitDelete = () => {
        dispatch(deleteShopItem(props.item.id))
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.item}>
                <Typography sx={{ my: '10px' }} variant="string">Название предмета: {item}</Typography>
            </Box>
            <Box className={classes.buttons}>
                <IconButton onClick={submitDelete}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ListShopItem;