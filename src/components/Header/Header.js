import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import classes from './Header.module.scss'

const routes = [
    {
        id: 0,
        href: "/item",
        text: "Предметы"
    },
    {
        id: 1,
        href: "/shop",
        text: "Магазин"
    },
    {
        id: 2,
        href: "/records",
        text: "Рекорды"
    },
    {
        id: 3,
        href: "/ongame",
        text: "В игре"
    },
    {
        id: 4,
        href: "/heroes",
        text: "Герои"
    },
]

const Header = () => {

    const location = useLocation()

    const [box, setBox] = useState()

    useEffect(() => {
        if (location.pathname !== '/')
            setBox(routes.filter(item => item.href === location.pathname)[0].id * 123)
    }, [location])

    return (
        <AppBar sx={{ backgroundColor: 'black' }} className={classes.container}>
            <Toolbar>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '600px' }}>
                    <div className={classes.box} style={{ left: `${box + 24}px` }}></div>
                    {routes.map(item =>
                        <Link key={item.id} style={{ width: '105px', height: '50px', lineHeight: '50px', textAlign: 'center' }} to={item.href}>
                            <Typography variant="v5" color="white">
                                {item.text}
                            </Typography>
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar >
    );
};

export default Header;