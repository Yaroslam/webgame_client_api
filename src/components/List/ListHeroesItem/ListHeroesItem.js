import React from 'react';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import classes from './ListHeroesItem.module.scss'


const ListHeroesItem = (props) => {

    const { owner, hero_name } = props.item

    return (
        <Box className={classes.container}>
            <Box className={classes.item}>
                <Typography sx={{ my: '10px' }} variant="string">Владелец: {owner}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Имя героя: {hero_name}</Typography>
            </Box>
        </Box>
    );
};

export default ListHeroesItem;