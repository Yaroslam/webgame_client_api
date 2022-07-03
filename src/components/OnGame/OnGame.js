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
import ListOnGameItem from './../List/ListOnGameItem/ListOnGameItem';

import classes from './OnGame.module.scss'
import Sort from './../Sort/Sort';

const OnGame = () => {

    const onGame = useSelector(state => state.onGame.onGame)
    const [page, setPage] = useState(0)
    const [sort, setSort] = useState()
    const [filteredSort, setFilteredSort] = useState([])

    useEffect(() => {
        if (onGame.length > 0) {
            if (onGame.length / 5 <= page) setPage(page - 1)
            setFilteredSort(onGame)
        }
    }, [onGame])

    useEffect(() => {
        if (sort) {
            let temp = [...onGame]
            if (sort === 'A-z')
                setFilteredSort(temp.sort((a, b) => a.user_name.localeCompare(b.user_name)))
            else
                setFilteredSort(temp.sort((a, b) => b.user_name.localeCompare(a.user_name)))
        }
    }, [sort])

    return (
        <Box className={classes.container}>
            <Layout>
                <Sidebar>
                    <Typography color="gray" variant="h4">
                        Добавление игрока в сети
                    </Typography>
                    <TextField disabled sx={{ mb: 2 }} placeholder="Игрок" />
                    <Button disabled variant="contained">Отправить</Button>
                </Sidebar>
                <DividingLine />
                <List>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h4'>
                            Список игроков в сети
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                            <Typography variant="string" sx={{ my: 'auto' }}>Сортировка по username:</Typography>
                            <Sort sort={sort} setSort={setSort} />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowBackIcon /></IconButton>
                            <IconButton disabled={onGame.length / 5 <= page + 1} onClick={() => setPage(page + 1)}><ArrowForwardIcon /></IconButton>
                        </Box>
                    </Box>
                    <Box>
                        {filteredSort.length > 0
                            ?
                            (
                                filteredSort.slice(page * 5, (page + 1) * 5).map(item =>
                                    <ListOnGameItem key={item.id} item={item} />
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

export default OnGame;
