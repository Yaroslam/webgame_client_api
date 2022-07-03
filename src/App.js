import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/Header/Header';
import Item from './components/Item/Item';
import Shop from './components/Shop/Shop';
import Record from './components/Record/Record';
import OnGame from './components/OnGame/OnGame';
import Heroes from './components/Heroes/Heroes';
import { getItems } from './store/actions/itemActions';
import { getUsers } from './store/actions/userActions';
import { getShop } from './store/actions/shopActions';
import { getRecords } from './store/actions/recordActions';
import { getOnGame } from './store/actions/onGameActions';
import { getHeroes } from './store/actions/heroActions';

import classes from './App.module.scss'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getShop())
    dispatch(getItems())
    dispatch(getUsers())
    dispatch(getRecords())
    dispatch(getOnGame())
    dispatch(getHeroes())
  }, [])

  return (
    <div className={classes.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/item"/>}/>
        <Route path="/item" element={<Item />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/records" element={<Record />} />
        <Route path="/ongame" element={<OnGame />} />
        <Route path="/heroes" element={<Heroes />} />
      </Routes>
    </div>
  );
}

export default App;
