import { Button, Typography, IconButton, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import DividingLine from '../DividingLine/DividingLine';
import Layout from '../layout/Layout';
import Sidebar from '../Sidebar/Sidebar';
import List from '../List/List';
import ListHeroesItem from './../List/ListHeroesItem/ListHeroesItem';

import classes from './Heroes.module.scss'
import Sort from './../Sort/Sort';

const Heroes = () => {
    const heroes = useSelector(state => state.hero.heroes)
    const [page, setPage] = useState(0)
    const [sort, setSort] = useState()
    const [filteredSort, setFilteredSort] = useState([])

    useEffect(() => {
        if (heroes.length > 0) {
            if (heroes.length / 5 <= page) setPage(page - 1)
            setFilteredSort(heroes)
        }
    }, [heroes])

    useEffect(() => {
        if (sort) {
            let temp = [...heroes]
            if (sort === 'A-z')
                setFilteredSort(temp.sort((a, b) => a.hero_name.localeCompare(b.hero_name)))
            else
                setFilteredSort(temp.sort((a, b) => b.hero_name.localeCompare(a.hero_name)))
        }
    }, [sort])

    return (
        <Box className={classes.container}>
            <Layout >
                <Sidebar>
                    <Typography color="gray" variant="h4">
                        Добавление героя
                    </Typography>
                    <TextField sx={{ my: '10px' }} placeholder='Имя владельца' />
                    <TextField sx={{ my: '10px' }} placeholder='Имя героев' />
                    <Button disabled variant="contained">Отправить</Button>
                </Sidebar>
                <DividingLine />
                <List>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h4'>
                            Список владельцев героя
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                            <Typography variant="string" sx={{ my: 'auto' }}>Сортировка по имени героя:</Typography>
                            <Sort sort={sort} setSort={setSort} />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowBackIcon /></IconButton>
                            <IconButton disabled={heroes.length / 5 <= page + 1} onClick={() => setPage(page + 1)}><ArrowForwardIcon /></IconButton>
                        </Box>
                    </Box>
                    <Box>
                        {filteredSort.length > 0
                            ?
                            (
                                filteredSort.slice(page * 5, (page + 1) * 5).map(item =>
                                    <ListHeroesItem key={item.id} item={item} />
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
        </Box>
    );
};

export default Heroes;