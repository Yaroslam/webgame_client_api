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
import ListRecordItem from '../List/ListRecordItem/ListRecordItem';
import Select from '../Select/Select';
import { createRecord } from '../../store/actions/recordActions';
import { isValid } from '../../store/actions/userActions';
import Sort from './../Sort/Sort';

const Record = () => {

    const dispatch = useDispatch()

    const records = useSelector(state => state.record.records)
    const users = useSelector(state => state.user.users)

    const [user, setUser] = useState()
    const [notValid, setNotValid] = useState()
    const [page, setPage] = useState(0)
    const [record, setRecord] = useState()
    const [sort, setSort] = useState()
    const [filteredSort, setFilteredSort] = useState([])

    useEffect(() => {
        if (records.length > 0) {
            if (records.length / 5 <= page) setPage(page - 1)
            setFilteredSort(records)
        }
    }, [records])

    useEffect(() => {
        if (sort) {
            let temp = [...records]
            if (sort === 'A-z')
                setFilteredSort(temp.sort((a, b) => a.user_name.localeCompare(b.user_name)))
            else
                setFilteredSort(temp.sort((a, b) => b.user_name.localeCompare(a.user_name)))
        }
    }, [sort])

    const submitCreate = async () => {

        const request = {
            username: users.filter(x => x.id === user[0])[0].username,
            record: record
        }

        if (isValid(request)) {
            setNotValid(false)
            dispatch(createRecord(request))
        }
        else setNotValid(true)
    }

    return (
        <Layout>
            <Sidebar>
                <Typography variant="h4">
                    Добавление рекорда
                </Typography>
                <TextField sx={{ mb: 2 }} onChange={(e) => setRecord(e.target.value)} placeholder="Рекорд" />
                <Select onChange={setUser} placeholder={"Выберите игрока"} arr={users.map((record) => { return { title: record.username, id: record.id } })} />
                {notValid && <Typography sx={{ mb: 2 }} color="red" variant='string'>Заполните все поля</Typography>}
                <Button onClick={submitCreate} variant="contained">Отправить</Button>
            </Sidebar>
            <DividingLine />
            <List>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4'>
                        Список рекордов
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                            <Typography variant="string" sx={{ my: 'auto' }}>Сортировка по username:</Typography>
                            <Sort sort={sort} setSort={setSort} />
                        </Box>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowBackIcon /></IconButton>
                        <IconButton disabled={records.length / 4 <= page + 1} onClick={() => setPage(page + 1)}><ArrowForwardIcon /></IconButton>
                    </Box>
                </Box>
                <Box>
                    {filteredSort.length > 0
                        ?
                        (
                            filteredSort.slice(page * 4, (page + 1) * 4).map(item =>
                                <ListRecordItem key={item.id} item={item} />
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

export default Record;