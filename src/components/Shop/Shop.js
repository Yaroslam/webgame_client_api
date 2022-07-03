import { Button, Modal, TextField, Typography, IconButton, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import DividingLine from '../DividingLine/DividingLine';
import Layout from '../layout/Layout';
import Sidebar from '../Sidebar/Sidebar';
import List from '../List/List';
import ListShopItem from '../List/ListShopItem/ListShopItem';
import Select from '../Select/Select';
import { createShopItem } from '../../store/actions/shopActions';
import { isValid } from './../../store/actions/userActions';
import Sort from './../Sort/Sort';

const Shop = () => {

    const dispatch = useDispatch()

    const shop = useSelector(state => state.shop.shop)
    const items = useSelector(state => state.item.items)

    const [item, setItem] = useState()
    const [notValid, setNotValid] = useState()
    const [page, setPage] = useState(0)
    const [sort, setSort] = useState()
    const [filteredSort, setFilteredSort] = useState([])

    useEffect(() => {
        if (shop.length > 0) {
            if (shop.length / 5 <= page) setPage(page - 1)
            setFilteredSort(shop)
        }
    }, [shop])

    useEffect(() => {
        if (sort) {
            let temp = [...shop]
            if (sort === 'A-z')
                setFilteredSort(temp.sort((a, b) => a.item.localeCompare(b.item)))
            else
                setFilteredSort(temp.sort((a, b) => b.item.localeCompare(a.item)))
        }
    }, [sort])

    const submitCreate = async () => {

        const request = {
            item: item[0]
        }

        if (isValid(request)) {
            setNotValid(false)
            dispatch(createShopItem(request))
        }
        else setNotValid(true)
    }

    return (
        <Layout>
            <Sidebar>
                <Typography variant="h4">
                    Добавление предмета в магазин
                </Typography>
                <Select onChange={setItem} placeholder={"Выберите предмет"} arr={items.map(x => { return { id: x.id, title: x.item_name } })} />
                {notValid && <Typography sx={{ mb: 2 }} color="red" variant='string'>Заполните все поля</Typography>}
                <Button onClick={submitCreate} variant="contained">Отправить</Button>
            </Sidebar>
            <DividingLine />
            <List>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4'>
                        Список предметов в магазине
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                        <Typography variant="string" sx={{ my: 'auto', whiteSpace: 'nowrap'}}>Сортировка по предметам:</Typography>
                        <Sort sort={sort} setSort={setSort} />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowBackIcon /></IconButton>
                        <IconButton disabled={shop.length / 5 <= page + 1} onClick={() => setPage(page + 1)}><ArrowForwardIcon /></IconButton>
                    </Box>
                </Box>
                <Box>
                    {filteredSort.length > 0
                        ?
                        (
                            filteredSort.slice(page * 5, (page + 1) * 5).map(item =>
                                <ListShopItem key={item.id} item={item} />
                            )
                        )
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <CircularProgress sx={{ my: 'auto' }} />
                        </Box>
                    }
                </Box>
            </List>
        </Layout>
    );
};

export default Shop;