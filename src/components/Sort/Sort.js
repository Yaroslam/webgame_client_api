import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

const Sort = ({ sort, setSort }) => {

    const handleSort = () => {
        if (sort === undefined) setSort('A-z')
        if (sort === 'A-z') {
            setSort('Z-a')
        }
        else if (sort === 'Z-a') {
            setSort('A-z')
        }
    }

    const Component = () => {
        switch (sort) {
            case 'A-z':
                return (<ArrowDownwardIcon />)
            case 'Z-a':
                return (<ArrowUpward />)
        }
        return (<ArrowDownwardIcon />)
    }

    return (
        <IconButton onClick={handleSort}>
            <Component />
        </IconButton>
    );
};

export default Sort;