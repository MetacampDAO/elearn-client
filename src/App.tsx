import React, { FC } from 'react';
import Context from './Context';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home';
import Users from './components/users';
import NavBar from './components/common/NavBar';
import Main from './components/common/Main';
import Batches from './components/batches';

export const App: FC = () => {
    return (
        <Context>
            <BrowserRouter>
                <NavBar />
                <Main childComp={
                    <Routes>
                        {/* <Route path='/join' element={
                            <Join />
                        } />
                        <Route path='/play/:gameId' element={
                            <PlayGame />
                        } /> */}
                        <Route path='/batches' element={
                            <Batches />
                        } />
                        <Route path='/users' element={
                            <Users />
                        } />
                        <Route path='/' element={
                            <Home />
                        } />
                    </Routes>
                } />
            </BrowserRouter>
        </Context>
    );
};
