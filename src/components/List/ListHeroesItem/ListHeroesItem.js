import React from 'react';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import classes from './ListHeroesItem.module.scss'
import {deleteHero} from "../../../store/actions/heroActions";
import {useDispatch} from "react-redux";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const ListHeroesItem = (props) => {

    const dispatch = useDispatch()

    const { owner, hero_name } = props.item

    const submitDelete = () => {
        dispatch(deleteHero(props.item.id))
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.item}>
                <Typography sx={{ my: '10px' }} variant="string">Владелец: {owner}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Имя героя: {hero_name}</Typography>
            </Box>
            <Box className={classes.buttons}>
                <IconButton onClick={submitDelete}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ListHeroesItem;
