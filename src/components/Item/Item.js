import { Button, Modal, TextField, Typography, IconButton, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import DividingLine from '../DividingLine/DividingLine';
import Layout from '../layout/Layout';
import Sidebar from '../Sidebar/Sidebar';
import List from '../List/List';
import ListItemsItem from '../List/ListItemsItem/ListItemsItem';
import { createItem } from '../../store/actions/itemActions'
import { isValid } from '../../store/actions/itemActions';

import classes from './Item.module.scss'
import { ArrowUpward } from '@mui/icons-material';
import Sort from './../Sort/Sort';

const Item = () => {

    const dispatch = useDispatch()

    const items = useSelector(state => state.item.items)

    const [name, setName] = useState()
    const [cost, setCost] = useState()
    const [head, setHead] = useState()
    const [body, setBody] = useState()
    const [arms, setArms] = useState()
    const [notValid, setNotValid] = useState(false)
    const [page, setPage] = useState(0)
    const [sort, setSort] = useState()
    const [filteredSort, setFilteredSort] = useState([])

    useEffect(() => {
        if (items.length > 0) {
            if (items.length / 2 <= page) setPage(page - 1)
            setFilteredSort(items)
        }
    }, [items])

    useEffect(() => {
        if (sort) {
            let temp = [...items]
            if (sort === 'A-z')
                setFilteredSort(temp.sort((a, b) => a.item_name.localeCompare(b.item_name)))
            else
                setFilteredSort(temp.sort((a, b) => b.item_name.localeCompare(a.item_name)))
        }
    }, [sort])

    const submitCreate = async () => {

        const request = {
            item_name: name,
            item_cost: cost,
            item_stats: {
                head: head,
                body: body,
                arms: arms
            }
        }

        if (isValid(request)) {
            setNotValid(false)
            dispatch(createItem(request))
        }
        else setNotValid(true)
    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value)
                break;
            case 'cost':
                setCost(e.target.value)
                break;
            case 'head':
                setHead(e.target.value)
                break;
            case 'body':
                setBody(e.target.value)
                break;
            case 'arms':
                setArms(e.target.value)
                break;
        }
    }

    return (
        <Box className={classes.container}>
            <Layout>
                <Sidebar>
                    <Typography sx={{ whiteSpace: "nowrap" }} variant="h4">
                        Создание предмета
                    </Typography>
                    <TextField onChange={handleChange} name="name" sx={{ my: '10px' }} placeholder='Название' />
                    <TextField onChange={handleChange} name="cost" sx={{ my: '10px' }} placeholder='Стоимость' type="number" />
                    <Typography variant='string'>Статы:</Typography>
                    <TextField onChange={handleChange} name="head" sx={{ my: '10px' }} placeholder='Голова' />
                    <TextField onChange={handleChange} name="body" sx={{ my: '10px' }} placeholder='Тело' />
                    <TextField onChange={handleChange} name="arms" sx={{ my: '10px' }} placeholder='Руки' />
                    {notValid && <Typography sx={{ mb: 2 }} color="red" variant='string'>Заполните все поля</Typography>}
                    <Button onClick={submitCreate} variant="contained">Отправить</Button>
                </Sidebar>
                <DividingLine />
                <List>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h4'>
                            Список предметов
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                            <Typography variant="string" sx={{ my: 'auto' }}>Сортировка по названию:</Typography>
                            <Sort sort={sort} setSort={setSort} />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowBackIcon /></IconButton>
                            <IconButton disabled={items.length / 2 <= page + 1} onClick={() => setPage(page + 1)}><ArrowForwardIcon /></IconButton>
                        </Box>
                    </Box>
                    {filteredSort.length > 0
                        ?
                        (
                            filteredSort.slice(page * 2, (page + 1) * 2).map(item =>
                                <ListItemsItem key={item.id} item={item} />
                            )
                        )
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <CircularProgress />
                        </Box>
                    }
                </List>
            </Layout>
        </Box>
    );
};

export default Item;