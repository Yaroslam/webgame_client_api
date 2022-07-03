import React from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import classes from './ListOnGameItem.module.scss'


const ListOnGameItem = (props) => {

    const { user_name } = props.item

    return (
        <Box className={classes.container}>
            <Box className={classes.item}>
                <Typography sx={{ my: '10px' }} variant="string">Игрок: {user_name}</Typography>
            </Box>
        </Box>
    );
};

export default ListOnGameItem;