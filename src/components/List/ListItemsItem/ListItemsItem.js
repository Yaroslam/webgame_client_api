import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Collapse, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { itemSlice } from '../../../store/reducers/itemSlice';
import { deleteItem } from '../../../store/actions/itemActions';

import classes from './ListItemsItem.module.scss'
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const ListItemsItem = (props) => {

    const dispatch = useDispatch()

    const { item_name, item_cost, item_stats } = props.item

    const submitDelete = () => {
        dispatch(deleteItem(props.item.id))
    }

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box className={classes.container}>
            <Box className={classes.item}>
                <Typography sx={{ my: '10px' }} variant="string">Название: {item_name}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Стоимость: {item_cost}</Typography>
                <List>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Статы:" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item_stats.head && <ListItemText sx={{ml: 4}} primary={`Голова: ${item_stats.head}`} />}
                            {item_stats.body && <ListItemText sx={{ml: 4}} primary={`Тело: ${item_stats.body}`} />}
                            {item_stats.arms && <ListItemText sx={{ml: 4}} primary={`Руки: ${item_stats.arms}`} />}
                        </List>
                    </Collapse>
                </List>
            </Box>
            <Box className={classes.buttons}>
                <IconButton onClick={submitDelete}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ListItemsItem;